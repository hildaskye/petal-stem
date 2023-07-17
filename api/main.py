from fastapi import FastAPI
from routers import plant_detail, community_page, plant_edit
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()
app.include_router(plant_detail.router)
app.include_router(community_page.router)
app.include_router(plant_edit.router)


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
