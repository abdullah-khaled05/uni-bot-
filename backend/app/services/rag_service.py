from app.services.llm_service import query_llm

# TEMP: static context (replace later with DB/vector search)
DOCUMENTS = [
    "The university offers BSCS, BBA, and AI programs.",
    "Admissions open in Fall and Spring semesters.",
]

def retrieve_context(query: str):
    # simple keyword match (replace with embeddings later)
    return " ".join(DOCUMENTS)

def generate_response(query: str):
    context = retrieve_context(query)

    prompt = f"""
    Answer the question using the context below:
    Context: {context}

    Question: {query}
    """

    return query_llm(prompt)