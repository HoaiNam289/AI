import streamlit as st
import streamlit.components.v1 as components
import os


# =========================
# CẤU HÌNH TRANG
# =========================
st.set_page_config(
    page_title="NutriCare AI",
    page_icon="🥗",
    layout="wide"
)


def render_web_ui():
    web_ui_dir = os.path.join(os.path.dirname(__file__), "web-ui")
    index_path = os.path.join(web_ui_dir, "index.html")
    css_path = os.path.join(web_ui_dir, "styles.css")
    js_path = os.path.join(web_ui_dir, "script.js")

    if not all(os.path.exists(path) for path in [index_path, css_path, js_path]):
        return False

    with open(index_path, "r", encoding="utf-8") as file:
        html = file.read()
    with open(css_path, "r", encoding="utf-8") as file:
        css = file.read()
    with open(js_path, "r", encoding="utf-8") as file:
        js = file.read()

    html = html.replace('<link rel="stylesheet" href="styles.css">', f"<style>{css}</style>")
    html = html.replace('<script src="script.js"></script>', f"<script>{js}</script>")
    st.markdown(
        """
        <style>
        .stApp { background: #f5f7f5; }
        .block-container { padding: 0; max-width: 100%; }
        header[data-testid="stHeader"],
        div[data-testid="stToolbar"],
        div[data-testid="stDecoration"],
        #MainMenu,
        footer { display: none; }
        iframe { display: block; }
        </style>
        """,
        unsafe_allow_html=True,
    )
    components.html(html, height=900, scrolling=True)
    return True


if render_web_ui():
    st.stop()


import pandas as pd
import plotly.express as px
import json
import numpy as np
from PIL import Image
import tensorflow as tf
from transformers import pipeline
from datetime import datetime


foods_data = [
    {"Tên món": "Cơm trắng", "Calo": 130, "Protein": 2.7, "Carb": 28, "Fat": 0.3, "Nhóm": "Tinh bột", "Phù hợp": "Giữ cân"},
    {"Tên món": "Ức gà luộc", "Calo": 165, "Protein": 31, "Carb": 0, "Fat": 3.6, "Nhóm": "Đạm", "Phù hợp": "Giảm cân"},
    {"Tên món": "Trứng gà", "Calo": 155, "Protein": 13, "Carb": 1.1, "Fat": 11, "Nhóm": "Đạm", "Phù hợp": "Tăng cơ"},
    {"Tên món": "Rau luộc", "Calo": 50, "Protein": 2, "Carb": 8, "Fat": 0.5, "Nhóm": "Rau", "Phù hợp": "Giảm cân"},
    {"Tên món": "Salad ức gà", "Calo": 280, "Protein": 28, "Carb": 15, "Fat": 8, "Nhóm": "Healthy", "Phù hợp": "Giảm cân"},
    {"Tên món": "Khoai lang", "Calo": 120, "Protein": 1.6, "Carb": 27, "Fat": 0.1, "Nhóm": "Tinh bột", "Phù hợp": "Giảm cân"},
    {"Tên món": "Yến mạch", "Calo": 389, "Protein": 16.9, "Carb": 66, "Fat": 6.9, "Nhóm": "Tinh bột", "Phù hợp": "Giảm cân"},
    {"Tên món": "Chuối", "Calo": 89, "Protein": 1.1, "Carb": 23, "Fat": 0.3, "Nhóm": "Trái cây", "Phù hợp": "Giữ cân"},
    {"Tên món": "Táo", "Calo": 52, "Protein": 0.3, "Carb": 14, "Fat": 0.2, "Nhóm": "Trái cây", "Phù hợp": "Giảm cân"},
    {"Tên món": "Sữa chua không đường", "Calo": 60, "Protein": 4, "Carb": 5, "Fat": 3, "Nhóm": "Sữa", "Phù hợp": "Giảm cân"},
    {"Tên món": "Cá hồi áp chảo", "Calo": 208, "Protein": 20, "Carb": 0, "Fat": 13, "Nhóm": "Đạm", "Phù hợp": "Tăng cơ"},
    {"Tên món": "Thịt bò áp chảo", "Calo": 250, "Protein": 26, "Carb": 0, "Fat": 15, "Nhóm": "Đạm", "Phù hợp": "Tăng cơ"},
    {"Tên món": "Cơm gạo lứt", "Calo": 111, "Protein": 2.6, "Carb": 23, "Fat": 0.9, "Nhóm": "Tinh bột", "Phù hợp": "Giảm cân"},
    {"Tên món": "Bánh mì trứng", "Calo": 450, "Protein": 16, "Carb": 55, "Fat": 18, "Nhóm": "Đồ ăn nhanh", "Phù hợp": "Giữ cân"},
    {"Tên món": "Phở", "Calo": 430, "Protein": 25, "Carb": 55, "Fat": 12, "Nhóm": "Món Việt", "Phù hợp": "Giữ cân"},
    {"Tên món": "Bún bò Huế", "Calo": 550, "Protein": 28, "Carb": 65, "Fat": 18, "Nhóm": "Món Việt", "Phù hợp": "Giữ cân"},
    {"Tên món": "Cơm tấm sườn", "Calo": 700, "Protein": 30, "Carb": 85, "Fat": 25, "Nhóm": "Món Việt", "Phù hợp": "Tăng cân"},
    {"Tên món": "Gà rán", "Calo": 600, "Protein": 28, "Carb": 35, "Fat": 38, "Nhóm": "Đồ ăn nhanh", "Phù hợp": "Hạn chế"},
    {"Tên món": "Mì tôm", "Calo": 380, "Protein": 8, "Carb": 55, "Fat": 14, "Nhóm": "Đồ ăn nhanh", "Phù hợp": "Hạn chế"},
    {"Tên món": "Trà sữa", "Calo": 450, "Protein": 4, "Carb": 60, "Fat": 15, "Nhóm": "Đồ ngọt", "Phù hợp": "Hạn chế"},
    {"Tên món": "Nước ngọt có gas", "Calo": 140, "Protein": 0, "Carb": 35, "Fat": 0, "Nhóm": "Đồ ngọt", "Phù hợp": "Hạn chế"},
    {"Tên món": "Bánh ngọt", "Calo": 350, "Protein": 5, "Carb": 50, "Fat": 15, "Nhóm": "Đồ ngọt", "Phù hợp": "Hạn chế"},
    {"Tên món": "Cá hấp", "Calo": 160, "Protein": 25, "Carb": 0, "Fat": 5, "Nhóm": "Đạm", "Phù hợp": "Giảm cân"},
    {"Tên món": "Đậu hũ", "Calo": 76, "Protein": 8, "Carb": 2, "Fat": 4.8, "Nhóm": "Đạm", "Phù hợp": "Giảm cân"},
    {"Tên món": "Sữa tươi không đường", "Calo": 62, "Protein": 3.4, "Carb": 5, "Fat": 3.3, "Nhóm": "Sữa", "Phù hợp": "Tăng cơ"},
    {"Tên món": "Cơm chiên", "Calo": 520, "Protein": 14, "Carb": 70, "Fat": 18, "Nhóm": "Món chính", "Phù hợp": "Giữ cân"},
    {"Tên món": "Mì ramen", "Calo": 480, "Protein": 18, "Carb": 62, "Fat": 16, "Nhóm": "Món nước", "Phù hợp": "Giữ cân"},
    {"Tên món": "Pizza", "Calo": 285, "Protein": 12, "Carb": 36, "Fat": 10, "Nhóm": "Đồ ăn nhanh", "Phù hợp": "Hạn chế"},
    {"Tên món": "Sushi", "Calo": 300, "Protein": 14, "Carb": 45, "Fat": 6, "Nhóm": "Món Nhật", "Phù hợp": "Giữ cân"},
    {"Tên món": "Hamburger", "Calo": 550, "Protein": 25, "Carb": 45, "Fat": 30, "Nhóm": "Đồ ăn nhanh", "Phù hợp": "Hạn chế"},
    {"Tên món": "Kem", "Calo": 210, "Protein": 3.5, "Carb": 24, "Fat": 11, "Nhóm": "Đồ ngọt", "Phù hợp": "Hạn chế"},
    {"Tên món": "Bánh donut", "Calo": 350, "Protein": 4, "Carb": 45, "Fat": 18, "Nhóm": "Đồ ngọt", "Phù hợp": "Hạn chế"},
    {"Tên món": "Salad rau củ", "Calo": 100, "Protein": 2.0, "Carb": 10.0, "Fat": 5.0, "Nhóm": "Rau", "Phù hợp": "Giảm cân"},
    {"Tên món": "Xúc xích / gỏi cuốn", "Calo": 150, "Protein": 6.0, "Carb": 15.0, "Fat": 7.0, "Nhóm": "Món chính", "Phù hợp": "Giữ cân"},
    {"Tên món": "Há cảo / Bánh bao", "Calo": 250, "Protein": 8.0, "Carb": 35.0, "Fat": 8.0, "Nhóm": "Điểm tâm", "Phù hợp": "Giữ cân"},
    {"Tên món": "Khoai tây chiên", "Calo": 312, "Protein": 3.0, "Carb": 41.0, "Fat": 15.0, "Nhóm": "Ăn vặt", "Phù hợp": "Hạn chế"},
    {"Tên món": "Hot dog", "Calo": 290, "Protein": 10.0, "Carb": 24.0, "Fat": 17.0, "Nhóm": "Đồ ăn nhanh", "Phù hợp": "Hạn chế"},
    {"Tên món": "Bít tết", "Calo": 400, "Protein": 45.0, "Carb": 0.0, "Fat": 22.0, "Nhóm": "Đạm", "Phù hợp": "Tăng cơ"},
    {"Tên món": "Trứng ốp lết / Trứng chiên", "Calo": 150, "Protein": 12.0, "Carb": 1.0, "Fat": 11.0, "Nhóm": "Đạm", "Phù hợp": "Giảm cân"},
    {"Tên món": "Bánh Taco", "Calo": 210, "Protein": 9.0, "Carb": 20.0, "Fat": 10.0, "Nhóm": "Món chính", "Phù hợp": "Giữ cân"},
    {"Tên món": "Sườn heo", "Calo": 350, "Protein": 25.0, "Carb": 0.0, "Fat": 26.0, "Nhóm": "Món chính", "Phù hợp": "Giữ cân"},
    {"Tên món": "Bánh Pancake", "Calo": 220, "Protein": 6.0, "Carb": 28.0, "Fat": 9.0, "Nhóm": "Đồ ngọt", "Phù hợp": "Hạn chế"},
    {"Tên món": "Súp", "Calo": 120, "Protein": 6.0, "Carb": 15.0, "Fat": 4.0, "Nhóm": "Khai vị", "Phù hợp": "Giảm cân"},
    {"Tên món": "Bánh Socola", "Calo": 350, "Protein": 4.0, "Carb": 45.0, "Fat": 16.0, "Nhóm": "Đồ ngọt", "Phù hợp": "Hạn chế"},
    {"Tên món": "Bánh Phô mai", "Calo": 400, "Protein": 7.0, "Carb": 32.0, "Fat": 28.0, "Nhóm": "Đồ ngọt", "Phù hợp": "Hạn chế"},
    {"Tên món": "Bánh mì kẹp", "Calo": 300, "Protein": 12.0, "Carb": 35.0, "Fat": 12.0, "Nhóm": "Món chính", "Phù hợp": "Giữ cân"},
    {"Tên món": "Phở xào / Pad thái", "Calo": 400, "Protein": 15.0, "Carb": 50.0, "Fat": 15.0, "Nhóm": "Món chính", "Phù hợp": "Giữ cân"},
    {"Tên món": "Mì Ý", "Calo": 350, "Protein": 12.0, "Carb": 45.0, "Fat": 12.0, "Nhóm": "Món chính", "Phù hợp": "Giữ cân"},
    {"Tên món": "Nghêu hấp", "Calo": 100, "Protein": 15.0, "Carb": 3.0, "Fat": 2.0, "Nhóm": "Đạm", "Phù hợp": "Giảm cân"},
    {"Tên món": "Bánh Nachos", "Calo": 350, "Protein": 8.0, "Carb": 40.0, "Fat": 18.0, "Nhóm": "Ăn vặt", "Phù hợp": "Hạn chế"}
]

foods_df = pd.DataFrame(foods_data)

FOOD101_MODEL_PATH = "model/food101_model.keras"
FOOD101_CLASS_PATH = "model/food101_class_names.json"   

FOOD101_TO_VIETNAMESE = {
    "pho": "Phở",
    "fried_rice": "Cơm chiên",
    "pizza": "Pizza",
    "sushi": "Sushi",
    "hamburger": "Hamburger",
    "chicken_wings": "Gà rán",
    "greek_salad": "Salad rau củ",
    "ice_cream": "Kem",
    "donuts": "Bánh donut",
    "spring_rolls": "Xúc xích / gỏi cuốn",
    "dumplings": "Há cảo / Bánh bao",
    "french_fries": "Khoai tây chiên",
    "hot_dog": "Hot dog",
    "steak": "Bít tết",
    "omelette": "Trứng ốp lết / Trứng chiên",
    "tacos": "Bánh Taco",
    "pork_chop": "Sườn heo",
    "pancakes": "Bánh Pancake",
    "hot_and_sour_soup": "Súp",
    "chocolate_cake": "Bánh Socola",
    "cheesecake": "Bánh Phô mai",
    "club_sandwich": "Bánh mì kẹp",
    "pad_thai": "Phở xào / Pad thái",
    "spaghetti_bolognese": "Mì Ý",
    "mussels": "Nghêu hấp",
    "nachos": "Bánh Nachos",
}


@st.cache_resource
def load_food101_model():
    if not os.path.exists(FOOD101_MODEL_PATH) or not os.path.exists(FOOD101_CLASS_PATH):
        return None, []

    model = tf.keras.models.load_model(FOOD101_MODEL_PATH)

    with open(FOOD101_CLASS_PATH, "r", encoding="utf-8") as f:
        class_names = json.load(f)

    return model, class_names


def predict_food101(uploaded_file, model, class_names):
    image = Image.open(uploaded_file).convert("RGB")
    image_resized = image.resize((224, 224))

    img_array = np.array(image_resized).astype("float32")
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array, verbose=0)[0]

    predicted_index = int(np.argmax(predictions))
    confidence = float(np.max(predictions)) * 100

    class_name = class_names[predicted_index]
    food_name = FOOD101_TO_VIETNAMESE.get(class_name, class_name)

    top_indices = predictions.argsort()[-5:][::-1]

    top_results = []
    for index in top_indices:
        label = class_names[int(index)]
        top_results.append({
            "Tên món hiển thị": FOOD101_TO_VIETNAMESE.get(label, label),
            "Độ tin cậy (%)": round(float(predictions[index]) * 100, 2)
        })

    return image, food_name, confidence, top_results


@st.cache_resource
def load_zero_shot_model():
    return pipeline(
        task="zero-shot-image-classification",
        model="openai/clip-vit-base-patch32"
    )

def check_is_food_clip(uploaded_file):
    """
    Hàm này dùng CLIP để kiểm tra xem ảnh là đồ ăn hay là thứ khác (người, vật...)
    Trả về True nếu là đồ ăn, False nếu là thứ khác.
    """
    image = Image.open(uploaded_file).convert("RGB")
    classifier = load_zero_shot_model()
    
    gatekeeper_labels = [
        "a close up photo of delicious food, a dish, or a meal",
        "a photo of a person, face, animal, scenery, or random object"
    ]
    
    # Cho CLIP phân loại
    results = classifier(image, candidate_labels=gatekeeper_labels)
    
    # Lấy kết quả có độ tin cậy cao nhất (top 1)
    best_label = results[0]["label"]
    
    # Nếu kết quả nghiêng về đồ ăn thì cho qua
    if best_label == gatekeeper_labels[0]:
        return True
    else:
        return False

# =========================
# HÀM XỬ LÝ
# =========================
def calculate_bmi(weight, height_cm):
    height_m = height_cm / 100
    return weight / (height_m ** 2)


def bmi_status(bmi):
    if bmi < 18.5:
        return "Thiếu cân", "Bạn nên tăng lượng calo và bổ sung thực phẩm giàu dinh dưỡng."
    elif bmi < 25:
        return "Bình thường", "Chỉ số BMI của bạn đang ở mức tốt. Hãy duy trì chế độ ăn cân bằng."
    elif bmi < 30:
        return "Thừa cân", "Bạn nên kiểm soát calo, giảm đồ ngọt và tăng vận động."
    else:
        return "Béo phì", "Bạn nên xây dựng chế độ ăn nghiêm túc hơn và theo dõi sức khỏe thường xuyên."


def calculate_bmr(gender, weight, height_cm, age):
    if gender == "Nam":
        return 10 * weight + 6.25 * height_cm - 5 * age + 5
    else:
        return 10 * weight + 6.25 * height_cm - 5 * age - 161


def activity_factor(activity):
    factors = {
        "Ít vận động": 1.2,
        "Vận động nhẹ": 1.375,
        "Vận động vừa": 1.55,
        "Vận động nhiều": 1.725,
        "Vận động rất nhiều": 1.9
    }
    return factors[activity]


def target_calories(tdee, goal):
    if goal == "Giảm cân":
        return tdee - 500
    elif goal == "Tăng cân":
        return tdee + 400
    elif goal == "Tăng cơ":
        return tdee + 300
    else:
        return tdee


def get_warning(total_calories, target):
    diff = total_calories - target

    if total_calories == 0:
        return "Bạn chưa ghi nhận bữa ăn nào hôm nay."

    if diff > 300:
        return f"Bạn đã vượt khoảng {diff:.0f} kcal. Nên ăn nhẹ hơn ở bữa tiếp theo."
    elif diff > 0:
        return f"Bạn vượt nhẹ khoảng {diff:.0f} kcal. Hãy hạn chế đồ ngọt và dầu mỡ."
    elif abs(diff) <= 150:
        return "Lượng calo hôm nay khá phù hợp với mục tiêu."
    else:
        return f"Bạn còn khoảng {abs(diff):.0f} kcal. Có thể bổ sung bữa ăn nhẹ lành mạnh."


def recommend_foods(goal):
    if goal == "Giảm cân":
        rec = foods_df[
            (foods_df["Calo"] <= 300) &
            (foods_df["Phù hợp"].isin(["Giảm cân", "Giữ cân"]))
        ]
    elif goal == "Tăng cân":
        rec = foods_df[
            (foods_df["Calo"] >= 300) &
            (foods_df["Phù hợp"].isin(["Tăng cân", "Giữ cân", "Tăng cơ"]))
        ]
    elif goal == "Tăng cơ":
        rec = foods_df[
            (foods_df["Protein"] >= 15) &
            (foods_df["Phù hợp"].isin(["Tăng cơ", "Giảm cân", "Giữ cân"]))
        ]
    else:
        rec = foods_df[
            foods_df["Phù hợp"].isin(["Giữ cân", "Giảm cân", "Tăng cơ"])
        ]

    return rec.sort_values(by=["Protein", "Calo"], ascending=[False, True]).head(8)


def chatbot_response(question, profile, total_calories, target):
    question = question.lower()

    name = profile["name"]
    goal = profile["goal"]
    bmi = profile["bmi"]
    status = profile["status"]

    if "bmi" in question or "chỉ số" in question:
        return (
            f"{name}, chỉ số BMI hiện tại của bạn là {bmi:.2f}, thuộc nhóm {status}. "
            f"Với mục tiêu {goal.lower()}, bạn nên theo dõi lượng calo hằng ngày và duy trì chế độ ăn phù hợp."
        )

    elif "giảm cân" in question:
        return (
            f"Để giảm cân, bạn nên tạo mức thâm hụt khoảng 300–500 kcal mỗi ngày. "
            f"Hạn chế trà sữa, nước ngọt, đồ chiên rán và tăng rau xanh, đạm nạc như ức gà, cá, trứng, đậu hũ. "
            f"Mức calo mục tiêu hôm nay của bạn là khoảng {target:.0f} kcal."
        )

    elif "tăng cân" in question:
        return (
            f"Để tăng cân, bạn nên ăn cao hơn TDEE khoảng 300–500 kcal mỗi ngày. "
            f"Nên bổ sung cơm, khoai, yến mạch, thịt, cá, trứng, sữa và chia thành nhiều bữa nhỏ trong ngày."
        )

    elif "tăng cơ" in question or "protein" in question:
        return (
            f"Để tăng cơ, bạn cần ưu tiên protein. Các món phù hợp gồm ức gà, trứng, cá hồi, thịt bò, sữa, đậu hũ. "
            f"Nên kết hợp tập luyện và ngủ đủ giấc để cơ thể phục hồi tốt."
        )

    elif "tối" in question or "bữa tối" in question:
        remain = target - total_calories
        if remain <= 0:
            return (
                f"Hôm nay bạn đã gần đạt hoặc vượt calo mục tiêu. Bữa tối nên ăn nhẹ như rau luộc, salad, cá hấp "
                f"hoặc sữa chua không đường. Tránh cơm nhiều, đồ chiên và đồ ngọt."
            )
        else:
            return (
                f"Bạn còn khoảng {remain:.0f} kcal. Bữa tối có thể chọn cá hấp, salad ức gà, rau luộc, đậu hũ "
                f"hoặc một phần cơm gạo lứt vừa phải."
            )

    elif "trà sữa" in question or "nước ngọt" in question:
        return (
            "Trà sữa và nước ngọt thường chứa nhiều đường, dễ làm vượt calo nhưng ít giá trị dinh dưỡng. "
            "Nếu đang giảm cân, bạn nên hạn chế còn 1–2 lần/tuần hoặc chọn size nhỏ, ít đường."
        )

    elif "thực đơn" in question:
        return (
            f"Với mục tiêu {goal.lower()}, bạn có thể tham khảo thực đơn: "
            "sáng ăn yến mạch hoặc bánh mì trứng, trưa ăn cơm gạo lứt với ức gà và rau, "
            "tối ăn cá hấp hoặc salad. Bữa phụ có thể dùng chuối, táo hoặc sữa chua không đường."
        )

    else:
        return (
            "Mình có thể tư vấn về BMI, giảm cân, tăng cân, tăng cơ, protein, thực đơn hoặc bữa tối. "
            "Bạn hãy hỏi cụ thể hơn, ví dụ: 'Tối nay tôi nên ăn gì?' hoặc 'Tôi muốn giảm cân thì ăn thế nào?'."
        )


# =========================
# SESSION STATE
# =========================
if "meal_log" not in st.session_state:
    st.session_state.meal_log = []

if "profile_saved" not in st.session_state:
    st.session_state.profile_saved = False


# =========================
# GIAO DIỆN CHÍNH
# =========================
st.title("🥗 NutriCare AI")
st.subheader("Trợ lý AI tư vấn dinh dưỡng và theo dõi sức khỏe cá nhân")

st.markdown("---")


# =========================
# SIDEBAR - HỒ SƠ NGƯỜI DÙNG
# =========================
st.sidebar.header("👤 Hồ sơ sức khỏe")

name = st.sidebar.text_input("Tên người dùng", "Nguyễn Văn A")
age = st.sidebar.number_input("Tuổi", min_value=10, max_value=100, value=21)
gender = st.sidebar.selectbox("Giới tính", ["Nam", "Nữ"])
height = st.sidebar.number_input("Chiều cao (cm)", min_value=100, max_value=220, value=170)
weight = st.sidebar.number_input("Cân nặng (kg)", min_value=30.0, max_value=200.0, value=70.0)
activity = st.sidebar.selectbox(
    "Mức độ vận động",
    ["Ít vận động", "Vận động nhẹ", "Vận động vừa", "Vận động nhiều", "Vận động rất nhiều"]
)
goal = st.sidebar.selectbox("Mục tiêu", ["Giảm cân", "Giữ cân", "Tăng cân", "Tăng cơ"])

bmi = calculate_bmi(weight, height)
status, advice = bmi_status(bmi)
bmr = calculate_bmr(gender, weight, height, age)
tdee = bmr * activity_factor(activity)
target = target_calories(tdee, goal)

profile = {
    "name": name,
    "age": age,
    "gender": gender,
    "height": height,
    "weight": weight,
    "activity": activity,
    "goal": goal,
    "bmi": bmi,
    "status": status,
    "bmr": bmr,
    "tdee": tdee,
    "target": target
}

if st.sidebar.button("Lưu hồ sơ"):
    st.session_state.profile_saved = True
    st.sidebar.success("Đã lưu hồ sơ sức khỏe!")


# =========================
# TABS
# =========================
tab1, tab2, tab3, tab4, tab5, tab6 = st.tabs([
    "📊 Dashboard",
    "🍱 Nhật ký ăn uống",
    "🤖 Chatbot AI",
    "🥗 Gợi ý thực đơn",
    "📚 Dữ liệu món ăn",
    "📷 Nhận diện món ăn"
])

# =========================
# TAB 1 - DASHBOARD
# =========================
with tab1:
    st.header("📊 Tổng quan sức khỏe cá nhân")

    col1, col2, col3, col4 = st.columns(4)

    total_calories = sum(item["Calo"] for item in st.session_state.meal_log)
    total_protein = sum(item["Protein"] for item in st.session_state.meal_log)
    total_carb = sum(item["Carb"] for item in st.session_state.meal_log)
    total_fat = sum(item["Fat"] for item in st.session_state.meal_log)

    with col1:
        st.metric("BMI", f"{bmi:.2f}", status)

    with col2:
        st.metric("BMR", f"{bmr:.0f} kcal")

    with col3:
        st.metric("TDEE", f"{tdee:.0f} kcal")

    with col4:
        st.metric("Calo mục tiêu", f"{target:.0f} kcal")

    st.info(advice)

    st.markdown("### 🔥 Theo dõi calo hôm nay")

    col5, col6, col7 = st.columns(3)

    with col5:
        st.metric("Đã nạp", f"{total_calories:.0f} kcal")

    with col6:
        remain = target - total_calories
        st.metric("Còn lại", f"{remain:.0f} kcal")

    with col7:
        progress = min(total_calories / target, 1.0) if target > 0 else 0
        st.metric("Tiến độ", f"{progress * 100:.1f}%")

    st.progress(progress)

    warning = get_warning(total_calories, target)

    if total_calories > target:
        st.error(warning)
    elif total_calories > 0:
        st.success(warning)
    else:
        st.warning(warning)

    st.markdown("### 🧬 Tổng dinh dưỡng đã nạp")

    macro_df = pd.DataFrame({
        "Chất dinh dưỡng": ["Protein", "Carb", "Fat"],
        "Số lượng": [total_protein, total_carb, total_fat]
    })

    col_chart1, col_chart2 = st.columns(2)

    with col_chart1:
        fig_macro = px.pie(
            macro_df,
            names="Chất dinh dưỡng",
            values="Số lượng",
            title="Tỷ lệ Protein - Carb - Fat"
        )
        st.plotly_chart(fig_macro, use_container_width=True)

    with col_chart2:
        if st.session_state.meal_log:
            meal_df = pd.DataFrame(st.session_state.meal_log)
            fig_meal = px.bar(
                meal_df,
                x="Tên món",
                y="Calo",
                title="Calo theo từng món đã ăn",
                text="Calo"
            )
            st.plotly_chart(fig_meal, use_container_width=True)
        else:
            st.info("Chưa có dữ liệu bữa ăn để hiển thị biểu đồ.")


# =========================
# TAB 2 - NHẬT KÝ ĂN UỐNG
# =========================
with tab2:
    st.header("🍱 Nhật ký ăn uống")

    col_add1, col_add2 = st.columns([2, 1])

    with col_add1:
        selected_food = st.selectbox("Chọn món ăn", foods_df["Tên món"].tolist())

    with col_add2:
        quantity = st.number_input("Số phần", min_value=0.5, max_value=10.0, value=1.0, step=0.5)

    selected_row = foods_df[foods_df["Tên món"] == selected_food].iloc[0]

    st.write("Thông tin món đã chọn:")
    st.dataframe(pd.DataFrame([selected_row]), use_container_width=True)

    if st.button("Thêm vào nhật ký"):
        new_item = {
            "Thời gian": datetime.now().strftime("%H:%M:%S"),
            "Tên món": selected_row["Tên món"],
            "Số phần": quantity,
            "Calo": selected_row["Calo"] * quantity,
            "Protein": selected_row["Protein"] * quantity,
            "Carb": selected_row["Carb"] * quantity,
            "Fat": selected_row["Fat"] * quantity,
            "Nhóm": selected_row["Nhóm"]
        }

        st.session_state.meal_log.append(new_item)
        st.success(f"Đã thêm {selected_food} vào nhật ký!")

    st.markdown("### 📋 Danh sách món đã ăn hôm nay")

    if st.session_state.meal_log:
        meal_log_df = pd.DataFrame(st.session_state.meal_log)
        st.dataframe(meal_log_df, use_container_width=True)

        if st.button("Xóa nhật ký hôm nay"):
            st.session_state.meal_log = []
            st.success("Đã xóa nhật ký ăn uống.")
            st.rerun()
    else:
        st.info("Chưa có món ăn nào trong nhật ký.")


# =========================
# TAB 3 - CHATBOT AI
# =========================
with tab3:
    st.header("🤖 Chatbot AI tư vấn dinh dưỡng")

    st.write(
        "Bạn có thể hỏi trợ lý AI về giảm cân, tăng cân, tăng cơ, BMI, protein, thực đơn hoặc bữa tối."
    )

    example_questions = [
        "Tôi muốn giảm cân thì nên ăn thế nào?",
        "Chỉ số BMI của tôi có ổn không?",
        "Tối nay tôi nên ăn gì để không vượt calo?",
        "Tôi muốn tăng cơ thì nên ăn món gì?",
        "Uống trà sữa có ảnh hưởng giảm cân không?",
        "Gợi ý thực đơn cho tôi"
    ]

    selected_question = st.selectbox("Chọn câu hỏi mẫu", [""] + example_questions)
    user_question = st.text_input("Hoặc nhập câu hỏi của bạn", value=selected_question)

    if st.button("Gửi câu hỏi"):
        if user_question.strip() == "":
            st.warning("Vui lòng nhập câu hỏi.")
        else:
            total_calories = sum(item["Calo"] for item in st.session_state.meal_log)
            answer = chatbot_response(user_question, profile, total_calories, target)

            st.markdown("### Câu trả lời của NutriCare AI")
            st.success(answer)


# =========================
# TAB 4 - GỢI Ý THỰC ĐƠN
# =========================
with tab4:
    st.header("🥗 Gợi ý thực đơn cá nhân hóa")

    st.write(f"Mục tiêu hiện tại của bạn: **{goal}**")
    st.write(f"Calo mục tiêu mỗi ngày: **{target:.0f} kcal**")

    recommended = recommend_foods(goal)

    st.markdown("### Món ăn phù hợp với mục tiêu")
    st.dataframe(recommended, use_container_width=True)

    st.markdown("### Thực đơn gợi ý trong ngày")

    if goal == "Giảm cân":
        breakfast = "Yến mạch + chuối + sữa chua không đường"
        lunch = "Cơm gạo lứt + ức gà luộc + rau luộc"
        dinner = "Cá hấp + salad rau xanh + đậu hũ"
        note = "Ưu tiên thực phẩm ít calo, giàu protein, nhiều rau xanh."
    elif goal == "Tăng cân":
        breakfast = "Bánh mì trứng + sữa tươi"
        lunch = "Cơm tấm sườn + rau + trái cây"
        dinner = "Cơm trắng + thịt bò + trứng + sữa"
        note = "Tăng khẩu phần ăn, chia nhiều bữa nhỏ trong ngày."
    elif goal == "Tăng cơ":
        breakfast = "Yến mạch + trứng gà + sữa tươi"
        lunch = "Cơm gạo lứt + ức gà + rau"
        dinner = "Cá hồi áp chảo + khoai lang + salad"
        note = "Ưu tiên protein, ăn đủ calo và kết hợp tập luyện."
    else:
        breakfast = "Bánh mì trứng hoặc yến mạch + trái cây"
        lunch = "Cơm trắng + cá/thịt + rau"
        dinner = "Cơm gạo lứt + đậu hũ + rau xanh"
        note = "Duy trì chế độ ăn cân bằng, hạn chế đồ ngọt và đồ chiên."

    menu_df = pd.DataFrame({
        "Bữa ăn": ["Sáng", "Trưa", "Tối"],
        "Món gợi ý": [breakfast, lunch, dinner]
    })

    st.table(menu_df)
    st.info(note)


# =========================
# TAB 5 - DỮ LIỆU MÓN ĂN
# =========================
with tab5:
    st.header("📚 Dữ liệu món ăn")

    st.write("Bảng dữ liệu món ăn được dùng để tính calo, phân tích dinh dưỡng và gợi ý thực đơn.")

    search = st.text_input("Tìm kiếm món ăn")

    if search:
        filtered_df = foods_df[foods_df["Tên món"].str.contains(search, case=False, na=False)]
    else:
        filtered_df = foods_df

    st.dataframe(filtered_df, use_container_width=True)

    st.markdown("### Thống kê dữ liệu")
    col_data1, col_data2, col_data3 = st.columns(3)

    with col_data1:
        st.metric("Tổng số món", len(foods_df))

    with col_data2:
        st.metric("Nhóm món", foods_df["Nhóm"].nunique())

    with col_data3:
        avg_calories = foods_df["Calo"].mean()
        st.metric("Calo trung bình", f"{avg_calories:.0f} kcal")
# =========================
# TAB 6 - NHẬN DIỆN MÓN ĂN
# =========================
with tab6:
    st.header("📷 Nhận diện món ăn qua ảnh")

    
    # Tải mô hình AI lên 
    model, class_names = load_food101_model()

    if model is None:
        st.error("⚠️ Chưa tìm thấy mô hình AI. Vui lòng kiểm tra lại thư mục 'model' đã có file .h5 chưa.")
    else:
        uploaded_file = st.file_uploader(
            "Upload ảnh món ăn",
            type=["jpg", "jpeg", "png"]
        )

        if uploaded_file is not None:
            # GỌI BẢO VỆ CLIP RA KIỂM TRA TRƯỚC
            with st.spinner("🕵️ Đang quét kiểm tra hình ảnh..."):
                is_food = check_is_food_clip(uploaded_file)
                
                if not is_food:
                    # Bị chặn: Hiện cảnh báo và không làm gì thêm
                    st.error("⚠️ Bíp bíp! Hình như đây không phải là ảnh ẩm thực (có thể là người, động vật hoặc phong cảnh). Vui lòng chọn ảnh món ăn nhé!")
                    st.image(uploaded_file, caption="Ảnh không hợp lệ", width=400)
                    
                else:
                    # CHO QUA: CHẠY NHẬN DIỆN EFFICIENTNET NHƯ CŨ
                    st.success("✅ Xác nhận là ảnh món ăn! Đang tiến hành phân tích sâu...")
                    
                    with st.spinner("🤖 AI đang phân tích chi tiết..."):
                        # GỌI ĐÚNG HÀM NHẬN DIỆN
                        image, predicted_food, confidence, all_results = predict_food101(uploaded_file, model, class_names)
                    
                    col_img, col_result = st.columns([1, 1])
                    
                    with col_img:
                        st.image(image, caption="Ảnh món ăn đã upload", use_container_width=True)
                        
                    with col_result:
                        st.subheader("Kết quả nhận diện")
                        st.success(f"Món ăn dự đoán: **{predicted_food}**")
                        st.write(f"Độ tin cậy: **{confidence:.2f}%**")
                        

                        food_info = foods_df[foods_df["Tên món"] == predicted_food]

                        if not food_info.empty:
                            row = food_info.iloc[0]

                            st.markdown("### Thông tin dinh dưỡng ước tính")
                            st.write(f"**Calo:** {row['Calo']} kcal")
                            st.write(f"**Protein:** {row['Protein']} g")
                            st.write(f"**Carb:** {row['Carb']} g")
                            st.write(f"**Fat:** {row['Fat']} g")
                            st.write(f"**Nhóm món:** {row['Nhóm']}")
                            st.write(f"**Phù hợp:** {row['Phù hợp']}")

                            if row["Phù hợp"] == "Hạn chế":
                                st.error("Món này nên hạn chế nếu bạn đang giảm cân hoặc cần kiểm soát calo.")
                            elif row["Phù hợp"] == "Giảm cân":
                                st.success("Món này khá phù hợp với mục tiêu kiểm soát cân nặng.")
                            elif row["Phù hợp"] == "Tăng cơ":
                                st.info("Món này giàu protein, phù hợp với người muốn tăng cơ.")
                            else:
                                st.info("Món này có thể dùng trong chế độ ăn cân bằng, nhưng vẫn cần chú ý khẩu phần.")

                            if st.button("Thêm món này vào nhật ký ăn uống"):
                                new_item = {
                                    "Thời gian": datetime.now().strftime("%H:%M:%S"),
                                    "Tên món": row["Tên món"],
                                    "Số phần": 1,
                                    "Calo": row["Calo"],
                                    "Protein": row["Protein"],
                                    "Carb": row["Carb"],
                                    "Fat": row["Fat"],
                                    "Nhóm": row["Nhóm"]
                                }

                                st.session_state.meal_log.append(new_item)
                                st.success(f"Đã thêm {predicted_food} vào nhật ký ăn uống!")
                        else:
                            st.warning("Món ăn được nhận diện nhưng chưa có trong bảng dữ liệu dinh dưỡng.")

                    st.markdown("### Top kết quả AI dự đoán")
                    
                    # Cập nhật lại format bảng cho khớp với all_results 
                    result_df = pd.DataFrame(all_results)
                    st.dataframe(result_df, use_container_width=True)
