from typing import Annotated
from fastapi import APIRouter, HTTPException, Path, status
from payment import Payment, PaymentRequest

payment_router = APIRouter()

max_id: int = 0
payment_list = []


@payment_router.get("")
async def get_payments() -> list[Payment]:
    return payment_list


@payment_router.get("/{payment_id}")
async def get_payment_by_id(payment_id: Annotated[int, Path(ge=0, lt=1000)]) -> Payment:
    for payment in payment_list:
        if payment.payment_id == payment_id:
            return payment
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Payment with id {payment_id} not found",
    )


@payment_router.post("", status_code=status.HTTP_201_CREATED)
async def add_payment(payment: Payment) -> Payment:
    global max_id
    max_id += 1
    new_payment = Payment(payment_id=max_id, total=payment.total, desc=payment.desc)
    payment_list.append(new_payment)
    return new_payment


@payment_router.put("/{payment_id}")
async def update_payment(input_payment: PaymentRequest, payment_id: int) -> dict:
    for payment in payment_list:
        if payment.id == payment_id:
            payment.title = input_payment.title
            payment.description = input_payment.description
            return {"message": "Todo updated successfully"}

    return {"message": f"The todo with ID={payment_id} is not found."}


@payment_router.delete("{payment_id}")
async def remove_payment(payment: Payment) -> Payment:
    for i in range(len(payment_list)):
        todo = payment_list[i]
        if todo.id == id:
            payment_list.pop(i)
            return {"msg": f"the todo with ID={id} is removed"}
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail=f"payment with id {id} not found"
    )
