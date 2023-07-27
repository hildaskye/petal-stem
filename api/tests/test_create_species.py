from main import app
from fastapi.testclient import TestClient
from queries.add_species import SpeciesRepository
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


class CreateSpecies:
    def create(self, species):
        result = {
            "id": 1,
        }

        result.update(species)
        return result


def test_create_species():
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = fake_get_current_species_data
    app.dependency_overrides[SpeciesRepository] = CreateSpecies

    json = {
        "name": "test",
        "picture": "test",
        "location_type": "test",
        "cycle_type": "test",
        "user_id": 1,
    }

    expected = {
        "id": 1,
        "name": "test",
        "picture": "test",
        "location_type": "test",
        "cycle_type": "test",
        "user_id": 1,
    }

    response = client.post("/api/species", json=json)

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected
