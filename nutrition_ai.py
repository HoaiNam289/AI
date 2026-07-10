import json
from pathlib import Path


DATA_PATH = Path(__file__).parent / "data" / "meal_knowledge.json"


def load_meal_knowledge():
    if not DATA_PATH.exists():
        return {
            "goal_plans": {
                "Giảm cân": {
                    "description": "Ưu tiên món ít calo, giàu protein và nhiều rau xanh.",
                    "breakfast": [{"name": "Yến mạch + chuối", "calories": 350}],
                    "lunch": [{"name": "Cơm gạo lứt + ức gà + rau", "calories": 550}],
                    "dinner": [{"name": "Cá hấp + salad", "calories": 420}],
                    "snack": [{"name": "Sữa chua không đường", "calories": 90}],
                    "avoid": ["Trà sữa", "Gà rán", "Nước ngọt"]
                },
                "Giữ cân": {
                    "description": "Ăn cân bằng giữa tinh bột, đạm, chất béo và rau.",
                    "breakfast": [{"name": "Bánh mì trứng + sữa", "calories": 480}],
                    "lunch": [{"name": "Cơm trắng + cá + rau", "calories": 650}],
                    "dinner": [{"name": "Cơm + đậu hũ + rau", "calories": 520}],
                    "snack": [{"name": "Táo", "calories": 80}],
                    "avoid": ["Ăn khuya", "Ăn quá nhiều đồ ngọt"]
                },
                "Tăng cân": {
                    "description": "Tăng năng lượng, tăng khẩu phần và chia nhiều bữa.",
                    "breakfast": [{"name": "Bánh mì trứng + sữa + chuối", "calories": 650}],
                    "lunch": [{"name": "Cơm tấm sườn + trứng", "calories": 850}],
                    "dinner": [{"name": "Cơm + thịt bò + rau + sữa", "calories": 780}],
                    "snack": [{"name": "Sữa + chuối", "calories": 250}],
                    "avoid": ["Bỏ bữa", "Ăn quá ít tinh bột"]
                },
                "Tăng cơ": {
                    "description": "Ưu tiên protein cao, đủ calo và kết hợp tập luyện.",
                    "breakfast": [{"name": "Yến mạch + trứng + sữa", "calories": 550}],
                    "lunch": [{"name": "Cơm gạo lứt + ức gà + rau", "calories": 650}],
                    "dinner": [{"name": "Cá hấp + khoai lang + salad", "calories": 580}],
                    "snack": [{"name": "Trứng luộc", "calories": 80}],
                    "avoid": ["Thiếu protein", "Bỏ bữa sau khi tập"]
                }
            }
        }

    with open(DATA_PATH, "r", encoding="utf-8") as file:
        return json.load(file)


def classify_bmi(bmi):
    if bmi < 18.5:
        return "Thiếu cân"
    elif bmi < 25:
        return "Bình thường"
    elif bmi < 30:
        return "Thừa cân"
    else:
        return "Béo phì"


def get_bmi_advice(bmi_label):
    advice = {
        "Thiếu cân": "Bạn nên tăng lượng calo và bổ sung thực phẩm giàu dinh dưỡng.",
        "Bình thường": "Bạn đang ở mức BMI tốt, nên duy trì chế độ ăn cân bằng.",
        "Thừa cân": "Bạn nên kiểm soát calo, hạn chế đồ ngọt và đồ chiên rán.",
        "Béo phì": "Bạn nên xây dựng chế độ ăn giảm calo nghiêm túc hơn và tăng vận động."
    }

    return advice.get(bmi_label, "Cần theo dõi chế độ ăn uống thường xuyên.")


def get_activity_factor(activity):
    factors = {
        "Ít vận động": 1.2,
        "Vận động nhẹ": 1.375,
        "Vận động vừa": 1.55,
        "Vận động nhiều": 1.725,
        "Vận động rất nhiều": 1.9
    }

    return factors.get(activity, 1.2)


def calculate_health_index(age, gender, height_cm, weight_kg, activity, goal):
    height_m = height_cm / 100
    bmi = weight_kg / (height_m ** 2)

    if gender == "Nam":
        bmr = 10 * weight_kg + 6.25 * height_cm - 5 * age + 5
    else:
        bmr = 10 * weight_kg + 6.25 * height_cm - 5 * age - 161

    tdee = bmr * get_activity_factor(activity)

    if goal == "Giảm cân":
        target_calories = tdee - 500
    elif goal == "Tăng cân":
        target_calories = tdee + 400
    elif goal == "Tăng cơ":
        target_calories = tdee + 300
    else:
        target_calories = tdee

    bmi_label = classify_bmi(bmi)

    return {
        "bmi": round(bmi, 2),
        "bmi_label": bmi_label,
        "bmi_advice": get_bmi_advice(bmi_label),
        "bmr": round(bmr),
        "tdee": round(tdee),
        "target_calories": round(target_calories)
    }


def pick_first(items):
    if not items:
        return {"name": "Chưa có dữ liệu món ăn", "calories": 0}

    return items[0]


def generate_personalized_menu(age, gender, height_cm, weight_kg, activity, goal):
    knowledge = load_meal_knowledge()
    health = calculate_health_index(age, gender, height_cm, weight_kg, activity, goal)

    goal_plans = knowledge.get("goal_plans", {})
    plan = goal_plans.get(goal)

    if plan is None:
        plan = goal_plans.get("Giữ cân")

    menu = {
        "Bữa sáng": pick_first(plan.get("breakfast", [])),
        "Bữa trưa": pick_first(plan.get("lunch", [])),
        "Bữa tối": pick_first(plan.get("dinner", [])),
        "Bữa phụ": pick_first(plan.get("snack", []))
    }

    total_menu_calories = sum(item["calories"] for item in menu.values())

    ai_explanation = (
        f"Dựa trên BMI {health['bmi']} thuộc nhóm {health['bmi_label']} "
        f"và mục tiêu {goal.lower()}, hệ thống gợi ý thực đơn khoảng "
        f"{total_menu_calories} kcal/ngày. "
        f"Calo mục tiêu của bạn là khoảng {health['target_calories']} kcal/ngày."
    )

    return {
        "health": health,
        "goal": goal,
        "goal_description": plan.get("description", ""),
        "menu": menu,
        "total_menu_calories": total_menu_calories,
        "avoid": plan.get("avoid", []),
        "ai_explanation": ai_explanation
    }