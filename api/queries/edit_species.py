from pydantic import BaseModel
from typing import Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class SpeciesEditIn(BaseModel):
    name: str
    picture: str
    location_type: str
    cycle_type: str
    user_id: int


class SpeciesEditOut(BaseModel):
    id: int
    name: str
    picture: str
    location_type: str
    cycle_type: str
    user_id: int


class SpeciesRepository:
    def update(
        self, species_id: int, species: SpeciesEditIn
    ) -> Union[SpeciesEditOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE species
                        SET name = %s
                          , picture = %s
                          , location_type = %s
                          , cycle_type = %s
                          , user_id = %s
                        WHERE id = %s
                        """,
                        [
                            species.name,
                            species.picture,
                            species.location_type,
                            species.cycle_type,
                            species.user_id,
                            species_id,
                        ],
                    )
                    return self.species_in_to_out(species_id, species)
        except Exception as e:
            print("!ERROR!", e)
            return {"Could not update species information": e}

    def species_in_to_out(self, id: int, species: SpeciesEditOut):
        old_data = species.dict()
        return SpeciesEditOut(id=id, **old_data)
