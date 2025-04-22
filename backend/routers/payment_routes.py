from typing import Annotated
from beanie import PydanticObjectId
from fastapi import APIRouter, Depends, HTTPException, Path, status
from backend.models.payment import Payment, PaymentRequest
from backend.routers.user_routes import TokenData, get_current_user, get_user

payment_router = APIRouter()

max_id: int = 0
payment_list = []


@payment_router.get("")
async def get_payments(
    current_user: TokenData = Depends(get_current_user),
) -> list[Payment]:
    return await Payment.find(Payment.user_created == current_user.username).to_list()


# get method
# PydanticObjectId
@payment_router.get("/{payment_id}")
async def get_payment_by_id(
    payment_id: PydanticObjectId, current_user: Annotated[TokenData, Depends(get_user)]
) -> Payment:
    payment = await Payment.get(payment_id)
    if payment:
        return payment
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Payment with id {payment_id} not found",
    )


# post method/create
@payment_router.post("", status_code=status.HTTP_201_CREATED)
async def add_payment(
    payment: PaymentRequest, current_user: TokenData = Depends(get_current_user)
) -> Payment:
    new_payment = Payment(
        title=payment.title,
        total=payment.total,
        desc=payment.desc,
        due_date=payment.due_date,
        paid=payment.paid,
        created_by=current_user.username,
    )
    await Payment.insert_one(new_payment)
    return new_payment


# put method/update
@payment_router.put("/{payment_id}")
async def update_payment(
    input_payment: PaymentRequest, payment_id: PydanticObjectId
) -> dict:
    existing_payment = await Payment.get(payment_id)
    if existing_payment:
        existing_payment.title = input_payment.title
        existing_payment.desc = input_payment.desc
        existing_payment.total = input_payment.total
        existing_payment.due_date = input_payment.due_date
        existing_payment.paid = input_payment.paid
        existing_payment.created_by = input_payment.created_by
        await existing_payment.save()
        return {"message": f"The payment with ID={payment_id} is updated."}
    return {"message": f"The payment with ID={payment_id} is not found."}


# delete method/delete
@payment_router.delete("/{payment_id}")
async def remove_payment(payment_id: PydanticObjectId) -> dict:
    payment = await Payment.get(payment_id)
    if payment:
        await payment.delete()
        return {"message": f"The payment with ID={payment_id} is deleted."}
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"payment with id {payment_id} not found",
    )


@payment_router.delete("/payments")
async def clear_all_payments(current_user: TokenData = Depends(get_current_user)):
    result = await Payment.find(Payment.created_by == current_user.username).delete()
    return {"deleted_count": result}
