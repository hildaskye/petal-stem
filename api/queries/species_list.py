from pydantic import BaseModel
from typing import List, Union
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


class SpeciesList:
    def species_list(self) -> Union[List[SpeciesOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                              SELECT species.id
                                , species.name
                                , species.picture
                                , species.location_type
                                , species.cycle_type
                                , species.user_id
                            FROM species
                            ORDER BY species.id;
                        """
                    )
                    result = []
                    for record in db:
                        species = SpeciesOut(
                            id=record[0],
                            name=record[1],
                            picture=record[2],
                            location_type=record[3],
                            cycle_type=record[4],
                            user_id=record[5],
                        )
                        result.append(species)
                    return result
        except Exception as e:
            print(e)
            return {"could not get species, error:": e}
