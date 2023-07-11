steps = [
    [
        """
        CREATE TABLE personal_plant (
            id SERIAL PRIMARY KEY,
            nickname VARCHAR(100) NOT NULL,
            log VARCHAR(100000) NOT NULL,
            user_id INTEGER NOT NULL REFERENCES users(id),
            species_id INTEGER NOT NULL REFERENCES species(id)
        );
        """,
        """
        DROP TABLE personal_plant;
        """,
    ]
]
