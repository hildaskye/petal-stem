from fastapi import APIRouter, Depends
from typing import List, Union
from authenticator import authenticator
from queries.pest_list import (
    Error,
    PestListOut,
    PestRepository,
)

router = APIRouter()


@router.get("/api/pest", response_model=Union[List[PestListOut], Error])
def list_pest(
    repo: PestRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.list_pest()
