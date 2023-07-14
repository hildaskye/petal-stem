from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class GardenOut(BaseModel):
    id: int
    username: str
    plant_nickname: Optional[str]
    species_name: str
    uploader_name: str


class UserGardens:
    def get_all(self) -> Union[List[GardenOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                              SELECT personal_plant.id
                                , species.name AS species_name
                                , personal_plant.nickname AS plant_nickname
                                , users.username
                                , users.fullname AS "full_name"
                            FROM personal_plant
                            JOIN species
                                ON (personal_plant.species_id = species.id)
                            JOIN users
                                ON (personal_plant.user_id = users.id)
                            ORDER BY users.id;
                        """
                    )
                    result = []
                    for record in db:
                        garden = GardenOut(
                            id=record[0],
                            species_name=record[1],
                            plant_nickname=record[2],
                            username=record[3],
                            uploader_name=record[4],
                        )
                        result.append(garden)
                    return result
        except Exception as e:
            print(e)
            return {"could not get Gardens, error:": e}
