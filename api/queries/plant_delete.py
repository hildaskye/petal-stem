from pydantic import BaseModel
from typing import Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class DeletePlantRepository:
    def delete_plant(self, user_id: int, plant_id: int) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM personal_plant
                        WHERE user_id = %s AND id = %s
                        """,
                        [user_id, plant_id]
                    )
                    conn.commit()
                    return True
        except Exception as e:
            print("error: ", e)
            return Error(message="Could not delete the plant")
