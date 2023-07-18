from pydantic import BaseModel
from typing import List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class GardenIn(BaseModel):
    nickname: str
    log: str
    user_id: int
    species_id: int


class GardenOut(BaseModel):
    id: int
    nickname: str
    log: str
    user_id: int
    species_id: int
    picture: str


class GardenRepository:
    def get_garden(self, user_id: int) -> Union[List[GardenOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT plant.id, plant.nickname, plant.log, plant.user_id, plant.species_id, species.picture
                        FROM personal_plant AS plant
                        JOIN species ON plant.species_id = species.id
                        WHERE plant.user_id = %s
                        """,
                        [user_id]
                    )
                    result = []
                    for record in db:
                        garden = GardenOut(
                            id=record[0],
                            nickname=record[1],
                            log=record[2],
                            user_id=record[3],
                            species_id=record[4],
                            picture=record[5],
                        )
                        result.append(garden)
                    return result
        except Exception as e:
            print("error: ", e)
            return Error(message="Could not get plant details for the user")
