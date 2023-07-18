from fastapi import FastAPI
from routers import (
    garden,
    plant_detail,
    community_page,
    plant_edit,
    search,
    edit_pest,
    add_species,
    edit_species,
    delete_species,
)
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()
app.include_router(garden.router)
app.include_router(search.router)
app.include_router(plant_detail.router)
app.include_router(community_page.router)
app.include_router(plant_edit.router)
app.include_router(edit_pest.router)
app.include_router(add_species.router)
app.include_router(edit_species.router)
app.include_router(delete_species.router)

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
