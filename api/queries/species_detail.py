from pydantic import BaseModel
from typing import Union
from queries.pool import pool

class Error(BaseModel):
    message: str

class SpeciesOut(BaseModel):
    id: int
    name: str
    picture: str
    location_type: str
    cycle_type: str
    user_id: int

class SpeciesRepository:
    def get_species_detail(self, species_id: int) -> Union[SpeciesOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT species.id
                            , species.name
                            , species.picture
                            , species.location_type
                            , species.cycle_type
                            , species.user_id
                        FROM species
                        WHERE species.id = %s;
                        """,
                        (species_id,)
                    )
                    record = db.fetchone()
                    if record:
                        species = SpeciesOut(
                            id=record[0],
                            name=record[1],
                            picture=record[2],
                            location_type=record[3],
                            cycle_type=record[4],
                            user_id=record[5],
                        )
                        return species
                    else:
                        return Error(message="Species not found")
        except Exception as e:
            print(e)
            return Error(message="Could not get species, error: " + str(e))
