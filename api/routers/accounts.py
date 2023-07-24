from jwtdown_fastapi.authentication import Token
from typing import List, Union
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


# @router.get("/api/protected", response_model=bool)
# async def get_protected(
#     request: Request,
#     account_data: dict = Depends(authenticator.get_current_account_data),
# ):
#     return True


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


# @router.put("/api/accounts/{email}", response_model=AccountToken | HttpError)
# async def update_account(
#     email: str,
#     info: AccountIn,
#     request: Request,
#     response: Response,
#     repo: AccountRepository = Depends(),
# ):
#     original_password = info.password
#     hashed_password = authenticator.hash_password(info.password)
#     info.password = hashed_password
#     updated_account = repo.update(email, info)
#     if not updated_account:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Account not found or update failed",
#         )
#     form = AccountForm(
#         username=updated_account.email, password=original_password
#     )
#     token = await authenticator.login(response, request, form, repo)
#     return AccountToken(account=updated_account, **token.dict())
