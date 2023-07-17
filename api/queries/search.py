from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class SearchOut(BaseModel):
    search_result: str
    table: str


class BlankSearchResult(BaseModel):
    message: str = "Search complete! No results found!"


class SearchClass:
    def search(
        self, term: str
    ) -> Union[List[SearchOut], BlankSearchResult, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                            SELECT nickname AS "result", 'personal_plant' AS "Table"
                                FROM personal_plant
                                WHERE nickname ILIKE %(term)s
                            UNION
                            SELECT username, 'username'
                                AS "Table"
                                FROM users
                                WHERE username ILIKE %(term)s
                            UNION
                            SELECT fullname AS users_name, 'full_name' AS "Table"
                                FROM users
                                WHERE fullname ILIKE %(term)s
                            UNION
                            SELECT species.name AS species, 'species' AS "Table"
                                FROM species
                                WHERE species.name ILIKE %(term)s
                            UNION
                            SELECT pest.name AS pest, 'pest' AS "Table"
                                FROM pest
                                WHERE pest.name ILIKE %(term)s
                            ORDER BY "Table"
                        """,
                        {"term": f"%{term}%"},
                    )
                    result = []
                    for record in db:
                        search = SearchOut(
                            search_result=record[0],
                            table=record[1],
                        )
                        result.append(search)
                    if result == []:
                        return BlankSearchResult()
                    else:
                        return result
        except Exception as e:
            print(e)
            return {"could not get results, error:": e}
