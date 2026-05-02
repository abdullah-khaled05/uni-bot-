from fastapi import FastAPI
from pydantic import BaseModel
from app.api.chat import router as chat_router
from fastapi.middleware.cors import CORSMiddleware  # Add this import
from pydantic import BaseModel
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    return {"response": f"You said: {req.message}"}