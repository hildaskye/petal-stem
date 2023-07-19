from pydantic import BaseModel
from typing import Union, List
from queries.pool import pool


class Error(BaseModel):
    message: str


class PestListIn(BaseModel):
    name: str
    picture: str
    log: str
    user_id: int


class PestListOut(BaseModel):
    id: int
    name: str
    picture: str
    log: str
    user_id: int


class PestRepository:
    def list_pest(
        self
    ) -> Union[List[PestListOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT pest.id, pest.name, pest.picture, pest.log, pest.user_id
                        FROM pest
                        """,
                    )
                    result = []
                    for record in db:
                        pest = PestListOut(
                            id=record[0],
                            name=record[1],
                            picture=record[2],
                            log=record[3],
                            user_id=record[4],
                        )
                        result.append(pest)
                    return result
        except Exception as e:
            print("ERROR", e)
            return {"message": "Could not get pest information"}
