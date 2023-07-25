from fastapi import APIRouter, Depends
from typing import Union, List
from authenticator import authenticator
from queries.pest_add import Error, PestAddIn, PestAddOut, PestRepository

router = APIRouter()


@router.post("/api/pest", response_model=Union[PestAddOut, Error])
def pest_add(
    pest: PestAddIn,
    repo: PestRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(pest)
