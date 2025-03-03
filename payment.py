from pydantic import BaseModel


class Payment(BaseModel):
    payment_id: int
    total: float | int
    desc: str
