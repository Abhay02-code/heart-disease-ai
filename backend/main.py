from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
from pathlib import Path

app = FastAPI(
    title="Heart Disease Prediction API",
    description="AI-based heart disease prediction API",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent.parent

model = joblib.load(
    BASE_DIR / "ml" / "models" / "heart_disease_model.pkl"
)

scaler = joblib.load(
    BASE_DIR / "ml" / "models" / "scaler.pkl"
)


class PatientData(BaseModel):
    age: float
    sex: float
    cp: float
    trestbps: float
    chol: float
    fbs: float
    restecg: float
    thalach: float
    exang: float
    oldpeak: float
    slope: float
    ca: float
    thal: float


@app.get("/")
def home():
    return {
        "message": "Heart Disease AI API is running"
    }


@app.post("/predict")
def predict(data: PatientData):

    input_data = np.array([[
        data.age,
        data.sex,
        data.cp,
        data.trestbps,
        data.chol,
        data.fbs,
        data.restecg,
        data.thalach,
        data.exang,
        data.oldpeak,
        data.slope,
        data.ca,
        data.thal
    ]])

    input_scaled = scaler.transform(input_data)

    prediction = model.predict(input_scaled)[0]

    probability = model.predict_proba(input_scaled)[0][1]

    if prediction == 1:
        result = "Heart Disease Detected"
    else:
        result = "No Heart Disease Detected"

    return {
        "prediction": int(prediction),
        "result": result,
        "probability": round(float(probability), 4)
    }