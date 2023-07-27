from jwtdown_fastapi.authentication import Token
from typing import List
from pydantic import BaseModel
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from queries.accounts import (
    AccountRepository,
    DuplicateAccountError,
    AccountIn,
    AccountOut,
)
from authenticator import authenticator


router = APIRouter()


class Error(BaseModel):
    message: str


class HttpError(BaseModel):
    detail: str


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())


@router.get("/api/accounts", response_model=List[AccountOut])
def get_all_accounts(
    repo: AccountRepository = Depends(),
):
    return repo.get_all()


@router.delete("/api/accounts/{id}", response_model=bool)
async def delete(
    id: int,
    repo: AccountRepository = Depends(),
) -> bool:
    return repo.delete(id)
