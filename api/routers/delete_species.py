from fastapi import APIRouter, Depends
from queries.delete_species import SpeciesRepository


router = APIRouter()


@router.delete("/api/species/{species_id}", response_model=bool)
def delete_species(
    species_id: int, repo: SpeciesRepository = Depends()
) -> bool:
    return repo.delete(species_id)
