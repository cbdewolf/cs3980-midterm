from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from backend.models.user import User, UserRequest, UserUpdateRequest
from backend.auth.jwt_auth import (
    Token,
    TokenData,
    create_access_token,
    decode_jwt_token,
)

pwd_context = CryptContext(schemes=["bcrypt"])


class HashPassword:
    def create_hash(self, password: str):
        return pwd_context.hash(password)

    def verify_hash(self, input_password: str, hashed_password: str):
        return pwd_context.verify(input_password, hashed_password)


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")
hash_password = HashPassword()


def get_user(token: Annotated[str, Depends(oauth2_scheme)]) -> TokenData:
    return decode_jwt_token(token)


user_router = APIRouter()


@user_router.post("/register")
async def sign_up(user: UserRequest):
    # need to add checkers for character length and special characters and such
    existing_user = await User.find_one(User.username == user.username)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists",
        )
    hashed_password = hash_password.create_hash(user.password)
    new_user = User(
        username=user.username,
        password=hashed_password,
    )
    await new_user.create()
    token = create_access_token({"username": user.username})
    return {
        "access_token": token,
        "user": {"username": new_user.username},
    }


@user_router.post("/login")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    # Authenticate user by verifying the user in DB
    username = form_data.username
    existing_user = await User.find_one(User.username == username)
    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )
    authenticated = hash_password.verify_hash(
        form_data.password, existing_user.password
    )
    if authenticated:
        access_token = create_access_token({"username": username})
        return Token(access_token=access_token)

    raise HTTPException(status_code=401, detail="Invalid username or password")


@user_router.get("/me")
async def get_current_user(user: TokenData = Depends(get_user)):
    existing_user = await User.find_one(User.username == user.username)
    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )
    return existing_user
