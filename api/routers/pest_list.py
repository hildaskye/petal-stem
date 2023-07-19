from fastapi import APIRouter, Depends
from typing import List, Union
from queries.pest_list import (
    Error,
    PestListIn,
    PestListOut,
    PestRepository,
)

router = APIRouter()


@router.get("/api/pest", response_model=Union[List[PestListOut], Error])
def list_pest(
    repo: PestRepository = Depends(),
):
    return repo.list_pest()
