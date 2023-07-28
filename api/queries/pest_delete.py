from pydantic import BaseModel
from typing import Union
from queries.pool import pool


# pipeline force test


class Error(BaseModel):
    message: str


class DeletePestRepository:
    def delete_pest(self, pest_id: int) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM pest
                        WHERE id = %s
                        """,
                        [pest_id],
                    )
                    conn.commit()
                    return True
        except Exception as e:
            print("error: ", e)
            return Error(message="Could not delete the pest")
