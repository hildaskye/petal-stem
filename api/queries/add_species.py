from pydantic import BaseModel
from queries.pool import pool


class Error(BaseModel):
    message: str


class SpeciesIn(BaseModel):
    name: str
    picture: str
    location_type: str
    cycle_type: str
    user_id: int


class SpeciesOut(BaseModel):
    id: int
    name: str
    picture: str
    location_type: str
    cycle_type: str
    user_id: int


class SpeciesRepository:
    def create(self, species: SpeciesIn) -> SpeciesOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO species
                            (name, picture, location_type, cycle_type, user_id)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        """,
                        [
                            species.name,
                            species.picture,
                            species.location_type,
                            species.cycle_type,
                            species.user_id,
                        ],
                    )
                    db.execute(
                        "SELECT id FROM species WHERE name = %s",
                        [species.name],
                    )
                    id = db.fetchone()[0]
                    old_data = species.dict()
                    return SpeciesOut(id=id, **old_data)
        except Exception as e:
            print("error: ", e)
            return Error(message="Cannot add species!!")
