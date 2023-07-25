from fastapi import APIRouter, Depends
from typing import Union
from authenticator import authenticator
from queries.edit_pest import (
    Error,
    PestEditIn,
    PestEditOut,
    PestRepository,
)


router = APIRouter()


@router.put("/api/pest/{pest_id}", response_model=Union[PestEditOut, Error])
def edit_pest(
    pest_id: int,
    pest: PestEditIn,
    repo: PestRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[PestEditOut, Error]:
    return repo.update(pest_id, pest)
