steps = [
    [
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            fullname VARCHAR(1000) NOT NULL,
            username VARCHAR(1000) NOT NULL,
            email VARCHAR(1000) NOT NULL UNIQUE,
            password VARCHAR(1000) NOT NULL
        );
        """,
        """
        DROP TABLE users;
        """,
    ]
]
