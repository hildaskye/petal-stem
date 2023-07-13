from pydantic import BaseModel
from typing import List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class PlantDetailIn(BaseModel):
    nickname: str
    log: str
    user_id: int
    species_id: int


class PlantDetailOut(BaseModel):
    id: int
    nickname: str
    log: str
    user_id: int
    species_id: int


class PlantDetailRepository:
    def get_plant_detail(self) -> Union[Error, List[PlantDetailOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, nickname, log, user_id, species_id
                        FROM personal_plant

                        """
                    )
                    result = []
                    for record in db:
                        plant_detail = PlantDetailOut(
                            id=record[0],
                            nickname=record[1],
                            log=record[2],
                            user_id=record[3],
                            species_id=record[4],
                        )
                        result.append(plant_detail)
                    return result
        except Exception as e:
            print("errroooorrrrr", e)
            return {"message": "Could not get all plant details"}
