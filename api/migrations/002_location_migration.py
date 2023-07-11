steps = [
    [
        """
        CREATE TABLE location (
            id SERIAL NOT NULL PRIMARY KEY,
            type VARCHAR(100) NOT NULL UNIQUE
        );
        """,
        """
        DROP TABLE location;
        """,
    ],
    [
        """
        INSERT INTO location (type)
        VALUES
            ('Indoor'),
            ('Outdoor');
        """,
        """
        DROP TABLE location;
        """,
    ]
]
