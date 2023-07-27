from fastapi import APIRouter, Depends
from authenticator import authenticator
from queries.species_detail import SpeciesOut, SpeciesRepository, Error
from typing import Union

router = APIRouter()


@router.get(
    "/api/species/{species_id}", response_model=Union[SpeciesOut, Error]
)
def get_species_detail(
    species_id: int,
    repo: SpeciesRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_species_detail(species_id)
