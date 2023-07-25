from fastapi import APIRouter, Depends
from queries.delete_species import SpeciesRepository
from authenticator import authenticator


router = APIRouter()


@router.delete("/api/species/{species_id}", response_model=bool)
def delete_species(
    species_id: int,
    repo: SpeciesRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(species_id)
