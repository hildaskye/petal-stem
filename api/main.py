from fastapi import FastAPI
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
from routers import (
    add_plant,
    garden,
    plant_detail,
    community_page,
    plant_edit,
    search,
    edit_pest,
    add_species,
    edit_species,
    delete_species,
    plant_delete,
    accounts,
    pest_list,
    pest_add,
    pest_detail,
    species_list,
    species_detail,
)
import os

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(add_plant.router)
app.include_router(garden.router)
app.include_router(search.router)
app.include_router(plant_detail.router)
app.include_router(community_page.router)
app.include_router(plant_edit.router)
app.include_router(plant_delete.router)

app.include_router(edit_pest.router)
app.include_router(add_species.router)
app.include_router(edit_species.router)
app.include_router(delete_species.router)
app.include_router(species_list.router)
app.include_router(species_detail.router)
app.include_router(pest_list.router)
app.include_router(pest_add.router)
app.include_router(pest_detail.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }


@app.get("/")
def root():
    return {"message": "You hit the root path!"}
