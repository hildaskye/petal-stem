from fastapi.testclient import TestClient
from main import app
from queries.pest_list import PestRepository
from authenticator import authenticator
from pydantic import BaseModel


client = TestClient(app)


class PestListOut(BaseModel):
    id: int
    name: str
    picture: str
    log: str
    user_id: int


class AccountOut(BaseModel):
    id: int
    fullname: str
    username: str
    email: str


def fake_get_current_account_data():
    return AccountOut(
        id=1,
        fullname="test",
        username="test",
        email="test",
    )


def fake_get_current_pest_data():
    return PestListOut(
        id=1,
        name="test",
        picture="test",
        log="test",
        user_id=1,
    )


class EmptyPestListRepository:
    def list_pest(self):  # change to "list_pest" (here, or file)
        return [
            {
                "id": 1,
                "name": "test",
                "picture": "test",
                "log": "test",
                "user_id": 1,
            }
        ]


def test_get_all_pests():
    app.dependency_overrides[PestRepository] = EmptyPestListRepository
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = fake_get_current_account_data
    response = client.get("/api/pest")
    app.dependency_overrides = {}

    expected = {
        "id": 1,
        "name": "test",
        "picture": "test",
        "log": "test",
        "user_id": 1,
    }

    assert response.status_code == 200
    assert response.json() == [expected]
