from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from payment_routes import payment_router

app = FastAPI(title="pmp-app")

app.include_router(payment_router, tags=["Payments"], prefix="/payments")


@app.get("/")
async def welcome() -> dict:
    return FileResponse("./frontend/index.html")


app.mount("/", StaticFiles(directory="frontend"), name="static")
