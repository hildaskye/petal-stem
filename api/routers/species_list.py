from fastapi import APIRouter, Depends, Response
from authenticator import authenticator
from typing import Union, List
from queries.species_list import SpeciesList, Error, SpeciesOut

router = APIRouter()


@router.get("/api/species", response_model=Union[List[SpeciesOut], Error])
def species_list(
    repo: SpeciesList = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    message = repo.species_list()
    if message == {"message": "Could not get list of species"}:
        Response.status_code = 404
    return message
