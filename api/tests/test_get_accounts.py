from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountRepository


client = TestClient(app)


class EmptyAccountRepository:
    def get_all(self):
        return [
            {
                "id": 1,
                "fullname": "test",
                "username": "test",
                "email": "test@email.com",
            },
        ]


def test_get_all_accounts():
    app.dependency_overrides[AccountRepository] = EmptyAccountRepository
    response = client.get("/api/accounts")
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 1,
            "fullname": "test",
            "username": "test",
            "email": "test@email.com",
        }
    ]
