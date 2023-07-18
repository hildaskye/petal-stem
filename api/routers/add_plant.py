from fastapi import APIRouter, Depends
from typing import Union, List
from queries.add_plant import (
    Error,
    PlantIn,
    PlantOut,
    PlantRepository
)

router = APIRouter()

@router.post("/api/garden/{user_id}/plant", response_model=Union[PlantOut, Error])
def add_plant(
    plant: PlantIn,
    repo: PlantRepository = Depends()
):
    return repo.create(plant)
