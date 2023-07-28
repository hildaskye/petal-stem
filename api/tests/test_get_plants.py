from fastapi.testclient import TestClient
from main import app
from queries.community_page import UserGardens
from authenticator import authenticator
from pydantic import BaseModel
from typing import Optional

client = TestClient(app)


class GardenOut(BaseModel):
    id: int
    username: str
    plant_nickname: Optional[str]
    species_name: str
    uploader_name: str


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


def fake_get_current_plant_data():
    return GardenOut(
        id=1,
        username="test",
        plant_nickname="test",
        species_name="test",
        uploader_name="test",
    )


class EmptyGardenRepository:
    def get_all(self):
        return [
            {
                "id": 1,
                "username": "test",
                "plant_nickname": "test",
                "species_name": "test",
                "uploader_name": "test",
            }
        ]


def test_get_all_gardens():
    app.dependency_overrides[UserGardens] = EmptyGardenRepository
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = fake_get_current_account_data
    response = client.get("/api/garden")
    app.dependency_overrides = {}

    expected = {
        "id": 1,
        "username": "test",
        "plant_nickname": "test",
        "species_name": "test",
        "uploader_name": "test",
    }

    assert response.status_code == 200
    assert response.json() == [expected]
