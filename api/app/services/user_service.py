from api.app.security import get_password
from api.app.models.user_model import User
from api.app.schemas.user_schema import UserAuth


class UserService:
    @staticmethod
    async def create_user(user: UserAuth):
        user_in = User(username=user.username,
                       email=user.email,
                       hashed_password=get_password(user.password))
        await user_in.save()
        return user_in
