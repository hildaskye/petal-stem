from fastapi import APIRouter, Depends, Response
from authenticator import authenticator
from typing import Union, List
from queries.species_list import SpeciesList, Error, SpeciesOut

PROJECT_ID = "bababoo"
PRIVATE_KEY = "wheeeeeeeeee"

router = APIRouter()


@router.get("/api/species", response_model=Union[List[SpeciesOut], Error])
def get_all(
    repo: SpeciesList = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    message = repo.get_all()
    if message == {"message": "Could not get list of species"}:
        Response.status_code = 404
    return message
