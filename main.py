from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import json
import numpy as np
import tensorflow as tf
from PIL import Image
from io import BytesIO
from fastapi import UploadFile, File
from nutrition_ai import calculate_health_index, generate_personalized_menu

app = FastAPI(title="NutriCare AI Backend")

MODEL_PATH = "model/food101_model.keras"
CLASS_PATH = "model/food101_class_names.json"

FOOD_NAME_VI = {
    "pho": "Phở bò",
    "fried_rice": "Cơm chiên",
    "pizza": "Pizza",
    "sushi": "Sushi",
    "hamburger": "Hamburger",
    "chicken_wings": "Gà rán",
    "greek_salad": "Salad",
    "ice_cream": "Kem",
    "donuts": "Bánh donut",
    "spring_rolls": "Gỏi cuốn",
    "dumplings": "Há cảo",
    "french_fries": "Khoai tây chiên",
    "hot_dog": "Bánh mì thịt",
    "steak": "Bít tết",
    "omelette": "Trứng ốp la",
    "tacos": "Tacos",
    "pork_chop": "Sườn heo",
    "pancakes": "Bánh pancake",
    "hot_and_sour_soup": "Súp chua cay",
    "chocolate_cake": "Bánh chocolate",
    "cheesecake": "Bánh cheesecake",
    "club_sandwich": "Sandwich",
    "pad_thai": "Pad Thai",
    "spaghetti_bolognese": "Mì Ý sốt bò bằm",
    "mussels": "Vẹm",
    "nachos": "Nachos",
}

FOOD_NUTRITION = {
    "Phở bò": {"calories": 430, "protein": 25, "carb": 55, "fat": 12},
    "Phở": {"calories": 430, "protein": 25, "carb": 55, "fat": 12},
    "Cơm chiên": {"calories": 520, "protein": 14, "carb": 70, "fat": 18},
    "Pizza": {"calories": 285, "protein": 12, "carb": 36, "fat": 10},
    "Sushi": {"calories": 300, "protein": 14, "carb": 45, "fat": 6},
    "Hamburger": {"calories": 550, "protein": 25, "carb": 45, "fat": 30},
    "Gà rán": {"calories": 600, "protein": 28, "carb": 35, "fat": 38},
    "Salad": {"calories": 280, "protein": 20, "carb": 15, "fat": 8},
    "Kem": {"calories": 210, "protein": 3.5, "carb": 24, "fat": 11},
    "Bánh donut": {"calories": 350, "protein": 4, "carb": 45, "fat": 18},
    "Gỏi cuốn": {"calories": 120, "protein": 7, "carb": 18, "fat": 2},
    "Há cảo": {"calories": 240, "protein": 10, "carb": 32, "fat": 8},
    "Khoai tây chiên": {"calories": 365, "protein": 4, "carb": 48, "fat": 17},
    "Bánh mì thịt": {"calories": 450, "protein": 18, "carb": 55, "fat": 18},
    "Hot dog": {"calories": 290, "protein": 10, "carb": 31, "fat": 14},
    "Bít tết": {"calories": 450, "protein": 42, "carb": 0, "fat": 30},
    "Trứng ốp la": {"calories": 180, "protein": 12, "carb": 1, "fat": 14},
    "Tacos": {"calories": 300, "protein": 14, "carb": 34, "fat": 13},
    "Sườn heo": {"calories": 420, "protein": 32, "carb": 0, "fat": 32},
    "Bánh pancake": {"calories": 350, "protein": 8, "carb": 58, "fat": 10},
    "Súp chua cay": {"calories": 160, "protein": 8, "carb": 12, "fat": 8},
    "Bánh chocolate": {"calories": 370, "protein": 5, "carb": 52, "fat": 16},
    "Bánh cheesecake": {"calories": 410, "protein": 7, "carb": 35, "fat": 28},
    "Sandwich": {"calories": 430, "protein": 22, "carb": 42, "fat": 19},
    "Pad Thai": {"calories": 570, "protein": 24, "carb": 76, "fat": 20},
    "Mì Ý sốt bò bằm": {"calories": 560, "protein": 25, "carb": 75, "fat": 18},
    "Vẹm": {"calories": 170, "protein": 24, "carb": 7, "fat": 5},
    "Nachos": {"calories": 420, "protein": 12, "carb": 45, "fat": 22},
}

food_model = None
food_class_names = None


def load_food_model():
    global food_model, food_class_names

    if food_model is None:
        food_model = tf.keras.models.load_model(MODEL_PATH)

    if food_class_names is None:
        with open(CLASS_PATH, "r", encoding="utf-8") as f:
            food_class_names = json.load(f)

    return food_model, food_class_names


@app.post("/api/predict-food")
async def predict_food(file: UploadFile = File(...)):
    model, class_names = load_food_model()

    image_bytes = await file.read()
    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    image = image.resize((224, 224))

    arr = np.array(image).astype("float32")
    arr = np.expand_dims(arr, axis=0)

    predictions = model.predict(arr, verbose=0)[0]

    predicted_index = int(np.argmax(predictions))
    confidence = float(predictions[predicted_index]) * 100

    class_name = class_names[predicted_index]
    food_name = FOOD_NAME_VI.get(class_name, class_name)

    nutrition = FOOD_NUTRITION.get(food_name, {
        "calories": 0,
        "protein": 0,
        "carb": 0,
        "fat": 0
    })

    top_indices = predictions.argsort()[-5:][::-1]

    top_results = []
    for index in top_indices:
        label = class_names[int(index)]
        top_results.append({
            "class_name": label,
            "food_name": FOOD_NAME_VI.get(label, label),
            "confidence": round(float(predictions[index]) * 100, 2)
        })

    return {
        "food_name": food_name,
        "class_name": class_name,
        "confidence": round(confidence, 2),
        "nutrition": nutrition,
        "top_results": top_results
    }
class HealthRequest(BaseModel):
    age: int
    gender: str
    height_cm: float
    weight_kg: float
    activity: str
    goal: str


@app.post("/api/health")
def health_api(data: HealthRequest):
    result = calculate_health_index(
        age=data.age,
        gender=data.gender,
        height_cm=data.height_cm,
        weight_kg=data.weight_kg,
        activity=data.activity,
        goal=data.goal
    )

    return result


@app.post("/api/menu")
def menu_api(data: HealthRequest):
    result = generate_personalized_menu(
        age=data.age,
        gender=data.gender,
        height_cm=data.height_cm,
        weight_kg=data.weight_kg,
        activity=data.activity,
        goal=data.goal
    )

    return result


@app.get("/api/status")
def status():
    return {
        "message": "NutriCare AI backend is running",
        "status": "ok"
    }


app.mount("/", StaticFiles(directory="web-ui", html=True), name="web-ui")
