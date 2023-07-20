from fastapi import APIRouter, Depends
from typing import Union, List
from queries.pest_add import (
    Error,
    PestAddIn,
    PestAddOut,
    PestRepository
)

router = APIRouter()

@router.post("/api/pest", response_model=Union[PestAddOut, Error])
def pest_add(
    pest: PestAddIn,
    repo: PestRepository = Depends()
):
    return repo.create(pest)
