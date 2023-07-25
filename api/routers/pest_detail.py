from fastapi import APIRouter, Depends
from typing import Union, List
from authenticator import authenticator
from queries.pest_detail import (
    Error,
    PestDetailOut,
    PestDetailRepository,
)

router = APIRouter()

@router.get("/api/pest/{pest_id}", response_model=Union[List[PestDetailOut], Error])
def get_pest_detail(
    pest_id: int,
    repo: PestDetailRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_pest_detail(pest_id)
