steps = [
    [
        """
        CREATE TABLE species (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(1000) NOT NULL,
            picture VARCHAR(1000) NOT NULL,
            location_type VARCHAR(50) NOT NULL REFERENCES location(type),
            cycle_type VARCHAR(50) NOT NULL REFERENCES cycle(type),
            user_id INTEGER NOT NULL REFERENCES users(id)
        );
        """,
        """
        DROP TABLE species;
        """,
    ]
]
