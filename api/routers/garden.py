from fastapi import APIRouter, Depends
from typing import Union, List
from authenticator import authenticator
from queries.garden import (
    Error,
    GardenOut,
    GardenRepository,
)

router = APIRouter()


@router.get(
    "/api/garden/{user_id}", response_model=Union[List[GardenOut], Error]
)
def get_garden(
    user_id: int,
    repo: GardenRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_garden(user_id)
