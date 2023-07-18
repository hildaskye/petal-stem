from queries.pool import pool


class SpeciesRepository:
    def delete(self, species_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM species
                        WHERE id = %s
                        """,
                        [species_id],
                    )
                    return True
        except Exception as e:
            print("!ERROR!", e)
            return False
