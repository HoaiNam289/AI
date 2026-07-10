// ===========================
// NutriCare AI - Script
// Tất cả logic xử lý bằng JavaScript thuần
// ===========================

// --- DỮ LIỆU MÓN ĂN MẪU ---
const foodsData = [
  {
    name: "Cơm trắng",
    calo: 130,
    protein: 2.7,
    carb: 28,
    fat: 0.3,
    group: "Tinh bột",
    fit: "Giữ cân",
  },
  {
    name: "Ức gà luộc",
    calo: 165,
    protein: 31,
    carb: 0,
    fat: 3.6,
    group: "Đạm",
    fit: "Giảm cân",
  },
  {
    name: "Trứng gà",
    calo: 155,
    protein: 13,
    carb: 1.1,
    fat: 11,
    group: "Đạm",
    fit: "Tăng cơ",
  },
  {
    name: "Rau luộc",
    calo: 50,
    protein: 2,
    carb: 8,
    fat: 0.5,
    group: "Rau",
    fit: "Giảm cân",
  },
  {
    name: "Salad ức gà",
    calo: 280,
    protein: 28,
    carb: 15,
    fat: 8,
    group: "Healthy",
    fit: "Giảm cân",
  },
  {
    name: "Khoai lang",
    calo: 120,
    protein: 1.6,
    carb: 27,
    fat: 0.1,
    group: "Tinh bột",
    fit: "Giảm cân",
  },
  {
    name: "Yến mạch",
    calo: 389,
    protein: 16.9,
    carb: 66,
    fat: 6.9,
    group: "Tinh bột",
    fit: "Giảm cân",
  },
  {
    name: "Chuối",
    calo: 89,
    protein: 1.1,
    carb: 23,
    fat: 0.3,
    group: "Trái cây",
    fit: "Giữ cân",
  },
  {
    name: "Táo",
    calo: 52,
    protein: 0.3,
    carb: 14,
    fat: 0.2,
    group: "Trái cây",
    fit: "Giảm cân",
  },
  {
    name: "Sữa chua không đường",
    calo: 60,
    protein: 4,
    carb: 5,
    fat: 3,
    group: "Sữa",
    fit: "Giảm cân",
  },
  {
    name: "Cá hồi áp chảo",
    calo: 208,
    protein: 20,
    carb: 0,
    fat: 13,
    group: "Đạm",
    fit: "Tăng cơ",
  },
  {
    name: "Thịt bò áp chảo",
    calo: 250,
    protein: 26,
    carb: 0,
    fat: 15,
    group: "Đạm",
    fit: "Tăng cơ",
  },
  {
    name: "Cơm gạo lứt",
    calo: 111,
    protein: 2.6,
    carb: 23,
    fat: 0.9,
    group: "Tinh bột",
    fit: "Giảm cân",
  },
  {
    name: "Bánh mì trứng",
    calo: 450,
    protein: 16,
    carb: 55,
    fat: 18,
    group: "Đồ ăn nhanh",
    fit: "Giữ cân",
  },
  {
    name: "Bánh mì thịt",
    calo: 450,
    protein: 18,
    carb: 55,
    fat: 18,
    group: "Món Việt",
    fit: "Giữ cân",
  },
  {
    name: "Phở bò",
    calo: 430,
    protein: 25,
    carb: 55,
    fat: 12,
    group: "Món Việt",
    fit: "Giữ cân",
  },
  {
    name: "Bún bò Huế",
    calo: 550,
    protein: 28,
    carb: 65,
    fat: 18,
    group: "Món Việt",
    fit: "Giữ cân",
  },
  {
    name: "Cơm tấm sườn",
    calo: 700,
    protein: 30,
    carb: 85,
    fat: 25,
    group: "Món Việt",
    fit: "Tăng cân",
  },
  {
    name: "Gà rán",
    calo: 600,
    protein: 28,
    carb: 35,
    fat: 38,
    group: "Đồ ăn nhanh",
    fit: "Hạn chế",
  },
  {
    name: "Mì tôm",
    calo: 380,
    protein: 8,
    carb: 55,
    fat: 14,
    group: "Đồ ăn nhanh",
    fit: "Hạn chế",
  },
  {
    name: "Trà sữa",
    calo: 450,
    protein: 4,
    carb: 60,
    fat: 15,
    group: "Đồ ngọt",
    fit: "Hạn chế",
  },
  {
    name: "Nước ngọt có gas",
    calo: 140,
    protein: 0,
    carb: 35,
    fat: 0,
    group: "Đồ ngọt",
    fit: "Hạn chế",
  },
  {
    name: "Bánh ngọt",
    calo: 350,
    protein: 5,
    carb: 50,
    fat: 15,
    group: "Đồ ngọt",
    fit: "Hạn chế",
  },
  {
    name: "Cá hấp",
    calo: 160,
    protein: 25,
    carb: 0,
    fat: 5,
    group: "Đạm",
    fit: "Giảm cân",
  },
  {
    name: "Đậu hũ",
    calo: 76,
    protein: 8,
    carb: 2,
    fat: 4.8,
    group: "Đạm",
    fit: "Giảm cân",
  },
  {
    name: "Sữa tươi không đường",
    calo: 62,
    protein: 3.4,
    carb: 5,
    fat: 3.3,
    group: "Sữa",
    fit: "Tăng cơ",
  },
  {
    name: "Cơm chiên",
    calo: 520,
    protein: 14,
    carb: 70,
    fat: 18,
    group: "Món chính",
    fit: "Giữ cân",
  },
  {
    name: "Mì ramen",
    calo: 480,
    protein: 18,
    carb: 62,
    fat: 16,
    group: "Món nước",
    fit: "Giữ cân",
  },
  {
    name: "Pizza",
    calo: 285,
    protein: 12,
    carb: 36,
    fat: 10,
    group: "Đồ ăn nhanh",
    fit: "Hạn chế",
  },
  {
    name: "Sushi",
    calo: 300,
    protein: 14,
    carb: 45,
    fat: 6,
    group: "Món Nhật",
    fit: "Giữ cân",
  },
  {
    name: "Hamburger",
    calo: 550,
    protein: 25,
    carb: 45,
    fat: 30,
    group: "Đồ ăn nhanh",
    fit: "Hạn chế",
  },
  {
    name: "Kem",
    calo: 210,
    protein: 3.5,
    carb: 24,
    fat: 11,
    group: "Đồ ngọt",
    fit: "Hạn chế",
  },
  {
    name: "Bánh donut",
    calo: 350,
    protein: 4,
    carb: 45,
    fat: 18,
    group: "Đồ ngọt",
    fit: "Hạn chế",
  },
];

// --- STATE: Hồ sơ người dùng ---
let userProfile = {
  name: "Nguyễn Văn A",
  age: 21,
  gender: "Nam",
  height: 170,
  weight: 70,
  activityFactor: 1.55,
  goal: "Giữ cân",
  bmi: 0,
  bmiStatus: "",
  bmr: 0,
  tdee: 0,
  targetCalo: 0,
};

// --- STATE: Nhật ký ăn uống ---
let mealLog = [
  {
    time: "07:30:12",
    name: "Phở bò",
    qty: 1,
    calo: 430,
    protein: 25,
    carb: 55,
    fat: 12,
  },
  {
    time: "12:15:44",
    name: "Cơm tấm sườn",
    qty: 1,
    calo: 700,
    protein: 30,
    carb: 85,
    fat: 25,
  },
  {
    time: "15:40:08",
    name: "Sữa chua không đường",
    qty: 1,
    calo: 60,
    protein: 4,
    carb: 5,
    fat: 3,
  },
  {
    time: "18:25:31",
    name: "Cá hấp",
    qty: 1,
    calo: 160,
    protein: 25,
    carb: 0,
    fat: 5,
  },
];
const PROFILE_STORAGE_KEY = "nutricare_user_profile";
let selectedRecognitionFileName = "";
let latestPredictedFood = null;
let selectedRecognitionFile = null;

// ===========================
// KHỞI TẠO
// ===========================
document.addEventListener("DOMContentLoaded", function () {
  initNavigation();
  initProfileForm();
  initDiary();
  initRecognition();
  initMenuSuggest();
  initChatbot();

  // Tính chỉ số mặc định
  loadSavedProfile();
  calculateHealth();
  renderHealthResult();
  updateDashboard();
  updateMenuSuggest(userProfile.goal);
});

// ===========================
// ĐIỀU HƯỚNG (Navigation)
// ===========================
function initNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll(".section");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  // Click nav item => chuyển section
  navItems.forEach(function (item) {
    item.addEventListener("click", function () {
      const target = item.getAttribute("data-section");

      // Ẩn tất cả section
      sections.forEach(function (s) {
        s.classList.remove("active");
      });
      // Bỏ active tất cả nav
      navItems.forEach(function (n) {
        n.classList.remove("active");
      });

      // Hiện section được chọn
      document.getElementById("section-" + target).classList.add("active");
      item.classList.add("active");

      // Đóng menu mobile
      navMenu.classList.remove("open");

      // Cập nhật dashboard khi chuyển sang
      if (target === "dashboard") {
        updateDashboard();
      }
    });
  });

  // Toggle menu mobile
  menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("open");
  });
}

function openAppSection(target, options) {
  options = options || {};
  var sections = document.querySelectorAll(".section");
  var navItems = document.querySelectorAll(".nav-item");
  var targetSection = document.getElementById("section-" + target);
  if (!targetSection) return;

  sections.forEach(function (section) {
    section.classList.remove("active");
  });

  navItems.forEach(function (item) {
    item.classList.toggle("active", item.getAttribute("data-section") === target);
  });

  targetSection.classList.add("active");

  var navMenu = document.getElementById("navMenu");
  if (navMenu) navMenu.classList.remove("open");

  if (target === "dashboard") updateDashboard();
  if (target === "menu-suggest") {
    var menuGoal = document.getElementById("menuGoal");
    var goal = options.goal || (menuGoal && menuGoal.value) || userProfile.goal;
    if (menuGoal) menuGoal.value = goal;
    updateMenuSuggest(goal);
  }
}

// ===========================
// CÔNG THỨC TÍNH TOÁN
// ===========================

// Tính BMI
function calcBMI(weight, heightCm) {
  var heightM = heightCm / 100;
  return weight / (heightM * heightM);
}

// Đánh giá BMI
function getBMIStatus(bmi) {
  if (bmi < 18.5)
    return {
      status: "Thiếu cân",
      advice: "Bạn nên tăng lượng calo và bổ sung thực phẩm giàu dinh dưỡng.",
    };
  if (bmi < 25)
    return {
      status: "Bình thường",
      advice:
        "Chỉ số BMI của bạn đang ở mức tốt. Hãy duy trì chế độ ăn cân bằng.",
    };
  if (bmi < 30)
    return {
      status: "Thừa cân",
      advice: "Bạn nên kiểm soát calo, giảm đồ ngọt và tăng vận động.",
    };
  return {
    status: "Béo phì",
    advice:
      "Bạn nên xây dựng chế độ ăn nghiêm túc hơn và theo dõi sức khỏe thường xuyên.",
  };
}

// Tính BMR (Mifflin-St Jeor)
function calcBMR(gender, weight, heightCm, age) {
  if (gender === "Nam") {
    return 10 * weight + 6.25 * heightCm - 5 * age + 5;
  }
  return 10 * weight + 6.25 * heightCm - 5 * age - 161;
}

// Tính calo mục tiêu
function calcTargetCalo(tdee, goal) {
  if (goal === "Giảm cân") return tdee - 500;
  if (goal === "Tăng cân") return tdee + 400;
  if (goal === "Tăng cơ") return tdee + 300;
  return tdee; // Giữ cân
}

// Tính tất cả chỉ số từ form
function calculateHealth() {
  var weight = parseFloat(document.getElementById("inputWeight").value) || 70;
  var heightCm =
    parseFloat(document.getElementById("inputHeight").value) || 170;
  var age = parseInt(document.getElementById("inputAge").value) || 21;
  var gender = document.getElementById("inputGender").value;
  var actFactor =
    parseFloat(document.getElementById("inputActivity").value) || 1.55;
  var goal = document.getElementById("inputGoal").value;
  var name = document.getElementById("inputName").value || "Bạn";

  var bmi = calcBMI(weight, heightCm);
  var bmiInfo = getBMIStatus(bmi);
  var bmr = calcBMR(gender, weight, heightCm, age);
  var tdee = bmr * actFactor;
  var targetCalo = calcTargetCalo(tdee, goal);

  userProfile = {
    name: name,
    age: age,
    gender: gender,
    height: heightCm,
    weight: weight,
    activityFactor: actFactor,
    goal: goal,
    bmi: bmi,
    bmiStatus: bmiInfo.status,
    bmiAdvice: bmiInfo.advice,
    bmr: bmr,
    tdee: tdee,
    targetCalo: targetCalo,
  };

  return userProfile;
}

function validateProfileInputs() {
  var statusEl = document.getElementById("profileSaveStatus");
  var name = document.getElementById("inputName").value.trim();
  var age = parseInt(document.getElementById("inputAge").value);
  var height = parseFloat(document.getElementById("inputHeight").value);
  var weight = parseFloat(document.getElementById("inputWeight").value);

  if (!name) {
    statusEl.textContent = "Vui lòng nhập họ tên.";
    statusEl.className = "form-status error";
    return false;
  }

  if (!age || age < 10 || age > 100) {
    statusEl.textContent = "Tuổi phải nằm trong khoảng 10 - 100.";
    statusEl.className = "form-status error";
    return false;
  }

  if (!height || height < 100 || height > 220) {
    statusEl.textContent = "Chiều cao phải nằm trong khoảng 100 - 220 cm.";
    statusEl.className = "form-status error";
    return false;
  }

  if (!weight || weight < 30 || weight > 200) {
    statusEl.textContent = "Cân nặng phải nằm trong khoảng 30 - 200 kg.";
    statusEl.className = "form-status error";
    return false;
  }

  statusEl.textContent = "";
  statusEl.className = "form-status";
  return true;
}

function saveUserProfile() {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(userProfile));
}

function loadSavedProfile() {
  var saved = localStorage.getItem(PROFILE_STORAGE_KEY);
  if (!saved) return;

  try {
    var profile = JSON.parse(saved);
    document.getElementById("inputName").value = profile.name || "Nguyễn Văn A";
    document.getElementById("inputAge").value = profile.age || 21;
    document.getElementById("inputGender").value = profile.gender || "Nam";
    document.getElementById("inputHeight").value = profile.height || 170;
    document.getElementById("inputWeight").value = profile.weight || 70;
    document.getElementById("inputActivity").value =
      profile.activityFactor || 1.55;
    document.getElementById("inputGoal").value = profile.goal || "Giữ cân";
    document.getElementById("menuGoal").value = profile.goal || "Giữ cân";
  } catch (error) {
    localStorage.removeItem(PROFILE_STORAGE_KEY);
  }
}

function renderHealthResult() {
  var resultDiv = document.getElementById("healthResult");
  resultDiv.style.display = "block";

  document.getElementById("resultBMI").textContent = userProfile.bmi.toFixed(2);
  document.getElementById("resultStatus").textContent = userProfile.bmiStatus;
  document.getElementById("resultBMR").textContent =
    Math.round(userProfile.bmr) + " kcal";
  document.getElementById("resultTDEE").textContent =
    Math.round(userProfile.tdee) + " kcal";
  document.getElementById("resultTarget").textContent =
    Math.round(userProfile.targetCalo) + " kcal";
  document.getElementById("resultAdvice").textContent =
    "💡 " + userProfile.bmiAdvice;
}

// ===========================
// HỒ SƠ SỨC KHỎE
// ===========================
function initProfileForm() {
  var form = document.getElementById("profileForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateProfileInputs()) return;

    calculateHealth();
    saveUserProfile();

    // Hiện kết quả
    var resultDiv = document.getElementById("healthResult");
    resultDiv.style.display = "block";

    document.getElementById("resultBMI").textContent =
      userProfile.bmi.toFixed(2);
    document.getElementById("resultStatus").textContent = userProfile.bmiStatus;
    document.getElementById("resultBMR").textContent =
      Math.round(userProfile.bmr) + " kcal";
    document.getElementById("resultTDEE").textContent =
      Math.round(userProfile.tdee) + " kcal";
    document.getElementById("resultTarget").textContent =
      Math.round(userProfile.targetCalo) + " kcal";
    document.getElementById("resultAdvice").textContent =
      "💡 " + userProfile.bmiAdvice;

    // Cập nhật dashboard và thực đơn
    updateDashboard();
    updateMenuSuggest(userProfile.goal);

    // Cập nhật mục tiêu ở thực đơn
    document.getElementById("menuGoal").value = userProfile.goal;

    var statusEl = document.getElementById("profileSaveStatus");
    statusEl.textContent =
      "Đã lưu thông tin. Dashboard, chatbot và gợi ý thực đơn đã được cập nhật.";
    statusEl.className = "form-status success";
  });
}

// ===========================
// DASHBOARD
// ===========================
function updateDashboard() {
  var totalCalo = getTotalCalo();
  var remaining = userProfile.targetCalo - totalCalo;
  var progress =
    userProfile.targetCalo > 0
      ? Math.min(totalCalo / userProfile.targetCalo, 1)
      : 0;

  // Cập nhật card
  document.getElementById("dash-bmi").textContent =
    userProfile.bmi > 0 ? userProfile.bmi.toFixed(2) : "--";
  document.getElementById("dash-bmi-status").textContent =
    userProfile.bmiStatus || "Chưa có dữ liệu";
  document.getElementById("dash-status").textContent =
    userProfile.bmiStatus || "--";
  document.getElementById("dash-bmr").textContent =
    userProfile.bmr > 0 ? Math.round(userProfile.bmr) + " kcal" : "-- kcal";
  document.getElementById("dash-tdee").textContent =
    userProfile.tdee > 0 ? Math.round(userProfile.tdee) + " kcal" : "-- kcal";
  document.getElementById("dash-target").textContent =
    userProfile.targetCalo > 0
      ? Math.round(userProfile.targetCalo) + " kcal"
      : "-- kcal";
  document.getElementById("dash-consumed").textContent =
    Math.round(totalCalo) + " kcal";
  document.getElementById("dash-remaining").textContent =
    Math.round(remaining) + " kcal";

  // Thanh tiến trình
  var progressPercent = Math.round(progress * 100);
  var progressBar = document.getElementById("dash-progress");
  progressBar.style.width = progressPercent + "%";

  // Đổi màu progress bar
  progressBar.className = "progress-bar-fill";
  if (progress > 1) {
    progressBar.classList.add("danger");
  } else if (progress > 0.85) {
    progressBar.classList.add("warning");
  }

  document.getElementById("dash-progress-text").textContent =
    progressPercent + "% calo mục tiêu";

  var totalProtein = getTotalNutrient("protein");
  var totalCarb = getTotalNutrient("carb");
  var totalFat = getTotalNutrient("fat");
  var macroMax = Math.max(totalProtein, totalCarb, totalFat, 1);

  document.getElementById("dash-meal-count").textContent =
    mealLog.length + " món";
  document.getElementById("dash-protein").textContent =
    Math.round(totalProtein) + "g";
  document.getElementById("dash-carb").textContent =
    Math.round(totalCarb) + "g";
  document.getElementById("dash-fat").textContent = Math.round(totalFat) + "g";
  document.getElementById("dash-protein-bar").style.width =
    Math.round((totalProtein / macroMax) * 100) + "%";
  document.getElementById("dash-carb-bar").style.width =
    Math.round((totalCarb / macroMax) * 100) + "%";
  document.getElementById("dash-fat-bar").style.width =
    Math.round((totalFat / macroMax) * 100) + "%";

  renderDashboardRecentMeals();

  // Cảnh báo
  var alertDiv = document.getElementById("dash-alert");

  if (totalCalo === 0) {
    alertDiv.innerHTML =
      '<div class="alert alert-info">📋 Bạn chưa ghi nhận bữa ăn nào hôm nay.</div>';
  } else if (totalCalo > userProfile.targetCalo + 300) {
    var over = Math.round(totalCalo - userProfile.targetCalo);
    alertDiv.innerHTML =
      '<div class="alert alert-danger">⚠️ Bạn đã vượt khoảng ' +
      over +
      " kcal. Nên ăn nhẹ hơn ở bữa tiếp theo.</div>";
  } else if (totalCalo > userProfile.targetCalo) {
    var over2 = Math.round(totalCalo - userProfile.targetCalo);
    alertDiv.innerHTML =
      '<div class="alert alert-warning">⚠️ Bạn vượt nhẹ khoảng ' +
      over2 +
      " kcal. Hãy hạn chế đồ ngọt và dầu mỡ.</div>";
  } else if (remaining <= 150) {
    alertDiv.innerHTML =
      '<div class="alert alert-success">✅ Lượng calo hôm nay khá phù hợp với mục tiêu.</div>';
  } else {
    alertDiv.innerHTML =
      '<div class="alert alert-success">✅ Bạn còn khoảng ' +
      Math.round(remaining) +
      " kcal. Có thể bổ sung bữa ăn nhẹ lành mạnh.</div>";
  }
}

function renderDashboardRecentMeals() {
  var container = document.getElementById("dash-recent-meals");
  if (!container) return;

  if (mealLog.length === 0) {
    container.innerHTML =
      '<div class="recent-meal-empty">Chưa có món ăn nào trong nhật ký.</div>';
    return;
  }

  var recentItems = mealLog.slice(-4).reverse();
  container.innerHTML = recentItems
    .map(function (item) {
      return (
        '<div class="recent-meal-item">' +
        "<div>" +
        "<strong>" +
        item.name +
        "</strong>" +
        "<span>" +
        item.time +
        " · " +
        item.qty +
        " phần</span>" +
        "</div>" +
        "<b>" +
        Math.round(item.calo) +
        " kcal</b>" +
        "</div>"
      );
    })
    .join("");
}

// ===========================
// NHẬT KÝ ĂN UỐNG
// ===========================
function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findFoodByInput(input) {
  var normalizedInput = normalizeText(input);
  if (!normalizedInput) return null;

  var exactMatch = foodsData.find(function (food) {
    return normalizeText(food.name) === normalizedInput;
  });
  if (exactMatch) return exactMatch;

  return (
    foodsData.find(function (food) {
      var normalizedName = normalizeText(food.name);
      return (
        normalizedName.includes(normalizedInput) ||
        normalizedInput.includes(normalizedName)
      );
    }) || null
  );
}

function updateDiarySuggestion() {
  var input = document.getElementById("diaryFood");
  var box = document.getElementById("diarySuggestionBox");
  var status = document.getElementById("diaryAddStatus");
  var food = findFoodByInput(input.value);

  status.textContent = "";
  status.className = "form-status";

  if (!input.value.trim()) {
    box.className = "diary-suggestion-box";
    box.textContent = "Gợi ý: nhập tên món để xem calo và dinh dưỡng ước tính.";
    return null;
  }

  if (!food) {
    box.className = "diary-suggestion-box warning";
    box.textContent =
      "Chưa tìm thấy món này trong dữ liệu. Thử nhập: phở, cơm tấm, bánh mì, sushi, hamburger...";
    return null;
  }

  box.className = "diary-suggestion-box success";
  box.innerHTML =
    "<strong>Gợi ý phù hợp: " +
    food.name +
    "</strong>" +
    "<span>" +
    food.calo +
    " kcal · Protein " +
    food.protein +
    "g · Carb " +
    food.carb +
    "g · Fat " +
    food.fat +
    "g</span>";
  return food;
}

function initDiary() {
  // Nạp danh sách món vào gợi ý nhập liệu
  var input = document.getElementById("diaryFood");
  var suggestions = document.getElementById("foodSuggestions");
  foodsData.forEach(function (food) {
    var option = document.createElement("option");
    option.value = food.name;
    option.label = food.name + " (" + food.calo + " kcal)";
    suggestions.appendChild(option);
  });

  input.addEventListener("input", updateDiarySuggestion);

  // Nút thêm
  document.getElementById("btnAddDiary").addEventListener("click", function () {
    var foodName = input.value;
    var qty = parseFloat(document.getElementById("diaryQty").value) || 1;
    var status = document.getElementById("diaryAddStatus");

    var food = findFoodByInput(foodName);
    if (!food) {
      status.textContent =
        "Chưa tìm thấy món trong dữ liệu. Hãy chọn một món được gợi ý.";
      status.className = "form-status error";
      updateDiarySuggestion();
      return;
    }

    var now = new Date();
    var time =
      now.getHours().toString().padStart(2, "0") +
      ":" +
      now.getMinutes().toString().padStart(2, "0") +
      ":" +
      now.getSeconds().toString().padStart(2, "0");

    mealLog.push({
      time: time,
      name: food.name,
      qty: qty,
      calo: Math.round(food.calo * qty * 10) / 10,
      protein: Math.round(food.protein * qty * 10) / 10,
      carb: Math.round(food.carb * qty * 10) / 10,
      fat: Math.round(food.fat * qty * 10) / 10,
    });

    renderDiary();
    updateDashboard();
    input.value = "";
    updateDiarySuggestion();
    status.textContent = "Đã thêm " + food.name + " vào nhật ký.";
    status.className = "form-status success";
  });

  // Nút xóa nhật ký
  document
    .getElementById("btnClearDiary")
    .addEventListener("click", function () {
      if (confirm("Bạn có chắc muốn xóa toàn bộ nhật ký hôm nay?")) {
        mealLog = [];
        renderDiary();
        updateDashboard();
      }
    });

  renderDiary();
}

// Hiển thị bảng nhật ký
function renderDiary() {
  var tbody = document.getElementById("diaryBody");
  var emptyState = document.getElementById("diaryEmpty");
  var clearBtn = document.getElementById("btnClearDiary");
  var tableEl = document.getElementById("diaryTable");

  tbody.innerHTML = "";

  if (mealLog.length === 0) {
    emptyState.style.display = "block";
    clearBtn.style.display = "none";
    tableEl.style.display = "none";
    return;
  }

  emptyState.style.display = "none";
  clearBtn.style.display = "inline-flex";
  tableEl.style.display = "table";

  mealLog.forEach(function (item, index) {
    var tr = document.createElement("tr");
    tr.innerHTML =
      "<td>" +
      item.time +
      "</td>" +
      "<td>" +
      item.name +
      "</td>" +
      "<td>" +
      item.qty +
      "</td>" +
      "<td>" +
      item.calo +
      "</td>" +
      "<td>" +
      item.protein +
      "g</td>" +
      "<td>" +
      item.carb +
      "g</td>" +
      "<td>" +
      item.fat +
      "g</td>" +
      '<td><button class="btn btn-danger btn-sm" onclick="removeMeal(' +
      index +
      ')">✕</button></td>';
    tbody.appendChild(tr);
  });

  // Tổng
  document.getElementById("totalCalo").textContent =
    Math.round(getTotalCalo()) + " kcal";
  document.getElementById("totalProtein").textContent =
    Math.round(getTotalNutrient("protein")) + "g";
  document.getElementById("totalCarb").textContent =
    Math.round(getTotalNutrient("carb")) + "g";
  document.getElementById("totalFat").textContent =
    Math.round(getTotalNutrient("fat")) + "g";
}

// Xóa một món
function removeMeal(index) {
  mealLog.splice(index, 1);
  renderDiary();
  updateDashboard();
}

// Tổng calo
function getTotalCalo() {
  return mealLog.reduce(function (sum, item) {
    return sum + item.calo;
  }, 0);
}

// Tổng chất dinh dưỡng
function getTotalNutrient(key) {
  return mealLog.reduce(function (sum, item) {
    return sum + item[key];
  }, 0);
}

// ===========================
// NHẬN DIỆN MÓN ĂN (demo giả lập)
// ===========================
function initRecognition() {
  var uploadArea = document.getElementById("uploadArea");
  var uploadInput = document.getElementById("uploadInput");
  var previewDiv = document.getElementById("imagePreview");
  var previewImg = document.getElementById("previewImg");

  // Click upload area => mở file picker
  uploadArea.addEventListener("click", function () {
    uploadInput.click();
  });

  // Drag & drop
  uploadArea.addEventListener("dragover", function (e) {
    e.preventDefault();
    uploadArea.classList.add("dragover");
  });

  uploadArea.addEventListener("dragleave", function () {
    uploadArea.classList.remove("dragover");
  });

  uploadArea.addEventListener("drop", function (e) {
    e.preventDefault();
    uploadArea.classList.remove("dragover");
    if (e.dataTransfer.files.length > 0) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  });

  // Chọn file
  uploadInput.addEventListener("change", function () {
    if (uploadInput.files.length > 0) {
      handleImageFile(uploadInput.files[0]);
    }
  });

  // Nút nhận diện
  document
    .getElementById("btnRecognize")
    .addEventListener("click", function () {
      simulateRecognition();
    });
}

// Xử lý file ảnh
function handleImageFile(file) {
  if (!file.type.startsWith("image/")) {
    alert("Vui lòng chọn file ảnh (JPG, PNG).");
    return;
  }

  selectedRecognitionFileName = file.name.toLowerCase();

  var reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById("previewImg").src = e.target.result;
    document.getElementById("imagePreview").style.display = "block";
    document.getElementById("recognitionResult").style.display = "none";
  };
  reader.readAsDataURL(file);
}

// Giả lập nhận diện (demo)
function simulateRecognition() {
  predictFoodFromImage();
  return;

  var recognitionRules = [
    {
      keywords: ["burger", "hamburger", "ham-burger"],
      name: "Hamburger",
      confidence: 91.8,
    },
    { keywords: ["pho", "phobo", "pho-bo"], name: "Phở bò", confidence: 88.6 },
    {
      keywords: ["bunbo", "bun-bo", "hue"],
      name: "Bún bò Huế",
      confidence: 86.4,
    },
    {
      keywords: ["comtam", "com-tam", "suon"],
      name: "Cơm tấm sườn",
      confidence: 90.2,
    },
    {
      keywords: ["garan", "ga-ran", "fried-chicken", "chicken"],
      name: "Gà rán",
      confidence: 84.9,
    },
    { keywords: ["pizza"], name: "Pizza", confidence: 89.7 },
    { keywords: ["sushi"], name: "Sushi", confidence: 87.3 },
    { keywords: ["salad"], name: "Salad ức gà", confidence: 85.5 },
    { keywords: ["ramen", "mi-ramen"], name: "Mì ramen", confidence: 83.1 },
    {
      keywords: ["banhmi", "banh-mi", "banh", "bread", "sandwich", "baguette"],
      name: "Bánh mì trứng",
      confidence: 88.4,
    },
  ];

  var result = recognitionRules.find(function (rule) {
    return rule.keywords.some(function (keyword) {
      return selectedRecognitionFileName.includes(keyword);
    });
  });

  if (!result) {
    result = { name: "Bánh mì trứng", confidence: 88.4 };
  }

  // Tìm thông tin dinh dưỡng
  var food = foodsData.find(function (f) {
    return f.name === result.name;
  });

  // Hiện kết quả
  document.getElementById("recognitionResult").style.display = "block";
  document.getElementById("recFood").textContent = result.name;
  document.getElementById("recConfidence").textContent =
    result.confidence.toFixed(1) + "%";

  if (food) {
    document.getElementById("recCalo").textContent = food.calo + " kcal";
    document.getElementById("recProtein").textContent = food.protein + "g";
    document.getElementById("recCarb").textContent = food.carb + "g";
    document.getElementById("recFat").textContent = food.fat + "g";

    // Nhận xét
    var commentEl = document.getElementById("recComment");
    if (food.fit === "Hạn chế") {
      commentEl.className = "alert alert-warning";
      commentEl.textContent =
        "⚠️ Món này nên hạn chế nếu bạn đang kiểm soát calo hoặc giảm cân.";
    } else if (food.fit === "Giảm cân") {
      commentEl.className = "alert alert-success";
      commentEl.textContent =
        "✅ Món này khá phù hợp với mục tiêu kiểm soát cân nặng.";
    } else if (food.fit === "Tăng cơ") {
      commentEl.className = "alert alert-info";
      commentEl.textContent =
        "💪 Món này giàu protein, phù hợp với người muốn tăng cơ.";
    } else {
      commentEl.className = "alert alert-info";
      commentEl.textContent =
        "ℹ️ Món này có thể dùng trong chế độ ăn cân bằng, chú ý khẩu phần.";
    }
  }
}

// ===========================
// GỢI Ý THỰC ĐƠN
// ===========================

// Dữ liệu thực đơn theo mục tiêu
function initRecognition() {
  var uploadArea = document.getElementById("uploadArea");
  var foodImageInput = document.getElementById("foodImageInput");
  var predictFoodBtn = document.getElementById("predictFoodBtn");
  var addPredictedFoodBtn = document.getElementById("addPredictedFoodBtn");

  if (!uploadArea || !foodImageInput || !predictFoodBtn) return;

  uploadArea.addEventListener("click", function () {
    foodImageInput.click();
  });

  uploadArea.addEventListener("dragover", function (e) {
    e.preventDefault();
    uploadArea.classList.add("dragover");
  });

  uploadArea.addEventListener("dragleave", function () {
    uploadArea.classList.remove("dragover");
  });

  uploadArea.addEventListener("drop", function (e) {
    e.preventDefault();
    uploadArea.classList.remove("dragover");
    if (e.dataTransfer.files.length > 0) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  });

  foodImageInput.addEventListener("change", function () {
    if (foodImageInput.files.length > 0) {
      handleImageFile(foodImageInput.files[0]);
    }
  });

  predictFoodBtn.addEventListener("click", predictFoodFromImage);

  if (addPredictedFoodBtn) {
    addPredictedFoodBtn.addEventListener("click", addPredictedFoodToDiary);
  }
}

function handleImageFile(file) {
  if (!file.type.startsWith("image/")) {
    alert("Vui long chon file anh JPG hoac PNG.");
    return;
  }

  selectedRecognitionFileName = file.name.toLowerCase();
  selectedRecognitionFile = file;
  latestPredictedFood = null;

  var previewImg = document.getElementById("foodImagePreview");
  if (previewImg) {
    previewImg.src = URL.createObjectURL(file);
    previewImg.style.display = "block";
  }

  document.getElementById("imagePreview").style.display = "block";
  document.getElementById("predictResult").style.display = "none";
}

async function predictFoodFromImage() {
  var foodImageInput = document.getElementById("foodImageInput");
  var predictFoodBtn = document.getElementById("predictFoodBtn");
  var file = foodImageInput.files[0] || selectedRecognitionFile;

  if (!file) {
    alert("Vui long chon anh mon an truoc.");
    return;
  }

  var formData = new FormData();
  formData.append("file", file);

  predictFoodBtn.textContent = "Dang nhan dien...";
  predictFoodBtn.disabled = true;

  try {
    var response = await fetch("/api/predict-food", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Khong the nhan dien anh.");
    }

    var result = await response.json();
    renderPredictionResult(result);
  } catch (error) {
    alert("Loi khi nhan dien mon an: " + error.message);
  } finally {
    predictFoodBtn.textContent = "Nhan dien mon an";
    predictFoodBtn.disabled = false;
  }
}

function renderPredictionResult(result) {
  var nutrition = result.nutrition || {};
  latestPredictedFood = {
    name: result.food_name,
    calo: Number(nutrition.calories) || 0,
    protein: Number(nutrition.protein) || 0,
    carb: Number(nutrition.carb) || 0,
    fat: Number(nutrition.fat) || 0,
  };

  document.getElementById("predictedFoodName").textContent =
    result.food_name || "---";
  document.getElementById("predictedConfidence").textContent =
    (Number(result.confidence) || 0) + "%";
  document.getElementById("predictedCalories").textContent =
    latestPredictedFood.calo + " kcal";
  document.getElementById("predictedProtein").textContent =
    latestPredictedFood.protein + " g";
  document.getElementById("predictedCarb").textContent =
    latestPredictedFood.carb + " g";
  document.getElementById("predictedFat").textContent =
    latestPredictedFood.fat + " g";

  renderRecognitionComment(latestPredictedFood.name);
  renderTopPredictResults(result.top_results || []);
  document.getElementById("predictResult").style.display = "block";
}

function renderRecognitionComment(foodName) {
  var food = foodsData.find(function (item) {
    return normalizeText(item.name) === normalizeText(foodName);
  });
  var commentEl = document.getElementById("recComment");
  if (!commentEl) return;

  if (!food) {
    commentEl.className = "alert alert-info";
    commentEl.textContent =
      "Mon an da duoc nhan dien tu model. Thong tin dinh duong lay tu backend.";
    return;
  }

  if (food.fit === "Háº¡n cháº¿") {
    commentEl.className = "alert alert-warning";
    commentEl.textContent =
      "Mon nay nen han che neu ban dang kiem soat calo hoac giam can.";
  } else if (food.fit === "Giáº£m cĂ¢n") {
    commentEl.className = "alert alert-success";
    commentEl.textContent =
      "Mon nay kha phu hop voi muc tieu kiem soat can nang.";
  } else if (food.fit === "TÄƒng cÆ¡") {
    commentEl.className = "alert alert-info";
    commentEl.textContent =
      "Mon nay giau protein, phu hop voi nguoi muon tang co.";
  } else {
    commentEl.className = "alert alert-info";
    commentEl.textContent =
      "Mon nay co the dung trong che do an can bang, chu y khau phan.";
  }
}

function renderTopPredictResults(results) {
  var topPredictResults = document.getElementById("topPredictResults");
  if (!topPredictResults) return;

  if (!results.length) {
    topPredictResults.innerHTML = "";
    return;
  }

  topPredictResults.innerHTML = "<h4>Top ket qua du doan</h4>";
  results.forEach(function (item, index) {
    var row = document.createElement("div");
    row.className = "top-result-item";
    row.innerHTML =
      "<span>" +
      (index + 1) +
      ". " +
      item.food_name +
      "</span><strong>" +
      item.confidence +
      "%</strong>";
    topPredictResults.appendChild(row);
  });
}

function addPredictedFoodToDiary() {
  if (!latestPredictedFood) {
    alert("Chua co mon an nao duoc nhan dien.");
    return;
  }

  var now = new Date();
  var time =
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0") +
    ":" +
    now.getSeconds().toString().padStart(2, "0");

  mealLog.push({
    time: time,
    name: latestPredictedFood.name,
    qty: 1,
    calo: latestPredictedFood.calo,
    protein: latestPredictedFood.protein,
    carb: latestPredictedFood.carb,
    fat: latestPredictedFood.fat,
  });

  renderDiary();
  updateDashboard();
  alert("Da them mon nhan dien vao nhat ky.");
}

var menuData = {
  "Giảm cân": {
    calories: "1.450 - 1.650 kcal",
    focus: "Ít calo",
    note: "Nhiều rau, đạm nạc, giảm đồ chiên ngọt",
    description:
      "Thực đơn ưu tiên món Việt dễ chuẩn bị, khẩu phần vừa phải và giàu chất xơ.",
    days: [
      {
        day: "Thứ 2",
        breakfast: "Yến mạch + chuối",
        lunch: "Cơm gạo lứt + ức gà + rau luộc",
        dinner: "Cá hấp + canh bí xanh",
        snack: "Sữa chua không đường",
        calo: "~1.520",
      },
      {
        day: "Thứ 3",
        breakfast: "Bánh mì trứng ốp la",
        lunch: "Bún thịt nạc + rau sống",
        dinner: "Đậu hũ sốt cà + salad",
        snack: "Táo",
        calo: "~1.480",
      },
      {
        day: "Thứ 4",
        breakfast: "Khoai lang + sữa tươi không đường",
        lunch: "Cơm trắng ít + cá kho + rau",
        dinner: "Ức gà áp chảo + súp rau",
        snack: "Chuối nhỏ",
        calo: "~1.560",
      },
      {
        day: "Thứ 5",
        breakfast: "Phở bò ít bánh",
        lunch: "Cơm gạo lứt + thịt bò xào rau",
        dinner: "Cá hấp + rau luộc",
        snack: "Sữa chua",
        calo: "~1.620",
      },
      {
        day: "Thứ 6",
        breakfast: "Trứng luộc + khoai lang",
        lunch: "Cơm trắng + đậu hũ + canh rau",
        dinner: "Salad ức gà",
        snack: "Táo",
        calo: "~1.430",
      },
      {
        day: "Thứ 7",
        breakfast: "Bún gà xé",
        lunch: "Cơm gạo lứt + cá hấp + rau",
        dinner: "Canh chua cá + rau",
        snack: "Sữa tươi không đường",
        calo: "~1.590",
      },
      {
        day: "Chủ nhật",
        breakfast: "Cháo yến mạch thịt bằm",
        lunch: "Gỏi cuốn + đậu hũ",
        dinner: "Ức gà + rau củ luộc",
        snack: "Chuối",
        calo: "~1.500",
      },
    ],
  },
  "Giữ cân": {
    calories: "1.850 - 2.100 kcal",
    focus: "Cân bằng",
    note: "Đủ tinh bột, đạm, rau và chất béo tốt",
    description:
      "Kế hoạch duy trì cân nặng với các bữa ăn quen thuộc, dễ theo dõi calo.",
    days: [
      {
        day: "Thứ 2",
        breakfast: "Bánh mì trứng + sữa tươi",
        lunch: "Cơm trắng + cá hấp + rau luộc",
        dinner: "Cơm gạo lứt + đậu hũ",
        snack: "Chuối",
        calo: "~1.900",
      },
      {
        day: "Thứ 3",
        breakfast: "Phở bò",
        lunch: "Cơm gà luộc + canh rau",
        dinner: "Bún thịt nướng ít mỡ",
        snack: "Sữa chua",
        calo: "~2.050",
      },
      {
        day: "Thứ 4",
        breakfast: "Xôi mặn phần nhỏ",
        lunch: "Cơm cá kho + rau xào",
        dinner: "Miến gà + rau",
        snack: "Táo",
        calo: "~1.980",
      },
      {
        day: "Thứ 5",
        breakfast: "Bún bò Huế phần nhỏ",
        lunch: "Cơm tấm sườn + rau",
        dinner: "Canh chua cá + cơm ít",
        snack: "Sữa tươi",
        calo: "~2.100",
      },
      {
        day: "Thứ 6",
        breakfast: "Yến mạch + chuối",
        lunch: "Cơm bò xào rau",
        dinner: "Đậu hũ + trứng + rau luộc",
        snack: "Sữa chua",
        calo: "~1.880",
      },
      {
        day: "Thứ 7",
        breakfast: "Bánh mì thịt nạc",
        lunch: "Cơm gạo lứt + ức gà",
        dinner: "Phở gà",
        snack: "Trái cây",
        calo: "~1.950",
      },
      {
        day: "Chủ nhật",
        breakfast: "Cháo thịt bằm",
        lunch: "Bún chả phần vừa",
        dinner: "Cá hấp + cơm + rau",
        snack: "Chuối",
        calo: "~2.000",
      },
    ],
  },
  "Tăng cân": {
    calories: "2.350 - 2.650 kcal",
    focus: "Tăng năng lượng",
    note: "Tăng khẩu phần, thêm bữa phụ giàu dinh dưỡng",
    description:
      "Thực đơn tăng cân lành mạnh, bổ sung thêm tinh bột, sữa và đạm trong ngày.",
    days: [
      {
        day: "Thứ 2",
        breakfast: "Bánh mì trứng + sữa + chuối",
        lunch: "Cơm tấm sườn + trứng",
        dinner: "Cơm bò áp chảo + canh",
        snack: "Sữa chua + hạt",
        calo: "~2.520",
      },
      {
        day: "Thứ 3",
        breakfast: "Phở bò + sữa tươi",
        lunch: "Cơm gà + rau + canh",
        dinner: "Mì Ý thịt bò",
        snack: "Chuối + sữa",
        calo: "~2.480",
      },
      {
        day: "Thứ 4",
        breakfast: "Xôi gà",
        lunch: "Cơm cá hồi + khoai lang",
        dinner: "Cơm thịt kho trứng",
        snack: "Bánh mì bơ đậu phộng",
        calo: "~2.620",
      },
      {
        day: "Thứ 5",
        breakfast: "Yến mạch + sữa + trứng",
        lunch: "Cơm sườn + rau",
        dinner: "Bún bò Huế",
        snack: "Sữa tươi + chuối",
        calo: "~2.560",
      },
      {
        day: "Thứ 6",
        breakfast: "Bánh mì thịt + sữa",
        lunch: "Cơm bò xào + trứng",
        dinner: "Cơm cá kho + canh",
        snack: "Sữa chua + trái cây",
        calo: "~2.430",
      },
      {
        day: "Thứ 7",
        breakfast: "Cơm chiên trứng",
        lunch: "Cơm gà xối mỡ phần vừa",
        dinner: "Lẩu cá + bún",
        snack: "Sinh tố chuối",
        calo: "~2.650",
      },
      {
        day: "Chủ nhật",
        breakfast: "Bún thịt nướng",
        lunch: "Cơm tấm sườn bì trứng",
        dinner: "Cơm bò + rau",
        snack: "Sữa + bánh mì",
        calo: "~2.600",
      },
    ],
  },
  "Tăng cơ": {
    calories: "2.100 - 2.400 kcal",
    focus: "Giàu protein",
    note: "Ưu tiên đạm nạc, carb tốt và bữa sau tập",
    description:
      "Kế hoạch tăng cơ tập trung protein từ ức gà, cá, trứng, bò và đậu hũ.",
    days: [
      {
        day: "Thứ 2",
        breakfast: "Yến mạch + 2 trứng + sữa",
        lunch: "Cơm gạo lứt + ức gà + rau",
        dinner: "Cá hồi + khoai lang",
        snack: "Sữa chua Hy Lạp",
        calo: "~2.180",
      },
      {
        day: "Thứ 3",
        breakfast: "Bánh mì trứng + sữa",
        lunch: "Cơm bò áp chảo + rau",
        dinner: "Ức gà + salad + cơm ít",
        snack: "Chuối + sữa",
        calo: "~2.250",
      },
      {
        day: "Thứ 4",
        breakfast: "Phở bò nhiều thịt",
        lunch: "Cơm cá hấp + đậu hũ",
        dinner: "Trứng chiên + rau + khoai",
        snack: "Sữa tươi",
        calo: "~2.160",
      },
      {
        day: "Thứ 5",
        breakfast: "Khoai lang + trứng luộc",
        lunch: "Cơm gà luộc + rau",
        dinner: "Thịt bò xào rau + cơm",
        snack: "Sữa chua + chuối",
        calo: "~2.220",
      },
      {
        day: "Thứ 6",
        breakfast: "Yến mạch + sữa + chuối",
        lunch: "Cơm cá hồi + rau",
        dinner: "Ức gà áp chảo + khoai",
        snack: "Trứng luộc",
        calo: "~2.120",
      },
      {
        day: "Thứ 7",
        breakfast: "Bún bò phần nhiều thịt",
        lunch: "Cơm gạo lứt + bò + rau",
        dinner: "Cá hấp + đậu hũ",
        snack: "Sữa protein",
        calo: "~2.350",
      },
      {
        day: "Chủ nhật",
        breakfast: "Bánh mì ốp la 2 trứng",
        lunch: "Cơm gà + canh rau",
        dinner: "Bít tết + khoai lang",
        snack: "Sữa chua",
        calo: "~2.300",
      },
    ],
  },
};

function initMenuSuggest() {
  var goalSelect = document.getElementById("menuGoal");

  goalSelect.addEventListener("change", function () {
    updateMenuSuggest(goalSelect.value);
  });
}

function updateMenuSuggest(goal) {
  var data = menuData[goal] || menuData["Giữ cân"];
  var tbody = document.getElementById("weeklyMenuBody");

  document.getElementById("menuWeeklyCalories").textContent = data.calories;
  document.getElementById("menuWeeklyFocus").textContent = data.focus;
  document.getElementById("menuWeeklyNote").textContent = data.note;
  document.getElementById("menuWeeklyDescription").textContent =
    data.description;

  tbody.innerHTML = "";
  data.days.forEach(function (item) {
    var tr = document.createElement("tr");
    tr.innerHTML =
      "<td><strong>" +
      item.day +
      "</strong></td>" +
      "<td>" +
      item.breakfast +
      "</td>" +
      "<td>" +
      item.lunch +
      "</td>" +
      "<td>" +
      item.dinner +
      "</td>" +
      "<td>" +
      item.snack +
      "</td>" +
      '<td><span class="menu-calorie-pill">' +
      item.calo +
      " kcal</span></td>";
    tbody.appendChild(tr);
  });
}

// ===========================
// CHATBOT AI (rule-based)
// ===========================
function initChatbot() {
  var chatInput = document.getElementById("chatInput");
  var sendBtn = document.getElementById("btnChatSend");

  // Nút gửi
  sendBtn.addEventListener("click", function () {
    sendChat();
  });

  // Enter để gửi
  chatInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      sendChat();
    }
  });

  // Câu hỏi mẫu
  var sampleBtns = document.querySelectorAll(".sample-q-btn");
  sampleBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      chatInput.value = btn.textContent;
      sendChat();
    });
  });
}

function sendChat() {
  var input = document.getElementById("chatInput");
  var question = input.value.trim();

  if (!question) return;

  // Hiện tin nhắn user
  appendChatMsg(question, "user");
  input.value = "";

  // Tạo câu trả lời
  var answer = getChatbotAnswer(question);

  // Hiện tin nhắn bot (delay nhẹ cho tự nhiên)
  setTimeout(function () {
    appendChatMsg(answer, "bot");
  }, 400);
}

function appendChatMsg(content, type) {
  var container = document.getElementById("chatMessages");
  var div = document.createElement("div");
  div.className = "chat-msg " + type;

  if (type === "bot" && content && typeof content === "object") {
    div.innerHTML = renderChatResponse(content);
    bindChatActions(div);
  } else {
    div.textContent = String(content || "");
  }

  container.appendChild(div);

  // Cuộn xuống cuối
  container.scrollTop = container.scrollHeight;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderChatResponse(response) {
  if (typeof response === "string") {
    return "<p>" + escapeHtml(response) + "</p>";
  }

  var html = '<div class="chat-card">';
  if (response.title) {
    html += '<div class="chat-card-title">' + escapeHtml(response.title) + "</div>";
  }
  if (response.summary) {
    html += '<p class="chat-card-summary">' + escapeHtml(response.summary) + "</p>";
  }
  if (response.bullets && response.bullets.length) {
    html += '<ul class="chat-card-list">';
    response.bullets.forEach(function (item) {
      html += "<li>" + escapeHtml(item) + "</li>";
    });
    html += "</ul>";
  }
  if (response.note) {
    html += '<p class="chat-card-note">' + escapeHtml(response.note) + "</p>";
  }
  if (response.actions && response.actions.length) {
    html += '<div class="chat-card-actions">';
    response.actions.forEach(function (action) {
      html +=
        '<button type="button" class="chat-action-btn" data-action="' +
        escapeHtml(action.action) +
        '" data-goal="' +
        escapeHtml(action.goal || "") +
        '">' +
        escapeHtml(action.label) +
        "</button>";
    });
    html += "</div>";
  }
  html += "</div>";
  return html;
}

function bindChatActions(root) {
  root.querySelectorAll(".chat-action-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      var action = button.getAttribute("data-action");
      var goal = button.getAttribute("data-goal");
      if (action === "menu-suggest") openAppSection("menu-suggest", { goal: goal || userProfile.goal });
      if (action === "diary") openAppSection("diary");
      if (action === "profile") openAppSection("profile");
      if (action === "recognition") openAppSection("recognition");
    });
  });
}

// Chatbot rule-based
function getChatbotAnswer(question) {
  var q = question.toLowerCase();
  var name = userProfile.name || "bạn";
  var goal = userProfile.goal;
  var bmi = userProfile.bmi;
  var bmiStatus = userProfile.bmiStatus;
  var targetCalo = userProfile.targetCalo;
  var totalCalo = getTotalCalo();
  var remaining = targetCalo - totalCalo;

  // Kiểm tra từ khóa và trả lời
  if (q.includes("bmi") || q.includes("chỉ số")) {
    if (bmi > 0) {
      return (
        name +
        ", chỉ số BMI hiện tại của bạn là " +
        bmi.toFixed(2) +
        ", thuộc nhóm " +
        bmiStatus +
        ". " +
        "Với mục tiêu " +
        goal.toLowerCase() +
        ", bạn nên theo dõi lượng calo hằng ngày và duy trì chế độ ăn phù hợp."
      );
    }
    return "Bạn chưa nhập thông tin sức khỏe. Hãy vào mục 'Hồ sơ sức khỏe' để tính BMI nhé.";
  }

  if (q.includes("giảm cân")) {
    return (
      "Để giảm cân, bạn nên tạo mức thâm hụt khoảng 300–500 kcal mỗi ngày. " +
      "Hạn chế trà sữa, nước ngọt, đồ chiên rán và tăng rau xanh, đạm nạc như ức gà, cá, trứng, đậu hũ. " +
      "Mức calo mục tiêu của bạn là khoảng " +
      Math.round(targetCalo) +
      " kcal/ngày."
    );
  }

  if (q.includes("tăng cân")) {
    return (
      "Để tăng cân, bạn nên ăn cao hơn TDEE khoảng 300–500 kcal mỗi ngày. " +
      "Nên bổ sung cơm, khoai, yến mạch, thịt, cá, trứng, sữa và chia thành nhiều bữa nhỏ trong ngày."
    );
  }

  if (q.includes("tăng cơ") || q.includes("protein")) {
    return (
      "Để tăng cơ, bạn cần ưu tiên protein. Các món phù hợp gồm ức gà, trứng, cá hồi, thịt bò, sữa, đậu hũ. " +
      "Nên kết hợp tập luyện và ngủ đủ giấc để cơ thể phục hồi tốt."
    );
  }

  if (q.includes("tối") || q.includes("bữa tối")) {
    if (remaining <= 0) {
      return (
        "Hôm nay bạn đã gần đạt hoặc vượt calo mục tiêu. Bữa tối nên ăn nhẹ như rau luộc, salad, cá hấp " +
        "hoặc sữa chua không đường. Tránh cơm nhiều, đồ chiên và đồ ngọt."
      );
    }
    return (
      "Bạn còn khoảng " +
      Math.round(remaining) +
      " kcal. " +
      "Bữa tối có thể chọn cá hấp, salad ức gà, rau luộc, đậu hũ hoặc một phần cơm gạo lứt vừa phải."
    );
  }

  if (q.includes("trà sữa") || q.includes("nước ngọt")) {
    return (
      "Trà sữa và nước ngọt thường chứa nhiều đường, dễ làm vượt calo nhưng ít giá trị dinh dưỡng. " +
      "Nếu đang giảm cân, bạn nên hạn chế còn 1–2 lần/tuần hoặc chọn size nhỏ, ít đường."
    );
  }

  if (q.includes("thực đơn") || q.includes("ăn gì")) {
    return (
      "Với mục tiêu " +
      goal.toLowerCase() +
      ", bạn có thể tham khảo: " +
      "sáng ăn yến mạch hoặc bánh mì trứng, trưa ăn cơm gạo lứt với ức gà và rau, " +
      "tối ăn cá hấp hoặc salad. Bữa phụ có thể dùng chuối, táo hoặc sữa chua không đường."
    );
  }

  if (q.includes("calo") || q.includes("kcal")) {
    if (totalCalo > 0) {
      return (
        "Hôm nay bạn đã nạp " +
        Math.round(totalCalo) +
        " kcal, " +
        "mục tiêu là " +
        Math.round(targetCalo) +
        " kcal. " +
        (remaining > 0
          ? "Còn lại khoảng " + Math.round(remaining) + " kcal."
          : "Bạn đã vượt mục tiêu!")
      );
    }
    return "Bạn chưa ghi nhận bữa ăn nào hôm nay. Hãy vào 'Nhật ký ăn uống' để thêm món nhé.";
  }

  // Trả lời mặc định
  return (
    "Mình có thể tư vấn về BMI, giảm cân, tăng cân, tăng cơ, protein, thực đơn, bữa tối hoặc calo. " +
    "Bạn hãy hỏi cụ thể hơn, ví dụ: 'Tối nay tôi nên ăn gì?' hoặc 'Tôi muốn giảm cân thì ăn thế nào?'."
  );
}

function getNutritionContext() {
  var totalCalo = getTotalCalo();
  var totalProtein = getTotalNutrient("protein");
  var totalCarb = getTotalNutrient("carb");
  var totalFat = getTotalNutrient("fat");
  var targetCalo = Number(userProfile.targetCalo) || 0;
  var remaining = targetCalo - totalCalo;
  var progress = targetCalo > 0 ? (totalCalo / targetCalo) * 100 : 0;
  var latestMeal = mealLog.length ? mealLog[mealLog.length - 1] : null;

  return {
    name: userProfile.name || "bạn",
    goal: userProfile.goal || "Giữ cân",
    bmi: Number(userProfile.bmi) || 0,
    bmiStatus: userProfile.bmiStatus || "chưa có dữ liệu",
    bmr: Number(userProfile.bmr) || 0,
    tdee: Number(userProfile.tdee) || 0,
    targetCalo: targetCalo,
    totalCalo: totalCalo,
    totalProtein: totalProtein,
    totalCarb: totalCarb,
    totalFat: totalFat,
    remaining: remaining,
    progress: progress,
    latestMeal: latestMeal,
    mealCount: mealLog.length,
  };
}

function formatNumber(value) {
  return Math.round(Number(value) || 0);
}

function formatMealLogForChat() {
  if (!mealLog.length) return "Nhật ký hôm nay chưa có món nào.";

  return mealLog
    .map(function (meal, index) {
      return (
        index + 1 + ". " + meal.name + " (" + formatNumber(meal.calo) + " kcal)"
      );
    })
    .join("; ");
}

function getCalorieStatusText(ctx) {
  if (!ctx.targetCalo) {
    return "Bạn chưa có calo mục tiêu. Hãy tính hồ sơ sức khỏe trước để mình đánh giá chính xác hơn.";
  }

  if (ctx.totalCalo === 0) {
    return (
      "Hôm nay bạn chưa ghi món nào. Mục tiêu hiện tại của bạn là khoảng " +
      formatNumber(ctx.targetCalo) +
      " kcal/ngày."
    );
  }

  if (ctx.remaining < 0) {
    return (
      "Bạn đã vượt mục tiêu khoảng " +
      formatNumber(Math.abs(ctx.remaining)) +
      " kcal. Phần còn lại trong ngày nên ưu tiên món nhẹ: rau, canh, cá hấp, đậu hũ hoặc sữa chua không đường."
    );
  }

  if (ctx.remaining <= 150) {
    return (
      "Bạn gần đạt mục tiêu rồi, còn khoảng " +
      formatNumber(ctx.remaining) +
      " kcal. Nếu còn đói, nên chọn món nhẹ giàu protein hoặc nhiều rau."
    );
  }

  return (
    "Bạn còn khoảng " +
    formatNumber(ctx.remaining) +
    " kcal so với mục tiêu hôm nay."
  );
}

function getMacroAdvice(ctx) {
  var parts = [
    "Tổng macro hôm nay: protein " +
      formatNumber(ctx.totalProtein) +
      "g, carb " +
      formatNumber(ctx.totalCarb) +
      "g, fat " +
      formatNumber(ctx.totalFat) +
      "g.",
  ];

  if (ctx.totalProtein < 45) {
    parts.push(
      "Protein đang hơi thấp; bạn có thể thêm ức gà, cá, trứng, đậu hũ, sữa chua hoặc thịt nạc."
    );
  } else {
    parts.push("Protein hiện khá ổn cho một ngày ăn uống bình thường.");
  }

  if (ctx.totalFat > 70) {
    parts.push("Fat đang cao, nên hạn chế món chiên, phô mai, sốt béo và đồ ăn nhanh ở bữa tiếp theo.");
  }

  if (ctx.totalCarb < 80 && ctx.remaining > 250) {
    parts.push("Nếu cần thêm năng lượng, có thể thêm cơm, khoai lang, yến mạch hoặc trái cây.");
  }

  return parts.join(" ");
}

function getGoalBasedSuggestion(ctx) {
  if (ctx.goal === "Giảm cân") {
    return "Với mục tiêu giảm cân, nên ưu tiên đạm nạc và rau, giữ tinh bột vừa phải, hạn chế đồ ngọt và món chiên.";
  }
  if (ctx.goal === "Tăng cân") {
    return "Với mục tiêu tăng cân, bạn nên thêm bữa phụ giàu năng lượng như sữa, chuối, yến mạch, bánh mì hoặc cơm kèm đạm.";
  }
  if (ctx.goal === "Tăng cơ") {
    return "Với mục tiêu tăng cơ, hãy ưu tiên protein ở mỗi bữa và thêm carb tốt quanh thời điểm tập luyện.";
  }
  return "Với mục tiêu giữ cân, hãy giữ tổng calo gần mục tiêu và cân bằng giữa đạm, tinh bột, chất béo và rau.";
}

function getMealSuggestion(ctx, q) {
  var mealTime = "bữa tiếp theo";
  if (q.includes("sang")) mealTime = "bữa sáng";
  if (q.includes("trua")) mealTime = "bữa trưa";
  if (q.includes("toi")) mealTime = "bữa tối";

  if (ctx.remaining <= 0) {
    return (
      "Cho " +
      mealTime +
      ", bạn đã hết calo dư trong ngày. Nên chọn salad, rau luộc, canh, cá hấp, đậu hũ hoặc sữa chua không đường."
    );
  }

  if (ctx.remaining < 350) {
    return (
      "Cho " +
      mealTime +
      ", bạn còn khoảng " +
      formatNumber(ctx.remaining) +
      " kcal. Gợi ý: trứng luộc + rau, sữa chua không đường + trái cây, hoặc cá/đậu hũ kèm rau."
    );
  }

  if (ctx.goal === "Tăng cân" || ctx.goal === "Tăng cơ") {
    return (
      "Cho " +
      mealTime +
      ", bạn còn khoảng " +
      formatNumber(ctx.remaining) +
      " kcal. Gợi ý: cơm + thịt/cá/trứng + rau, hoặc yến mạch + sữa + chuối nếu cần bữa nhanh."
    );
  }

  return (
    "Cho " +
    mealTime +
    ", bạn còn khoảng " +
    formatNumber(ctx.remaining) +
    " kcal. Gợi ý: cơm gạo lứt hoặc khoai + ức gà/cá/đậu hũ + nhiều rau."
  );
}

function getDiaryReview(ctx) {
  if (!ctx.mealCount) {
    return (
      "Mình chưa thấy món nào trong nhật ký hôm nay. Sau khi bạn thêm món hoặc nhận diện ảnh món ăn, mình sẽ đánh giá tổng calo và macro cho bạn."
    );
  }

  return (
    "Hôm nay bạn đã ghi " +
    ctx.mealCount +
    " món, tổng khoảng " +
    formatNumber(ctx.totalCalo) +
    "/" +
    formatNumber(ctx.targetCalo) +
    " kcal (" +
    formatNumber(ctx.progress) +
    "% mục tiêu). " +
    getCalorieStatusText(ctx) +
    " " +
    getMacroAdvice(ctx)
  );
}

function getChatbotAnswer(question) {
  var rawQuestion = String(question || "").trim();
  var q = normalizeText(rawQuestion);
  var ctx = getNutritionContext();

  if (!rawQuestion) return "";

  if (q.includes("da an") || q.includes("nhat ky") || q.includes("mon nao")) {
    return (
      formatMealLogForChat() +
      " Tổng hôm nay: " +
      formatNumber(ctx.totalCalo) +
      " kcal, protein " +
      formatNumber(ctx.totalProtein) +
      "g, carb " +
      formatNumber(ctx.totalCarb) +
      "g, fat " +
      formatNumber(ctx.totalFat) +
      "g. " +
      getCalorieStatusText(ctx)
    );
  }

  if (
    q.includes("danh gia") ||
    q.includes("the nao") ||
    q.includes("on khong") ||
    q.includes("hom nay")
  ) {
    return getDiaryReview(ctx) + " " + getGoalBasedSuggestion(ctx);
  }

  if (q.includes("con bao nhieu") || q.includes("con lai") || q.includes("calo") || q.includes("kcal")) {
    return (
      "Bạn đã nạp khoảng " +
      formatNumber(ctx.totalCalo) +
      " kcal trên mục tiêu " +
      formatNumber(ctx.targetCalo) +
      " kcal. " +
      getCalorieStatusText(ctx)
    );
  }

  if (q.includes("protein") || q.includes("carb") || q.includes("fat") || q.includes("macro")) {
    return getMacroAdvice(ctx);
  }

  if (q.includes("bmi") || q.includes("bmr") || q.includes("tdee") || q.includes("ho so")) {
    if (!ctx.bmi) {
      return "Bạn chưa có dữ liệu hồ sơ sức khỏe. Hãy nhập chiều cao, cân nặng, tuổi, giới tính và bấm tính chỉ số trước.";
    }
    return (
      ctx.name +
      ", BMI hiện tại là " +
      ctx.bmi.toFixed(2) +
      " (" +
      ctx.bmiStatus +
      "), BMR khoảng " +
      formatNumber(ctx.bmr) +
      " kcal, TDEE khoảng " +
      formatNumber(ctx.tdee) +
      " kcal, calo mục tiêu khoảng " +
      formatNumber(ctx.targetCalo) +
      " kcal/ngày. " +
      getGoalBasedSuggestion(ctx)
    );
  }

  if (
    q.includes("an gi") ||
    q.includes("goi y") ||
    q.includes("bua sang") ||
    q.includes("bua trua") ||
    q.includes("bua toi") ||
    q.includes("toi nay") ||
    q.includes("trua nay")
  ) {
    return getMealSuggestion(ctx, q) + " " + getGoalBasedSuggestion(ctx);
  }

  if (q.includes("giam can") || q.includes("tang can") || q.includes("tang co") || q.includes("giu can")) {
    return (
      getGoalBasedSuggestion(ctx) +
      " Dựa trên nhật ký hôm nay, bạn đang ở mức " +
      formatNumber(ctx.totalCalo) +
      "/" +
      formatNumber(ctx.targetCalo) +
      " kcal. " +
      getCalorieStatusText(ctx)
    );
  }

  if (q.includes("mon vua nhan dien") || q.includes("nhan dien")) {
    if (!latestPredictedFood) {
      return "Bạn chưa có món nào vừa được nhận diện. Hãy upload ảnh ở mục Nhận diện món ăn trước, sau đó mình có thể giúp đánh giá món đó trong ngày.";
    }
    return (
      "Món vừa nhận diện là " +
      latestPredictedFood.name +
      ", khoảng " +
      formatNumber(latestPredictedFood.calo) +
      " kcal, protein " +
      formatNumber(latestPredictedFood.protein) +
      "g, carb " +
      formatNumber(latestPredictedFood.carb) +
      "g, fat " +
      formatNumber(latestPredictedFood.fat) +
      "g. Nếu thêm vào nhật ký, tổng ngày sẽ là khoảng " +
      formatNumber(ctx.totalCalo + latestPredictedFood.calo) +
      " kcal."
    );
  }

  return (
    "Mình đang đọc theo hồ sơ và nhật ký của bạn: mục tiêu " +
    ctx.goal.toLowerCase() +
    ", hôm nay đã ghi " +
    ctx.mealCount +
    " món, tổng " +
    formatNumber(ctx.totalCalo) +
    "/" +
    formatNumber(ctx.targetCalo) +
    " kcal. Bạn có thể hỏi: 'hôm nay tôi ăn thế nào?', 'tôi còn bao nhiêu calo?', 'bữa tối nên ăn gì?', hoặc 'protein hôm nay đủ chưa?'."
  );
}

function makeChatCard(title, summary, bullets, note, actions) {
  return {
    title: title,
    summary: summary,
    bullets: bullets || [],
    note: note || "",
    actions: actions || [],
  };
}

function getRequestedGoal(q, fallbackGoal) {
  if (q.includes("giam can")) return "Giảm cân";
  if (q.includes("tang can")) return "Tăng cân";
  if (q.includes("tang co") || q.includes("protein")) return "Tăng cơ";
  if (q.includes("giu can")) return "Giữ cân";
  return fallbackGoal || "Giữ cân";
}

function getGoalMealIdeas(goal) {
  if (goal === "Giảm cân") {
    return [
      "Bữa chính: cơm gạo lứt hoặc khoai lang + ức gà/cá/đậu hũ + nhiều rau.",
      "Bữa phụ: sữa chua không đường, táo, chuối nhỏ hoặc trứng luộc.",
      "Hạn chế: trà sữa, nước ngọt, gà rán, bánh ngọt, khoai tây chiên.",
    ];
  }

  if (goal === "Tăng cân") {
    return [
      "Bữa chính: cơm trắng/cơm chiên vừa phải + thịt/cá/trứng + rau + thêm canh.",
      "Bữa phụ: sữa + chuối, yến mạch + sữa, bánh mì trứng hoặc sữa chua + hạt.",
      "Mẹo: chia 4-5 bữa/ngày để tăng calo dễ hơn mà không bị quá no.",
    ];
  }

  if (goal === "Tăng cơ") {
    return [
      "Mỗi bữa nên có nguồn đạm rõ ràng: ức gà, cá, trứng, bò, sữa, đậu hũ.",
      "Thêm carb tốt quanh buổi tập: cơm, khoai lang, yến mạch hoặc chuối.",
      "Sau tập nên có protein + carb, ví dụ sữa + chuối hoặc cơm + thịt nạc.",
    ];
  }

  return [
    "Bữa chính: tinh bột vừa đủ + đạm + rau, tránh để một nhóm chất áp đảo.",
    "Bữa phụ: trái cây, sữa chua, sữa tươi hoặc trứng tùy lượng calo còn lại.",
    "Ưu tiên giữ tổng calo gần mục tiêu và theo dõi macro trong nhật ký.",
  ];
}

function getMenuAction(goal) {
  return [{ label: "Xem gợi ý thực đơn", action: "menu-suggest", goal: goal || userProfile.goal }];
}

function getBetterMealSuggestion(ctx, q) {
  var goal = getRequestedGoal(q, ctx.goal);
  var mealTime = "bữa tiếp theo";
  if (q.includes("sang")) mealTime = "bữa sáng";
  if (q.includes("trua")) mealTime = "bữa trưa";
  if (q.includes("toi")) mealTime = "bữa tối";

  var summary =
    "Mục tiêu đang hỏi: " +
    goal +
    ". Nhật ký hôm nay: " +
    formatNumber(ctx.totalCalo) +
    "/" +
    formatNumber(ctx.targetCalo) +
    " kcal, còn khoảng " +
    formatNumber(ctx.remaining) +
    " kcal.";

  var bullets = getGoalMealIdeas(goal);
  if (ctx.remaining <= 0) {
    bullets.unshift(
      "Bạn đã vượt hoặc chạm mục tiêu hôm nay, nên chọn món nhẹ cho " +
        mealTime +
        ": canh, rau, cá hấp, đậu hũ hoặc sữa chua không đường."
    );
  } else if (ctx.remaining < 350) {
    bullets.unshift(
      "Vì chỉ còn khoảng " +
        formatNumber(ctx.remaining) +
        " kcal, " +
        mealTime +
        " nên gọn: trứng/đậu hũ/cá + rau, hạn chế món chiên."
    );
  } else {
    bullets.unshift(
      "Cho " +
        mealTime +
        ", bạn còn đủ calo để ăn một bữa có tinh bột + protein + rau."
    );
  }

  var note =
    goal !== ctx.goal
      ? "Lưu ý: hồ sơ hiện đang đặt mục tiêu " +
        ctx.goal +
        ". Nếu bạn thật sự muốn theo " +
        goal.toLowerCase() +
        ", hãy đổi mục tiêu trong Hồ sơ sức khỏe để calo mục tiêu khớp hơn."
      : "Bạn có thể mở trang Gợi ý thực đơn để xem kế hoạch theo mục tiêu hiện tại.";

  return makeChatCard("Gợi ý ăn uống", summary, bullets, note, getMenuAction(goal));
}

function getBetterDiaryReview(ctx) {
  if (!ctx.mealCount) {
    return makeChatCard(
      "Chưa có dữ liệu nhật ký",
      "Mình chưa thấy món nào trong nhật ký hôm nay.",
      [
        "Hãy thêm món thủ công ở Nhật ký ăn uống hoặc nhận diện món qua ảnh.",
        "Sau khi có dữ liệu, mình sẽ đánh giá calo, protein, carb, fat và bữa tiếp theo nên ăn gì.",
      ],
      "Bạn có thể bắt đầu bằng cách thêm bữa sáng hoặc upload ảnh món ăn.",
      [
        { label: "Mở nhật ký", action: "diary" },
        { label: "Nhận diện món ăn", action: "recognition" },
      ]
    );
  }

  return makeChatCard(
    "Đánh giá hôm nay",
    "Bạn đã ghi " +
      ctx.mealCount +
      " món, đạt khoảng " +
      formatNumber(ctx.progress) +
      "% mục tiêu calo.",
    [
      "Calo: " +
        formatNumber(ctx.totalCalo) +
        "/" +
        formatNumber(ctx.targetCalo) +
        " kcal, còn khoảng " +
        formatNumber(ctx.remaining) +
        " kcal.",
      "Macro: protein " +
        formatNumber(ctx.totalProtein) +
        "g, carb " +
        formatNumber(ctx.totalCarb) +
        "g, fat " +
        formatNumber(ctx.totalFat) +
        "g.",
      ctx.latestMeal
        ? "Món gần nhất: " +
          ctx.latestMeal.name +
          " (" +
          formatNumber(ctx.latestMeal.calo) +
          " kcal)."
        : "Chưa có món gần nhất.",
      getGoalBasedSuggestion(ctx),
    ],
    getCalorieStatusText(ctx),
    getMenuAction()
  );
}

function getBetterMacroAnswer(ctx) {
  var bullets = [
    "Protein: " + formatNumber(ctx.totalProtein) + "g.",
    "Carb: " + formatNumber(ctx.totalCarb) + "g.",
    "Fat: " + formatNumber(ctx.totalFat) + "g.",
  ];

  if (ctx.totalProtein < 45) {
    bullets.push("Nên thêm protein: trứng, cá, ức gà, đậu hũ, sữa chua hoặc thịt nạc.");
  } else {
    bullets.push("Protein hiện khá ổn, tiếp tục giữ nguồn đạm sạch ở các bữa sau.");
  }

  if (ctx.totalFat > 70) {
    bullets.push("Fat hơi cao, bữa sau nên giảm món chiên, sốt béo và đồ ăn nhanh.");
  }

  return makeChatCard(
    "Tổng macro hôm nay",
    "Dựa trên các món đang có trong nhật ký.",
    bullets,
    "Nếu muốn tối ưu theo mục tiêu, xem thêm thực đơn gợi ý.",
    getMenuAction()
  );
}

function getBetterProfileAnswer(ctx) {
  if (!ctx.bmi) {
    return makeChatCard(
      "Chưa có hồ sơ sức khỏe",
      "Bạn cần nhập thông tin cơ bản trước khi mình đánh giá chính xác.",
      [
        "Cần có: tuổi, giới tính, chiều cao, cân nặng, mức vận động và mục tiêu.",
        "Sau khi tính, mình sẽ dùng BMI, BMR, TDEE và calo mục tiêu để tư vấn.",
      ],
      "Mở Hồ sơ sức khỏe để cập nhật thông tin.",
      [{ label: "Mở hồ sơ", action: "profile" }]
    );
  }

  return makeChatCard(
    "Chỉ số sức khỏe của bạn",
    ctx.name + ", đây là dữ liệu mình đang dùng để tư vấn.",
    [
      "BMI: " + ctx.bmi.toFixed(2) + " - " + ctx.bmiStatus + ".",
      "BMR: khoảng " + formatNumber(ctx.bmr) + " kcal/ngày.",
      "TDEE: khoảng " + formatNumber(ctx.tdee) + " kcal/ngày.",
      "Calo mục tiêu: khoảng " + formatNumber(ctx.targetCalo) + " kcal/ngày.",
    ],
    getGoalBasedSuggestion(ctx),
    getMenuAction()
  );
}

function getMentionedFoodGroups(q) {
  var groups = {
    carb: false,
    protein: false,
    vegetable: false,
    fruit: false,
    dairy: false,
    fried: false,
  };

  if (
    q.includes("com") ||
    q.includes("bun") ||
    q.includes("pho") ||
    q.includes("mi") ||
    q.includes("banh mi") ||
    q.includes("khoai") ||
    q.includes("yen mach")
  ) {
    groups.carb = true;
  }

  if (
    q.includes("ca") ||
    q.includes("ga") ||
    q.includes("thit") ||
    q.includes("bo") ||
    q.includes("trung") ||
    q.includes("dau hu") ||
    q.includes("tom") ||
    q.includes("hai san")
  ) {
    groups.protein = true;
  }

  if (
    q.includes("rau") ||
    q.includes("salad") ||
    q.includes("canh") ||
    q.includes("dua leo") ||
    q.includes("ca chua")
  ) {
    groups.vegetable = true;
  }

  if (
    q.includes("chuoi") ||
    q.includes("tao") ||
    q.includes("trai cay") ||
    q.includes("cam") ||
    q.includes("dua hau")
  ) {
    groups.fruit = true;
  }

  if (q.includes("sua") || q.includes("sua chua") || q.includes("yaourt")) {
    groups.dairy = true;
  }

  if (q.includes("chien") || q.includes("ran") || q.includes("khoai tay chien")) {
    groups.fried = true;
  }

  return groups;
}

function hasMealCompositionQuestion(q) {
  return (
    q.includes("bo sung") ||
    q.includes("them gi") ||
    q.includes("can them") ||
    q.includes("thieu gi") ||
    q.includes("du chua") ||
    q.includes("can bo sung") ||
    q.includes("an kem") ||
    q.includes("an voi")
  );
}

function getMealCompositionAdvice(ctx, q) {
  var groups = getMentionedFoodGroups(q);
  var bullets = [];

  if (groups.carb && groups.protein) {
    bullets.push("Bữa này đã có nền khá ổn: tinh bột + protein.");
  } else if (groups.carb) {
    bullets.push("Bạn mới nhắc đến tinh bột; nên thêm nguồn đạm như cá, trứng, ức gà, đậu hũ hoặc thịt nạc.");
  } else if (groups.protein) {
    bullets.push("Bạn mới nhắc đến protein; nếu còn đói có thể thêm một phần tinh bột vừa phải như cơm, khoai hoặc bún.");
  }

  if (!groups.vegetable) {
    bullets.push("Nên bổ sung rau/canh: rau luộc, salad, dưa leo, cà chua hoặc canh rau để thêm chất xơ.");
  } else {
    bullets.push("Bạn đã có rau/canh, giữ khẩu phần rau khoảng 1-2 nắm tay là ổn.");
  }

  if (!groups.fruit && !groups.dairy) {
    bullets.push("Nếu cần bữa phụ sau đó: chọn trái cây hoặc sữa chua không đường thay vì đồ ngọt.");
  }

  if (groups.fried) {
    bullets.push("Vì có món chiên/rán, bữa tiếp theo nên giảm dầu mỡ và ưu tiên hấp/luộc/áp chảo ít dầu.");
  }

  if (ctx.remaining < 300) {
    bullets.push("Bạn chỉ còn khoảng " + formatNumber(ctx.remaining) + " kcal, nên bổ sung nhẹ, tránh thêm cơm hoặc món chiên nhiều.");
  } else {
    bullets.push("Bạn còn khoảng " + formatNumber(ctx.remaining) + " kcal, vẫn có thể thêm rau/canh và một bữa phụ nhỏ nếu đói.");
  }

  return makeChatCard(
    "Nên bổ sung gì cho bữa này?",
    "Mình phân tích theo món bạn vừa nhắc và nhật ký hôm nay.",
    bullets,
    "Gợi ý nhanh: nếu bạn ăn cơm với cá, hãy thêm rau/canh; nếu vẫn thiếu năng lượng thì thêm trái cây hoặc sữa chua không đường.",
    getMenuAction()
  );
}

function hasFoodStatement(q) {
  return (
    q.includes("toi an") ||
    q.includes("minh an") ||
    q.includes("vua an") ||
    q.includes("hom nay toi an") ||
    q.includes("hom nay minh an")
  );
}

function hasDiaryListQuestion(q) {
  return (
    q.includes("da an nhung mon nao") ||
    q.includes("an nhung mon nao") ||
    q.includes("toi da an") ||
    q.includes("hom nay da an") ||
    q.includes("nhat ky") ||
    q.includes("mon nao hom nay")
  );
}

function getDiaryListAnswer(ctx) {
  if (!mealLog.length) {
    return makeChatCard(
      "Nhật ký hôm nay",
      "Bạn chưa ghi món nào trong nhật ký.",
      [
        "Hãy thêm món thủ công hoặc dùng nhận diện ảnh món ăn.",
        "Sau khi có dữ liệu, mình sẽ tổng hợp calo và macro cho bạn.",
      ],
      "",
      [
        { label: "Mở nhật ký", action: "diary" },
        { label: "Nhận diện món ăn", action: "recognition" },
      ]
    );
  }

  var bullets = mealLog.map(function (meal, index) {
    var order = index + 1;
    return (
      order +
      ". " +
      meal.name +
      " - " +
      formatNumber(meal.calo) +
      " kcal, protein " +
      formatNumber(meal.protein) +
      "g, carb " +
      formatNumber(meal.carb) +
      "g, fat " +
      formatNumber(meal.fat) +
      "g."
    );
  });

  bullets.push(
    "Tổng: " +
      formatNumber(ctx.totalCalo) +
      "/" +
      formatNumber(ctx.targetCalo) +
      " kcal, protein " +
      formatNumber(ctx.totalProtein) +
      "g, carb " +
      formatNumber(ctx.totalCarb) +
      "g, fat " +
      formatNumber(ctx.totalFat) +
      "g."
  );

  return makeChatCard(
    "Bạn đã ăn hôm nay",
    "Mình lấy dữ liệu trực tiếp từ Nhật ký ăn uống.",
    bullets,
    getCalorieStatusText(ctx),
    [{ label: "Mở nhật ký", action: "diary" }]
  );
}

function getMentionedFoodName(q) {
  if (q.includes("banh mi")) return "Bánh mì thịt";

  var directFood = foodsData.find(function (food) {
    var name = normalizeText(food.name);
    return name && q.includes(name);
  });
  if (directFood) return directFood.name;

  if (q.includes("ga ran")) return "Gà rán";
  if (q.includes("ca hap") || q.includes("ca")) return "Cá hấp";
  if (q.includes("com")) return "Cơm trắng";
  if (q.includes("trung")) return "Trứng gà";
  if (q.includes("rau")) return "Rau luộc";
  if (q.includes("pho")) return "Phở bò";
  if (q.includes("hamburger")) return "Hamburger";
  if (q.includes("pizza")) return "Pizza";
  return "";
}

function getFoodStatementAdvice(ctx, q) {
  var foodName = getMentionedFoodName(q);
  var food = foodName ? findFoodByInput(foodName) : null;
  var groups = getMentionedFoodGroups(q);
  var bullets = [];

  if (food) {
    bullets.push(
      food.name +
        " khoảng " +
        formatNumber(food.calo) +
        " kcal, protein " +
        formatNumber(food.protein) +
        "g, carb " +
        formatNumber(food.carb) +
        "g, fat " +
        formatNumber(food.fat) +
        "g."
    );
  } else {
    bullets.push("Mình nhận ra bạn đang nói về một món vừa ăn, nhưng món này chưa khớp rõ với dữ liệu dinh dưỡng nội bộ.");
  }

  if (groups.fried || (food && food.fit === "Hạn chế")) {
    bullets.push("Đây là món nên hạn chế nếu đang kiểm soát cân nặng vì thường nhiều dầu mỡ và dễ làm tăng calo.");
    bullets.push("Bữa này nên cân bằng lại bằng rau/canh, dưa leo, cà chua hoặc salad không sốt béo.");
    bullets.push("Bữa tiếp theo nên chọn món hấp/luộc/áp chảo ít dầu như cá hấp, đậu hũ, trứng luộc hoặc ức gà.");
  } else if (groups.protein && !groups.vegetable) {
    bullets.push("Món này có protein; nên thêm rau/canh để đủ chất xơ và đỡ ngán.");
  } else if (groups.carb && !groups.protein) {
    bullets.push("Bạn nên thêm nguồn đạm như cá, trứng, gà, đậu hũ hoặc thịt nạc để bữa ăn cân bằng hơn.");
  } else {
    bullets.push("Nếu bữa này chưa có rau, hãy thêm một phần rau/canh để cân bằng vi chất và chất xơ.");
  }

  var estimatedTotal = ctx.totalCalo + (food ? food.calo : 0);
  bullets.push(
    "Nếu món này chưa nằm trong nhật ký, tổng ngày sau khi thêm sẽ khoảng " +
      formatNumber(estimatedTotal) +
      "/" +
      formatNumber(ctx.targetCalo) +
      " kcal."
  );

  return makeChatCard(
    food ? "Đánh giá món vừa ăn: " + food.name : "Đánh giá món vừa ăn",
    "Mình phân tích theo món bạn vừa nhắc, không chỉ tổng kết nhật ký.",
    bullets,
    "Nếu bạn đã ăn món này thật, hãy thêm vào nhật ký để dashboard và chatbot tính chính xác hơn.",
    [
      { label: "Mở nhật ký", action: "diary" },
      { label: "Xem gợi ý thực đơn", action: "menu-suggest", goal: ctx.goal },
    ]
  );
}

function getChatbotAnswer(question) {
  var rawQuestion = String(question || "").trim();
  var q = normalizeText(rawQuestion);
  var ctx = getNutritionContext();

  if (!rawQuestion) return "";

  if (hasDiaryListQuestion(q)) {
    return getDiaryListAnswer(ctx);
  }

  if (hasMealCompositionQuestion(q)) {
    return getMealCompositionAdvice(ctx, q);
  }

  if (hasFoodStatement(q)) {
    return getFoodStatementAdvice(ctx, q);
  }

  if (
    q.includes("an gi") ||
    q.includes("goi y") ||
    q.includes("bua sang") ||
    q.includes("bua trua") ||
    q.includes("bua toi") ||
    q.includes("toi nay") ||
    q.includes("trua nay") ||
    q.includes("giam can") ||
    q.includes("tang can") ||
    q.includes("tang co") ||
    q.includes("giu can")
  ) {
    return getBetterMealSuggestion(ctx, q);
  }

  if (q.includes("da an") || q.includes("nhat ky") || q.includes("mon nao") || q.includes("hom nay") || q.includes("danh gia")) {
    return getBetterDiaryReview(ctx);
  }

  if (q.includes("con bao nhieu") || q.includes("con lai") || q.includes("calo") || q.includes("kcal")) {
    return makeChatCard(
      "Calo còn lại",
      "Mình tính từ nhật ký ăn uống hiện tại.",
      [
        "Đã nạp: " + formatNumber(ctx.totalCalo) + " kcal.",
        "Mục tiêu: " + formatNumber(ctx.targetCalo) + " kcal.",
        "Còn lại: " + formatNumber(ctx.remaining) + " kcal.",
      ],
      getCalorieStatusText(ctx),
      getMenuAction()
    );
  }

  if (q.includes("protein") || q.includes("carb") || q.includes("fat") || q.includes("macro")) {
    return getBetterMacroAnswer(ctx);
  }

  if (q.includes("bmi") || q.includes("bmr") || q.includes("tdee") || q.includes("ho so")) {
    return getBetterProfileAnswer(ctx);
  }

  if (q.includes("mon vua nhan dien") || q.includes("nhan dien")) {
    if (!latestPredictedFood) {
      return makeChatCard(
        "Chưa có món vừa nhận diện",
        "Bạn cần upload ảnh ở mục Nhận diện món ăn trước.",
        [
          "Sau khi nhận diện, mình sẽ biết tên món, calo và macro.",
          "Bạn có thể hỏi mình có nên thêm món đó vào nhật ký không.",
        ],
        "",
        [{ label: "Mở nhận diện món ăn", action: "recognition" }]
      );
    }

    return makeChatCard(
      "Món vừa nhận diện",
      latestPredictedFood.name,
      [
        "Calo: khoảng " + formatNumber(latestPredictedFood.calo) + " kcal.",
        "Protein: " + formatNumber(latestPredictedFood.protein) + "g.",
        "Carb: " + formatNumber(latestPredictedFood.carb) + "g.",
        "Fat: " + formatNumber(latestPredictedFood.fat) + "g.",
        "Nếu thêm vào nhật ký, tổng ngày sẽ khoảng " +
          formatNumber(ctx.totalCalo + latestPredictedFood.calo) +
          " kcal.",
      ],
      "Dùng nút Thêm vào nhật ký ở phần nhận diện nếu bạn đã ăn món này.",
      [{ label: "Mở nhật ký", action: "diary" }]
    );
  }

  return makeChatCard(
    "Mình có thể tư vấn theo dữ liệu của bạn",
    "Hiện mình đang đọc hồ sơ sức khỏe và nhật ký ăn uống trong app.",
    [
      "Hỏi: Hôm nay tôi ăn thế nào?",
      "Hỏi: Tôi còn bao nhiêu calo?",
      "Hỏi: Tôi muốn tăng cân thì ăn gì?",
      "Hỏi: Protein hôm nay đủ chưa?",
    ],
    "Câu trả lời sẽ chính xác hơn khi nhật ký ăn uống có đủ các bữa trong ngày.",
    getMenuAction()
  );
}

async function calculateHealthWithAI() {
  const data = {
    age: Number(document.getElementById("age").value),
    gender: document.getElementById("gender").value,
    height_cm: Number(document.getElementById("height").value),
    weight_kg: Number(document.getElementById("weight").value),
    activity: document.getElementById("activity").value,
    goal: document.getElementById("goal").value,
  };

  const response = await fetch("/api/health", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  document.getElementById("bmiValue").textContent = result.bmi;
  document.getElementById("bmrValue").textContent = result.bmr + " kcal";
  document.getElementById("tdeeValue").textContent = result.tdee + " kcal";
  document.getElementById("targetCaloriesValue").textContent =
    result.target_calories + " kcal";
}
const calculateHealthBtn = document.getElementById("calculateHealthBtn");
if (calculateHealthBtn) {
  calculateHealthBtn.addEventListener("click", calculateHealthWithAI);
}
async function generateMenuWithAI() {
  const data = {
    age: Number(document.getElementById("age").value),
    gender: document.getElementById("gender").value,
    height_cm: Number(document.getElementById("height").value),
    weight_kg: Number(document.getElementById("weight").value),
    activity: document.getElementById("activity").value,
    goal: document.getElementById("goal").value,
  };

  const response = await fetch("/api/menu", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  console.log(result);

  const menu = result.menu;

  document.getElementById("breakfastText").textContent =
    menu["Bữa sáng"].name + " - " + menu["Bữa sáng"].calories + " kcal";

  document.getElementById("lunchText").textContent =
    menu["Bữa trưa"].name + " - " + menu["Bữa trưa"].calories + " kcal";

  document.getElementById("dinnerText").textContent =
    menu["Bữa tối"].name + " - " + menu["Bữa tối"].calories + " kcal";

  document.getElementById("menuAdvice").textContent = result.ai_explanation;
}
