from fastapi.testclient import TestClient
from main import app
from queries.species_list import SpeciesList
from authenticator import authenticator
from pydantic import BaseModel


client = TestClient(app)


class SpeciesOut(BaseModel):
    id: int
    name: str
    picture: str
    location_type: str
    cycle_type: str
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


def fake_get_current_species_data():
    return SpeciesOut(
        id=1,
        name="test",
        picture="test.jpeg",
        location_type="test",
        cycle_type="test",
        user_id=1,
    )


class EmptySpeciesRepository:
    def get_all(self):
        return [
            {
                "id": 1,
                "name": "test",
                "picture": "test",
                "location_type": "test",
                "cycle_type": "test",
                "user_id": 1,
            }
        ]


def test_get_all_species():
    app.dependency_overrides[SpeciesList] = EmptySpeciesRepository
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = fake_get_current_account_data
    response = client.get("/api/species")
    app.dependency_overrides = {}

    expected = {
        "id": 1,
        "name": "test",
        "picture": "test",
        "location_type": "test",
        "cycle_type": "test",
        "user_id": 1,
    }

    assert response.status_code == 200
    assert response.json() == [expected]
