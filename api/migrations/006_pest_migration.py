steps = [
    [
        """
        CREATE TABLE pest (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(1000) NOT NULL,
            picture VARCHAR(1000) NOT NULL,
            log VARCHAR(100000) NOT NULL,
            user_id INTEGER NOT NULL REFERENCES users(id)
        );
        """,
        """
        DROP TABLE pest;
        """,
    ]
]
