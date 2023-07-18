from fastapi import APIRouter, Depends
from typing import Union, List
from queries.plant_detail import (
    Error,
    PlantDetailOut,
    PlantDetailRepository,
)

router = APIRouter()

@router.get("/api/garden/{user_id}/plant/{plant_id}", response_model=Union[List[PlantDetailOut], Error])
def get_plant_detail(
    user_id: int,
    plant_id: int,
    repo: PlantDetailRepository = Depends()
):
    return repo.get_plant_detail(user_id, plant_id)
