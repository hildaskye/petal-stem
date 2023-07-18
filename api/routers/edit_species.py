from fastapi import APIRouter, Depends
from typing import Union
from queries.edit_species import (
    Error,
    SpeciesEditIn,
    SpeciesEditOut,
    SpeciesRepository,
)

router = APIRouter()


@router.put(
    "/api/species/{species_id}", response_model=Union[SpeciesEditOut, Error]
)
def edit_species(
    species_id: int,
    species: SpeciesEditIn,
    repo: SpeciesRepository = Depends(),
) -> Union[SpeciesEditOut, Error]:
    return repo.update(species_id, species)
