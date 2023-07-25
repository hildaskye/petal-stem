from fastapi import APIRouter, Depends
from typing import Union
from authenticator import authenticator
from queries.add_species import Error, SpeciesIn, SpeciesOut, SpeciesRepository


router = APIRouter()


@router.post("/api/species", response_model=Union[SpeciesOut, Error])
def add_species(
    species: SpeciesIn,
    repo: SpeciesRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(species)
