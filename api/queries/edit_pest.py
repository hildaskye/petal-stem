from pydantic import BaseModel
from typing import Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class PestEditIn(BaseModel):
    name: str
    picture: str
    log: str
    user_id: int


class PestEditOut(BaseModel):
    id: int
    name: str
    picture: str
    log: str
    user_id: int


class PestRepository:
    def update(
        self, pest_id: int, pest: PestEditIn
    ) -> Union[PestEditOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE pest
                        SET name = %s
                          , picture = %s
                          , log = %s
                          , user_id = %s
                        WHERE id = %s
                        """,
                        [
                            pest.name,
                            pest.picture,
                            pest.log,
                            pest.user_id,
                            pest_id,
                        ],
                    )

                    return self.pest_in_to_out(pest_id, pest)
        except Exception as e:
            print("ERROR", e)
            return {"message": "Could not update pest information"}

    def pest_in_to_out(self, id: int, pest: PestEditIn):
        old_data = pest.dict()
        return PestEditOut(id=id, **old_data)
