from fastapi import (
    APIRouter,
    Depends,
    Response,
)
from authenticator import authenticator
from typing import Union, List
from queries.community_page import UserGardens, Error, GardenOut

router = APIRouter()


@router.get("/api/garden", response_model=Union[List[GardenOut], Error])
def get_all(
    repo: UserGardens = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    message = repo.get_all()
    if message == {"message": "Could not get Gardens"}:
        Response.status_code = 404
    return message
