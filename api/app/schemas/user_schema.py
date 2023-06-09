from uuid import UUID
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class UserAuth(BaseModel):
    email: EmailStr = Field(..., description="user email")
    username: str = Field(..., min_length=5, max_length=50, description="user username")
    password: str = Field(..., min_length=5, max_length=24, description="user password")


class UserOutData(BaseModel):
    user_id: UUID
    username: str
    email: EmailStr
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    disabled: Optional[bool] = None


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    password: Optional[str] = None
