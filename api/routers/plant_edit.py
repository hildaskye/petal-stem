from fastapi import APIRouter, Depends
from typing import Union
from authenticator import authenticator
from queries.plant_edit import (
    Error,
    PlantEditIn,
    PlantEditOut,
    PlantEditRepository,
)

router = APIRouter()


@router.put(
    "/api/garden/{user_id}/plant/{plant_id}",
    response_model=Union[PlantEditOut, Error],
)
def put_plant_edit(
    user_id: int,
    plant_id: int,
    plant: PlantEditIn,
    repo: PlantEditRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[PlantEditOut, Error]:
    return repo.update(user_id, plant_id, plant)
