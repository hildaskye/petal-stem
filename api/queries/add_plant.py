from pydantic import BaseModel
from queries.pool import pool


class Error(BaseModel):
    message: str


class PlantIn(BaseModel):
    nickname: str
    log: str
    user_id: int
    species_id: int


class PlantOut(BaseModel):
    id: int
    nickname: str
    log: str
    user_id: int
    species_id: int


class PlantRepository:
    def create(self, plant: PlantIn) -> PlantOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO personal_plant
                            (nickname, log, user_id, species_id)
                        VALUES
                            (%s, %s, %s, %s)
                        """,
                        [
                            plant.nickname,
                            plant.log,
                            plant.user_id,
                            plant.species_id,
                        ],
                    )
                    db.execute(
                        "SELECT id FROM personal_plant WHERE nickname = %s",
                        [plant.nickname],
                    )
                    id = db.fetchone()[0]
                    old_data = plant.dict()
                    return PlantOut(id=id, **old_data)
        except Exception as e:
            print("error: ", e)
            return Error(message="Cannot add plant!")
