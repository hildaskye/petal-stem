from fastapi import APIRouter, Depends
from typing import Union, List
from queries.add_species import (
    Error,
    SpeciesIn,
    SpeciesOut,
    SpeciesRepository
)

router = APIRouter()

@router.post("/api/species", response_model=Union[SpeciesOut, Error])
def add_species(
    species: SpeciesIn,
    repo: SpeciesRepository = Depends()
):
    return repo.create(species)
