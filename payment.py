from pydantic import BaseModel


class Payment(BaseModel):
    payment_id: int
    title: str
    desc: str
    total: float | int
    due_date: str = None


class PaymentRequest(BaseModel):
    title: str
    desc: str
    total: float | int
    due_date: str
