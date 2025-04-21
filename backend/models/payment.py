from pydantic import BaseModel
from beanie import Document


class Payment(Document):
    title: str
    desc: str
    total: float | int
    due_date: str
    paid: bool

    class Settings:
        name = "payments"


class PaymentRequest(BaseModel):
    title: str
    desc: str
    total: float | int
    due_date: str
    paid: bool
