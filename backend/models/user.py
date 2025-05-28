from beanie import Document
from pydantic import BaseModel


class User(Document):
    username: str
    password: str

    class Settings:
        name = "users"


class UserRequest(BaseModel):
    """
    model for user signup
    """

    username: str
    password: str


class UserUpdateRequest(BaseModel):
    pass
