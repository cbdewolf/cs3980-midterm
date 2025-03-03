from fastapi import APIRouter, status
from payment import Payment

payment_router = APIRouter()

payment_list = []


@payment_router.get("")
async def get_payments() -> dict:
    pass


@payment_router.get("/{payment_id}")
async def get_payment_by_id(payment_id: int) -> Payment:
    pass


@payment_router.post("", status_code=status.HTTP_201_CREATED)
async def add_payment(payment: Payment) -> Payment:
    pass


@payment_router.delete("{payment_id}")
async def remove_payment(payment: Payment) -> Payment:
    pass
