from db.db_context import init_db
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from payment_routes import payment_router


async def lifespan():
    await init_db()


app = FastAPI(title="payment-tracker-app", version="2.0.0", lifespan=lifespan)
app.include_router(payment_router, tags=["Payments"], prefix="/payments")
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def welcome() -> dict:
    return FileResponse("../frontend/index.html")


app.mount("/", StaticFiles(directory="../frontend"), name="static")
