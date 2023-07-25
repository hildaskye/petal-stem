import os
from psycopg_pool import ConnectionPool

# pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))
pool = ConnectionPool("DATABASE_URL")

from pydantic import BaseModel

from typing import List, Union

# from queries.pool import pool


class Error(BaseModel):
    message: str


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    fullname: str
    username: str
    email: str
    password: str


class AccountOut(BaseModel):
    id: int
    fullname: str
    username: str
    email: str


# # class AccountUpdate(BaseModel):
# #     pass


class AccountOutWithPassword(AccountOut):
    id: int
    fullname: str
    username: str
    email: str
    hashed_password: str


class AccountRepository:
    def get_one(self, email: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM users
                        WHERE email = %s;
                        """,
                        [email],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_account(record)
        except Exception as e:
            print("!ERROR!", e)
            return {"Could not get account": e}

    def create(
        self, account: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users (
                            fullname
                            , username
                            , email
                            , hashed_password)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id
                            , fullname
                            , username
                            , email
                            , hashed_password;
                        """,
                        [
                            account.fullname,
                            account.username,
                            account.email,
                            hashed_password,
                        ],
                    )
                    id = result.fetchone()[0]
                    return AccountOutWithPassword(
                        id=id,
                        fullname=account.fullname,
                        username=account.username,
                        email=account.email,
                        hashed_password=hashed_password,
                    )
        except Exception as e:
            print(e)
            return {"Could not create account": e}

    def get_all(self) -> Union[AccountOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM users
                        ORDER BY id
                        """
                    )
                    return [
                        self.record_to_account(record) for record in result
                    ]
        except Exception as e:
            return {"Could not get all accounts": e}

    def delete(self, id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s
                        """,
                        [id],
                    )
                    return True
        except Exception:
            return False

    def record_to_account(self, record):
        result = AccountOutWithPassword(
            id=record[0],
            fullname=record[1],
            username=record[2],
            email=record[3],
            hashed_password=record[4],
        )
        return result

    def account_in_to_out(self, id: int, account: AccountIn):
        old_data = account.dict()
        return AccountOut(id=id, **old_data)

    #     # def update_acct(
    #     #     self,
    #     #     id: int,
    #     #     hashed_password: str,
    #     #     accounts: AccountIn
    #     # ) -> Union[AccountOut, Error]:
    #     #     try:
    #     #         with pool.connection() as conn:
    #     #             with conn.cursor() as db:
    #     #                 db.execute(
    #     #                     """
    #     #                     UPDATE users
    #     #                     SET fullname = %s
    #     #                         , username = %s
    #     #                         , email = %s
    #     #                         , password = %s
    #     #                     WHERE id = %s
    #     #                     """,
    #     #                     [
    #     #                         accounts.fullname,
    #     #                         accounts.username,
    #     #                         accounts.email,
    #     #                         hashed_password,
    #     #                         id,
    #     #                     ]
    #     #                 )
    #     #                 result = db.fetchone()
    #     #                 return self.record_to_account(result)
    #     #                 #     AccountOut(
    #     #                 #     id=id,
    #     #                 #     fullname=accounts.first_name,
    #     #                 #     username=accounts.username,
    #     #                 #     email=accounts.email,
    #     #                 #     hashed_password=hashed_password
    #     #                 # )
    #     #     except Exception as e:
    #     #         print(e)
    #     #         return {"Could not update account": e}
