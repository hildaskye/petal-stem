from fastapi import APIRouter, Depends
from typing import Union
from queries.plant_delete import (
    DeletePlantRepository,
    Error,
)

router = APIRouter()


@router.delete("/api/garden/{user_id}/plant/{plant_id}", response_model=Union[bool, Error])
def delete_plant(
    user_id: int,
    plant_id: int,
    repo: DeletePlantRepository = Depends()
):
    return repo.delete_plant(user_id, plant_id)
