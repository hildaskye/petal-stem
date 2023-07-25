from fastapi import (
    APIRouter,
    Depends,
    Response,
    HTTPException,
    status,
    Request,
)
from authenticator import authenticator
from typing import Union, List, Optional
from queries.community_page import UserGardens, Error, GardenOut

PROJECT_ID = "bababoo"
PRIVATE_KEY = "wheeeeeeeeee"

router = APIRouter()


@router.get("/api/garden", response_model=Union[List[GardenOut], Error])
def get_all(
    repo: UserGardens = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    message = repo.get_all()
    if message == {"message": "Could not get Gardens"}:
        response.status_code = 404
    return message
