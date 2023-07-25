from pydantic import BaseModel
from queries.pool import pool


class Error(BaseModel):
    message: str


class PestAddIn(BaseModel):
    name: str
    picture: str
    log: str
    user_id: int


class PestAddOut(BaseModel):
    id: int
    name: str
    picture: str
    log: str
    user_id: int


class PestRepository:
    def create(self, pest: PestAddIn) -> PestAddOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO pest
                            (name, picture, log, user_id)
                        VALUES
                            (%s, %s, %s, %s)
                        """,
                        [pest.name, pest.picture, pest.log, pest.user_id],
                    )
                    db.execute(
                        "SELECT id FROM pest WHERE name = %s", [pest.name]
                    )
                    id = db.fetchone()[0]
                    old_data = pest.dict()
                    return PestAddOut(id=id, **old_data)
        except Exception as e:
            print("error: ", e)
            return Error(message="Cannot add pest!")
