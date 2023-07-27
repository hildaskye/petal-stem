from fastapi import FastAPI
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
from routers import (
    accounts,
    search,
    ## PLANTS
    garden,
    add_plant,
    plant_edit,
    plant_delete,
    plant_detail,
    community_page,
    ## SPECIES
    add_species,
    edit_species,
    delete_species,
    species_detail,
    species_list,
    ## PESTS
    pest_add,
    edit_pest,
    pest_delete,
    pest_detail,
    pest_list,
)
import os

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(search.router)
## PLANTS
app.include_router(garden.router)
app.include_router(add_plant.router)
app.include_router(plant_edit.router)
app.include_router(plant_delete.router)
app.include_router(plant_detail.router)
app.include_router(community_page.router)
## SPECIES
app.include_router(add_species.router)
app.include_router(edit_species.router)
app.include_router(delete_species.router)
app.include_router(species_detail.router)
app.include_router(species_list.router)
## PESTS
app.include_router(pest_add.router)
app.include_router(edit_pest.router)
app.include_router(pest_delete.router)
app.include_router(pest_detail.router)
app.include_router(pest_list.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "You hit the root path!"}
