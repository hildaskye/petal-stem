from pydantic import BaseModel
from typing import Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class PlantEditIn(BaseModel):
    nickname: str
    log: str
    user_id: int
    species_id: int


class PlantEditOut(BaseModel):
    id: int
    nickname: str
    log: str
    user_id: int
    species_id: int


class PlantEditRepository:
    def update(self, plant_id: int, plant: PlantEditIn) -> Union[PlantEditOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE personal_plant
                        SET nickname = %s
                            , log = %s
                            , user_id = %s
                            , species_id = %s
                        WHERE id = %s
                        """,
                        [
                            plant.nickname,
                            plant.log,
                            plant.user_id,
                            plant.species_id,
                            plant_id
                        ]
                    )
                    return self.plant_in_to_out(plant_id, plant)

        except Exception as e:
            print("MEOW", e)
            return {"Could not update plant info": e}

    def plant_in_to_out(self, id: int, plant: PlantEditOut):
        old_data = plant.dict()
        return PlantEditOut(id=id, **old_data)
