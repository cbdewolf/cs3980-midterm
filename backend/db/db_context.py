from beanie import init_beanie
from models.my_config import get_settings
from motor.motor_asyncio import AsyncIOMotorClient
from models import Payment, User


async def init_db():
    my_config = get_settings()
    client = AsyncIOMotionClient(my_config.connection_string)
    db = client["payment-db"]
    await init_beanie(database=db, document_models=[User, Payment])


# this is the point where my pc died
