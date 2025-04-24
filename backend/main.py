from backend.db.db_context import init_db
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from backend.routers.payment_routes import payment_router
from backend.routers.user_routes import user_router


async def lifespan(app: FastAPI):
    # on startup event
    print("Application starts...")
    await init_db()
    yield
    # on shutdown event
    print("Application shuts down...")


app = FastAPI(title="payment-tracker-app", version="2.0.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    # check
    allow_origins=["http://localhost:5173", "http://127.0.0.1:8000"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(payment_router, tags=["payments"], prefix="/api/payments")
app.include_router(user_router, tags=["auth"], prefix="/api/users")


@app.get("/")
async def welcome() -> dict:
    return FileResponse("./frontend/index.html")


app.mount("/", StaticFiles(directory="./frontend"), name="static")
