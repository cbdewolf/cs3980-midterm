from beanie import init_beanie
from backend.models.my_config import get_settings
from motor.motor_asyncio import AsyncIOMotorClient
from backend.models.payment import Payment
from backend.models.user import User


async def init_db():
    my_config = get_settings()
    client = AsyncIOMotorClient(my_config.connection_string)
    db = client["payment-tracker-app"]
    await init_beanie(database=db, document_models=[User, Payment])


# this is the point where my pc died
