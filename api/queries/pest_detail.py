from pydantic import BaseModel
from typing import List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class PestDetailIn(BaseModel):
    name: str
    picture: str
    log: str
    user_id: int


class PestDetailOut(BaseModel):
    id: int
    name: str
    picture: str
    log: str
    user_id: int


class PestDetailRepository:
    def get_pest_detail(self, pest_id: int) -> Union[List[PestDetailOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT pest.id, pest.name, pest.picture, pest.log, pest.user_id
                        FROM pest
                        WHERE id = %s
                        """,
                        [pest_id]
                    )
                    result = []
                    for record in db:
                        pest_detail = PestDetailOut(
                            id=record[0],
                            name=record[1],
                            picture=record[2],
                            log=record[3],
                            user_id=record[4],
                        )
                        result.append(pest_detail)
                    return result
        except Exception as e:
            print("error: ", e)
            return Error(message="Could not get pest details")
