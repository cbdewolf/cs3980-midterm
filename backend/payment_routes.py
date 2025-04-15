from typing import Annotated
from fastapi import APIRouter, HTTPException, Path, status
from backend.payment import Payment, PaymentRequest

payment_router = APIRouter()

max_id: int = 0
payment_list = []


@payment_router.get("")
async def get_payments() -> list[Payment]:
    return payment_list


# get method
@payment_router.get("/{payment_id}")
async def get_payment_by_id(payment_id: Annotated[int, Path(ge=0, lt=1000)]) -> Payment:
    for payment in payment_list:
        if payment.payment_id == payment_id:
            return payment
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Payment with id {payment_id} not found",
    )


# post method/create
@payment_router.post("", status_code=status.HTTP_201_CREATED)
async def add_payment(payment: PaymentRequest) -> Payment:
    global max_id
    max_id += 1
    new_payment = Payment(
        payment_id=max_id,
        title=payment.title,
        total=payment.total,
        desc=payment.desc,
        due_date=payment.due_date,
        paid=payment.paid,
    )
    payment_list.append(new_payment)
    return new_payment


# put method/update
@payment_router.put("/{payment_id}")
async def update_payment(input_payment: PaymentRequest, payment_id: int) -> dict:
    for payment in payment_list:
        if payment.payment_id == payment_id:
            payment.title = input_payment.title
            payment.desc = input_payment.desc
            payment.total = input_payment.total
            payment.due_date = input_payment.due_date
            payment.paid = input_payment.paid
            return {"message": "Payment updated successfully"}

    return {"message": f"The payment with ID={payment_id} is not found."}


# delete method/delete
@payment_router.delete("/{payment_id}")
async def remove_payment(payment_id: int) -> dict:
    global payment_list
    for i in range(len(payment_list)):
        payment = payment_list[i]
        if payment.payment_id == payment_id:
            payment_list.pop(i)
            return {"msg": f"the payment with ID={payment_id} is removed"}
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"payment with id {payment_id} not found",
    )
