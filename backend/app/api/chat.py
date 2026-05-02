from fastapi import APIRouter
from app.schemas.chat_schema import ChatRequest
from app.services.rag_service import generate_response

router = APIRouter()

@router.post("/")
async def chat(req: ChatRequest):
    response = generate_response(req.message)
    return {"response": response}