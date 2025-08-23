import random

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

from prompt_data import PROMPT_TEMPLATES, TEMPLATE_FILLERS

app = FastAPI(
    title="Promptly API",
    description="API for generating AI prompts.",
    version="0.1.0"
)

origins = [
    "http://localhost",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class PromptRequest(BaseModel):
    category: str
    style: str

class PromptResponse(BaseModel):
    prompt: str
    recommended_model: Optional[str] = None

@app.get("/")
def read_root():
    return {"message": "Welcome to the Promptly API"}

@app.post("/api/v1/generate-prompt")
async def generate_prompt(request: PromptRequest):
    """ Generate prompt based on given category and style. """
    category = request.category.lower()
    style = request.style.lower().replace(" ", "_")

    if category not in PROMPT_TEMPLATES or style not in PROMPT_TEMPLATES[category]:
        raise HTTPException(status_code=404, detail="Category or style not found")
    
    recommended_model = None
    if category == "image":
        Model = "FLUX"
    elif category == "video":
        Model = "WAN"
    elif category == "text":
        Model = "GPT"

    template = random.choice(PROMPT_TEMPLATES[category][style])
    prompt = template.format(
        subject=random.choice(TEMPLATE_FILLERS["subject"]),
        details=random.choice(TEMPLATE_FILLERS["details"]),
        tone=random.choice(TEMPLATE_FILLERS["tone"])
    )

    return PromptResponse(prompt=prompt, recommended_model=Model)
