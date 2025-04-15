from pydantic import BaseModel
from beanie import Document


class Payment(Document):
    payment_id: int
    title: str
    desc: str
    total: float | int
    due_date: str = None
    paid: bool


class PaymentRequest(BaseModel):
    title: str
    desc: str
    total: float | int
    due_date: str
    paid: bool
