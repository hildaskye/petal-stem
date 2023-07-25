from fastapi import (
    APIRouter,
    Depends,
    Response,
    HTTPException,
    status,
    Request,
)
from typing import Union, List, Optional
from queries.search import SearchClass, Error, SearchOut
from authenticator import authenticator

PROJECT_ID = "bababoo"
PRIVATE_KEY = "wheeeeeeeeee"

router = APIRouter()


@router.get("/api/search/{term}", response_model=Union[List[SearchOut], Error])
def search(
    term: str,
    repo: SearchClass = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    message = repo.search(term)
    if message == {"message": "Could not get search results"}:
        response.status_code = 404
    return message
