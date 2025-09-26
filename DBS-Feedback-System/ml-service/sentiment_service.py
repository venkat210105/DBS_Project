from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI(title="Sentiment Analysis Service")

# Load sentiment-analysis pipeline
sentiment_analyzer = pipeline("sentiment-analysis")

# Request model
class SentimentRequest(BaseModel):
    text: str

# Response model
class SentimentResponse(BaseModel):
    label: str
    score: float

@app.post("/analyze", response_model=SentimentResponse)
def analyze_sentiment(request: SentimentRequest):
    result = sentiment_analyzer(request.text)[0]
    return SentimentResponse(label=result["label"], score=result["score"])
