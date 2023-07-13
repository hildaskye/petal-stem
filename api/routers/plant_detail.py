from fastapi import APIRouter, Depends
from typing import Union, List
from queries.plant_detail import (
    Error,
    PlantDetailOut,
    PlantDetailRepository,
)

router = APIRouter()


@router.get("/plant_detail", response_model=Union[Error, List[PlantDetailOut]]) # ("/api/plant/{plant_id}")
def get_plant_detail(
    repo: PlantDetailRepository = Depends()
):
    return repo.get_plant_detail()
