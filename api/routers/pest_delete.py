from fastapi import APIRouter, Depends
from typing import Union
from authenticator import authenticator
from queries.pest_delete import (
    DeletePestRepository,
    Error,
)

router = APIRouter()


@router.delete("/api/pest/{pest_id}", response_model=Union[bool, Error])
def delete_pest(
    pest_id: int,
    repo: DeletePestRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.delete_pest(pest_id)
