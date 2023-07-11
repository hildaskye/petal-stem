steps = [
    [
        """
        CREATE TABLE cycle (
            id SERIAL NOT NULL PRIMARY KEY,
            type VARCHAR(50) NOT NULL UNIQUE
        );
        """,
        """
        DROP TABLE cycle;
        """,
    ],
    [
        """
        INSERT INTO cycle(type)
        VALUES
            ('Annual'),
            ('Biennial'),
            ('Perennial'),
            ('Other');
        """,
        """
        DROP TABLE cycle;
        """,
    ]
]
