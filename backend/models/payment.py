from typing import Optional
from pydantic import BaseModel
from beanie import Document


class Payment(Document):
    title: str
    desc: str
    total: float | int
    due_date: str
    paid: bool
    # change later
    created_by: Optional[str] = None

    class Settings:
        name = "payments"


class PaymentRequest(BaseModel):
    title: str
    desc: str
    total: float | int
    due_date: str
    paid: bool
    created_by: Optional[str] = None
