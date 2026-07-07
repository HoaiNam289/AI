// ===========================
// NutriCare AI - Script
// Tất cả logic xử lý bằng JavaScript thuần
// ===========================

// --- DỮ LIỆU MÓN ĂN MẪU ---
const foodsData = [
  { name: "Cơm trắng", calo: 130, protein: 2.7, carb: 28, fat: 0.3, group: "Tinh bột", fit: "Giữ cân" },
  { name: "Ức gà luộc", calo: 165, protein: 31, carb: 0, fat: 3.6, group: "Đạm", fit: "Giảm cân" },
  { name: "Trứng gà", calo: 155, protein: 13, carb: 1.1, fat: 11, group: "Đạm", fit: "Tăng cơ" },
  { name: "Rau luộc", calo: 50, protein: 2, carb: 8, fat: 0.5, group: "Rau", fit: "Giảm cân" },
  { name: "Salad ức gà", calo: 280, protein: 28, carb: 15, fat: 8, group: "Healthy", fit: "Giảm cân" },
  { name: "Khoai lang", calo: 120, protein: 1.6, carb: 27, fat: 0.1, group: "Tinh bột", fit: "Giảm cân" },
  { name: "Yến mạch", calo: 389, protein: 16.9, carb: 66, fat: 6.9, group: "Tinh bột", fit: "Giảm cân" },
  { name: "Chuối", calo: 89, protein: 1.1, carb: 23, fat: 0.3, group: "Trái cây", fit: "Giữ cân" },
  { name: "Táo", calo: 52, protein: 0.3, carb: 14, fat: 0.2, group: "Trái cây", fit: "Giảm cân" },
  { name: "Sữa chua không đường", calo: 60, protein: 4, carb: 5, fat: 3, group: "Sữa", fit: "Giảm cân" },
  { name: "Cá hồi áp chảo", calo: 208, protein: 20, carb: 0, fat: 13, group: "Đạm", fit: "Tăng cơ" },
  { name: "Thịt bò áp chảo", calo: 250, protein: 26, carb: 0, fat: 15, group: "Đạm", fit: "Tăng cơ" },
  { name: "Cơm gạo lứt", calo: 111, protein: 2.6, carb: 23, fat: 0.9, group: "Tinh bột", fit: "Giảm cân" },
  { name: "Bánh mì trứng", calo: 450, protein: 16, carb: 55, fat: 18, group: "Đồ ăn nhanh", fit: "Giữ cân" },
  { name: "Phở bò", calo: 430, protein: 25, carb: 55, fat: 12, group: "Món Việt", fit: "Giữ cân" },
  { name: "Bún bò Huế", calo: 550, protein: 28, carb: 65, fat: 18, group: "Món Việt", fit: "Giữ cân" },
  { name: "Cơm tấm sườn", calo: 700, protein: 30, carb: 85, fat: 25, group: "Món Việt", fit: "Tăng cân" },
  { name: "Gà rán", calo: 600, protein: 28, carb: 35, fat: 38, group: "Đồ ăn nhanh", fit: "Hạn chế" },
  { name: "Mì tôm", calo: 380, protein: 8, carb: 55, fat: 14, group: "Đồ ăn nhanh", fit: "Hạn chế" },
  { name: "Trà sữa", calo: 450, protein: 4, carb: 60, fat: 15, group: "Đồ ngọt", fit: "Hạn chế" },
  { name: "Nước ngọt có gas", calo: 140, protein: 0, carb: 35, fat: 0, group: "Đồ ngọt", fit: "Hạn chế" },
  { name: "Bánh ngọt", calo: 350, protein: 5, carb: 50, fat: 15, group: "Đồ ngọt", fit: "Hạn chế" },
  { name: "Cá hấp", calo: 160, protein: 25, carb: 0, fat: 5, group: "Đạm", fit: "Giảm cân" },
  { name: "Đậu hũ", calo: 76, protein: 8, carb: 2, fat: 4.8, group: "Đạm", fit: "Giảm cân" },
  { name: "Sữa tươi không đường", calo: 62, protein: 3.4, carb: 5, fat: 3.3, group: "Sữa", fit: "Tăng cơ" },
  { name: "Cơm chiên", calo: 520, protein: 14, carb: 70, fat: 18, group: "Món chính", fit: "Giữ cân" },
  { name: "Mì ramen", calo: 480, protein: 18, carb: 62, fat: 16, group: "Món nước", fit: "Giữ cân" },
  { name: "Pizza", calo: 285, protein: 12, carb: 36, fat: 10, group: "Đồ ăn nhanh", fit: "Hạn chế" },
  { name: "Sushi", calo: 300, protein: 14, carb: 45, fat: 6, group: "Món Nhật", fit: "Giữ cân" },
  { name: "Hamburger", calo: 550, protein: 25, carb: 45, fat: 30, group: "Đồ ăn nhanh", fit: "Hạn chế" },
  { name: "Kem", calo: 210, protein: 3.5, carb: 24, fat: 11, group: "Đồ ngọt", fit: "Hạn chế" },
  { name: "Bánh donut", calo: 350, protein: 4, carb: 45, fat: 18, group: "Đồ ngọt", fit: "Hạn chế" },
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
  if (bmi < 18.5) return { status: "Thiếu cân", advice: "Bạn nên tăng lượng calo và bổ sung thực phẩm giàu dinh dưỡng." };
  if (bmi < 25) return { status: "Bình thường", advice: "Chỉ số BMI của bạn đang ở mức tốt. Hãy duy trì chế độ ăn cân bằng." };
  if (bmi < 30) return { status: "Thừa cân", advice: "Bạn nên kiểm soát calo, giảm đồ ngọt và tăng vận động." };
  return { status: "Béo phì", advice: "Bạn nên xây dựng chế độ ăn nghiêm túc hơn và theo dõi sức khỏe thường xuyên." };
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
  var heightCm = parseFloat(document.getElementById("inputHeight").value) || 170;
  var age = parseInt(document.getElementById("inputAge").value) || 21;
  var gender = document.getElementById("inputGender").value;
  var actFactor = parseFloat(document.getElementById("inputActivity").value) || 1.55;
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
    document.getElementById("inputActivity").value = profile.activityFactor || 1.55;
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
  document.getElementById("resultBMR").textContent = Math.round(userProfile.bmr) + " kcal";
  document.getElementById("resultTDEE").textContent = Math.round(userProfile.tdee) + " kcal";
  document.getElementById("resultTarget").textContent = Math.round(userProfile.targetCalo) + " kcal";
  document.getElementById("resultAdvice").textContent = "💡 " + userProfile.bmiAdvice;
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

    document.getElementById("resultBMI").textContent = userProfile.bmi.toFixed(2);
    document.getElementById("resultStatus").textContent = userProfile.bmiStatus;
    document.getElementById("resultBMR").textContent = Math.round(userProfile.bmr) + " kcal";
    document.getElementById("resultTDEE").textContent = Math.round(userProfile.tdee) + " kcal";
    document.getElementById("resultTarget").textContent = Math.round(userProfile.targetCalo) + " kcal";
    document.getElementById("resultAdvice").textContent = "💡 " + userProfile.bmiAdvice;

    // Cập nhật dashboard và thực đơn
    updateDashboard();
    updateMenuSuggest(userProfile.goal);

    // Cập nhật mục tiêu ở thực đơn
    document.getElementById("menuGoal").value = userProfile.goal;

    var statusEl = document.getElementById("profileSaveStatus");
    statusEl.textContent = "Đã lưu thông tin. Dashboard, chatbot và gợi ý thực đơn đã được cập nhật.";
    statusEl.className = "form-status success";
  });
}

// ===========================
// DASHBOARD
// ===========================
function updateDashboard() {
  var totalCalo = getTotalCalo();
  var remaining = userProfile.targetCalo - totalCalo;
  var progress = userProfile.targetCalo > 0 ? Math.min(totalCalo / userProfile.targetCalo, 1) : 0;

  // Cập nhật card
  document.getElementById("dash-bmi").textContent = userProfile.bmi > 0 ? userProfile.bmi.toFixed(2) : "--";
  document.getElementById("dash-bmi-status").textContent = userProfile.bmiStatus || "Chưa có dữ liệu";
  document.getElementById("dash-status").textContent = userProfile.bmiStatus || "--";
  document.getElementById("dash-bmr").textContent = userProfile.bmr > 0 ? Math.round(userProfile.bmr) + " kcal" : "-- kcal";
  document.getElementById("dash-tdee").textContent = userProfile.tdee > 0 ? Math.round(userProfile.tdee) + " kcal" : "-- kcal";
  document.getElementById("dash-target").textContent = userProfile.targetCalo > 0 ? Math.round(userProfile.targetCalo) + " kcal" : "-- kcal";
  document.getElementById("dash-consumed").textContent = Math.round(totalCalo) + " kcal";
  document.getElementById("dash-remaining").textContent = Math.round(remaining) + " kcal";

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

  document.getElementById("dash-progress-text").textContent = progressPercent + "% calo mục tiêu";

  var totalProtein = getTotalNutrient("protein");
  var totalCarb = getTotalNutrient("carb");
  var totalFat = getTotalNutrient("fat");
  var macroMax = Math.max(totalProtein, totalCarb, totalFat, 1);

  document.getElementById("dash-meal-count").textContent = mealLog.length + " món";
  document.getElementById("dash-protein").textContent = Math.round(totalProtein) + "g";
  document.getElementById("dash-carb").textContent = Math.round(totalCarb) + "g";
  document.getElementById("dash-fat").textContent = Math.round(totalFat) + "g";
  document.getElementById("dash-protein-bar").style.width = Math.round((totalProtein / macroMax) * 100) + "%";
  document.getElementById("dash-carb-bar").style.width = Math.round((totalCarb / macroMax) * 100) + "%";
  document.getElementById("dash-fat-bar").style.width = Math.round((totalFat / macroMax) * 100) + "%";

  renderDashboardRecentMeals();

  // Cảnh báo
  var alertDiv = document.getElementById("dash-alert");

  if (totalCalo === 0) {
    alertDiv.innerHTML = '<div class="alert alert-info">📋 Bạn chưa ghi nhận bữa ăn nào hôm nay.</div>';
  } else if (totalCalo > userProfile.targetCalo + 300) {
    var over = Math.round(totalCalo - userProfile.targetCalo);
    alertDiv.innerHTML = '<div class="alert alert-danger">⚠️ Bạn đã vượt khoảng ' + over + ' kcal. Nên ăn nhẹ hơn ở bữa tiếp theo.</div>';
  } else if (totalCalo > userProfile.targetCalo) {
    var over2 = Math.round(totalCalo - userProfile.targetCalo);
    alertDiv.innerHTML = '<div class="alert alert-warning">⚠️ Bạn vượt nhẹ khoảng ' + over2 + ' kcal. Hãy hạn chế đồ ngọt và dầu mỡ.</div>';
  } else if (remaining <= 150) {
    alertDiv.innerHTML = '<div class="alert alert-success">✅ Lượng calo hôm nay khá phù hợp với mục tiêu.</div>';
  } else {
    alertDiv.innerHTML = '<div class="alert alert-success">✅ Bạn còn khoảng ' + Math.round(remaining) + ' kcal. Có thể bổ sung bữa ăn nhẹ lành mạnh.</div>';
  }
}

function renderDashboardRecentMeals() {
  var container = document.getElementById("dash-recent-meals");
  if (!container) return;

  if (mealLog.length === 0) {
    container.innerHTML = '<div class="recent-meal-empty">Chưa có món ăn nào trong nhật ký.</div>';
    return;
  }

  var recentItems = mealLog.slice(-4).reverse();
  container.innerHTML = recentItems.map(function (item) {
    return (
      '<div class="recent-meal-item">' +
        '<div>' +
          '<strong>' + item.name + '</strong>' +
          '<span>' + item.time + ' · ' + item.qty + ' phần</span>' +
        '</div>' +
        '<b>' + Math.round(item.calo) + ' kcal</b>' +
      '</div>'
    );
  }).join("");
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

  return foodsData.find(function (food) {
    var normalizedName = normalizeText(food.name);
    return normalizedName.includes(normalizedInput) || normalizedInput.includes(normalizedName);
  }) || null;
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
    box.textContent = "Chưa tìm thấy món này trong dữ liệu. Thử nhập: phở, cơm tấm, bánh mì, sushi, hamburger...";
    return null;
  }

  box.className = "diary-suggestion-box success";
  box.innerHTML =
    "<strong>Gợi ý phù hợp: " + food.name + "</strong>" +
    "<span>" + food.calo + " kcal · Protein " + food.protein + "g · Carb " + food.carb + "g · Fat " + food.fat + "g</span>";
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
      status.textContent = "Chưa tìm thấy món trong dữ liệu. Hãy chọn một món được gợi ý.";
      status.className = "form-status error";
      updateDiarySuggestion();
      return;
    }

    var now = new Date();
    var time = now.getHours().toString().padStart(2, "0") + ":" +
               now.getMinutes().toString().padStart(2, "0") + ":" +
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
  document.getElementById("btnClearDiary").addEventListener("click", function () {
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
      "<td>" + item.time + "</td>" +
      "<td>" + item.name + "</td>" +
      "<td>" + item.qty + "</td>" +
      "<td>" + item.calo + "</td>" +
      "<td>" + item.protein + "g</td>" +
      "<td>" + item.carb + "g</td>" +
      "<td>" + item.fat + "g</td>" +
      '<td><button class="btn btn-danger btn-sm" onclick="removeMeal(' + index + ')">✕</button></td>';
    tbody.appendChild(tr);
  });

  // Tổng
  document.getElementById("totalCalo").textContent = Math.round(getTotalCalo()) + " kcal";
  document.getElementById("totalProtein").textContent = Math.round(getTotalNutrient("protein")) + "g";
  document.getElementById("totalCarb").textContent = Math.round(getTotalNutrient("carb")) + "g";
  document.getElementById("totalFat").textContent = Math.round(getTotalNutrient("fat")) + "g";
}

// Xóa một món
function removeMeal(index) {
  mealLog.splice(index, 1);
  renderDiary();
  updateDashboard();
}

// Tổng calo
function getTotalCalo() {
  return mealLog.reduce(function (sum, item) { return sum + item.calo; }, 0);
}

// Tổng chất dinh dưỡng
function getTotalNutrient(key) {
  return mealLog.reduce(function (sum, item) { return sum + item[key]; }, 0);
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
  document.getElementById("btnRecognize").addEventListener("click", function () {
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
  var recognitionRules = [
    { keywords: ["burger", "hamburger", "ham-burger"], name: "Hamburger", confidence: 91.8 },
    { keywords: ["pho", "phobo", "pho-bo"], name: "Phở bò", confidence: 88.6 },
    { keywords: ["bunbo", "bun-bo", "hue"], name: "Bún bò Huế", confidence: 86.4 },
    { keywords: ["comtam", "com-tam", "suon"], name: "Cơm tấm sườn", confidence: 90.2 },
    { keywords: ["garan", "ga-ran", "fried-chicken", "chicken"], name: "Gà rán", confidence: 84.9 },
    { keywords: ["pizza"], name: "Pizza", confidence: 89.7 },
    { keywords: ["sushi"], name: "Sushi", confidence: 87.3 },
    { keywords: ["salad"], name: "Salad ức gà", confidence: 85.5 },
    { keywords: ["ramen", "mi-ramen"], name: "Mì ramen", confidence: 83.1 },
    { keywords: ["banhmi", "banh-mi", "banh", "bread", "sandwich", "baguette"], name: "Bánh mì trứng", confidence: 88.4 },
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
  var food = foodsData.find(function (f) { return f.name === result.name; });

  // Hiện kết quả
  document.getElementById("recognitionResult").style.display = "block";
  document.getElementById("recFood").textContent = result.name;
  document.getElementById("recConfidence").textContent = result.confidence.toFixed(1) + "%";

  if (food) {
    document.getElementById("recCalo").textContent = food.calo + " kcal";
    document.getElementById("recProtein").textContent = food.protein + "g";
    document.getElementById("recCarb").textContent = food.carb + "g";
    document.getElementById("recFat").textContent = food.fat + "g";

    // Nhận xét
    var commentEl = document.getElementById("recComment");
    if (food.fit === "Hạn chế") {
      commentEl.className = "alert alert-warning";
      commentEl.textContent = "⚠️ Món này nên hạn chế nếu bạn đang kiểm soát calo hoặc giảm cân.";
    } else if (food.fit === "Giảm cân") {
      commentEl.className = "alert alert-success";
      commentEl.textContent = "✅ Món này khá phù hợp với mục tiêu kiểm soát cân nặng.";
    } else if (food.fit === "Tăng cơ") {
      commentEl.className = "alert alert-info";
      commentEl.textContent = "💪 Món này giàu protein, phù hợp với người muốn tăng cơ.";
    } else {
      commentEl.className = "alert alert-info";
      commentEl.textContent = "ℹ️ Món này có thể dùng trong chế độ ăn cân bằng, chú ý khẩu phần.";
    }
  }
}

// ===========================
// GỢI Ý THỰC ĐƠN
// ===========================

// Dữ liệu thực đơn theo mục tiêu
var menuData = {
  "Giảm cân": {
    calories: "1.450 - 1.650 kcal",
    focus: "Ít calo",
    note: "Nhiều rau, đạm nạc, giảm đồ chiên ngọt",
    description: "Thực đơn ưu tiên món Việt dễ chuẩn bị, khẩu phần vừa phải và giàu chất xơ.",
    days: [
      { day: "Thứ 2", breakfast: "Yến mạch + chuối", lunch: "Cơm gạo lứt + ức gà + rau luộc", dinner: "Cá hấp + canh bí xanh", snack: "Sữa chua không đường", calo: "~1.520" },
      { day: "Thứ 3", breakfast: "Bánh mì trứng ốp la", lunch: "Bún thịt nạc + rau sống", dinner: "Đậu hũ sốt cà + salad", snack: "Táo", calo: "~1.480" },
      { day: "Thứ 4", breakfast: "Khoai lang + sữa tươi không đường", lunch: "Cơm trắng ít + cá kho + rau", dinner: "Ức gà áp chảo + súp rau", snack: "Chuối nhỏ", calo: "~1.560" },
      { day: "Thứ 5", breakfast: "Phở bò ít bánh", lunch: "Cơm gạo lứt + thịt bò xào rau", dinner: "Cá hấp + rau luộc", snack: "Sữa chua", calo: "~1.620" },
      { day: "Thứ 6", breakfast: "Trứng luộc + khoai lang", lunch: "Cơm trắng + đậu hũ + canh rau", dinner: "Salad ức gà", snack: "Táo", calo: "~1.430" },
      { day: "Thứ 7", breakfast: "Bún gà xé", lunch: "Cơm gạo lứt + cá hấp + rau", dinner: "Canh chua cá + rau", snack: "Sữa tươi không đường", calo: "~1.590" },
      { day: "Chủ nhật", breakfast: "Cháo yến mạch thịt bằm", lunch: "Gỏi cuốn + đậu hũ", dinner: "Ức gà + rau củ luộc", snack: "Chuối", calo: "~1.500" },
    ],
  },
  "Giữ cân": {
    calories: "1.850 - 2.100 kcal",
    focus: "Cân bằng",
    note: "Đủ tinh bột, đạm, rau và chất béo tốt",
    description: "Kế hoạch duy trì cân nặng với các bữa ăn quen thuộc, dễ theo dõi calo.",
    days: [
      { day: "Thứ 2", breakfast: "Bánh mì trứng + sữa tươi", lunch: "Cơm trắng + cá hấp + rau luộc", dinner: "Cơm gạo lứt + đậu hũ", snack: "Chuối", calo: "~1.900" },
      { day: "Thứ 3", breakfast: "Phở bò", lunch: "Cơm gà luộc + canh rau", dinner: "Bún thịt nướng ít mỡ", snack: "Sữa chua", calo: "~2.050" },
      { day: "Thứ 4", breakfast: "Xôi mặn phần nhỏ", lunch: "Cơm cá kho + rau xào", dinner: "Miến gà + rau", snack: "Táo", calo: "~1.980" },
      { day: "Thứ 5", breakfast: "Bún bò Huế phần nhỏ", lunch: "Cơm tấm sườn + rau", dinner: "Canh chua cá + cơm ít", snack: "Sữa tươi", calo: "~2.100" },
      { day: "Thứ 6", breakfast: "Yến mạch + chuối", lunch: "Cơm bò xào rau", dinner: "Đậu hũ + trứng + rau luộc", snack: "Sữa chua", calo: "~1.880" },
      { day: "Thứ 7", breakfast: "Bánh mì thịt nạc", lunch: "Cơm gạo lứt + ức gà", dinner: "Phở gà", snack: "Trái cây", calo: "~1.950" },
      { day: "Chủ nhật", breakfast: "Cháo thịt bằm", lunch: "Bún chả phần vừa", dinner: "Cá hấp + cơm + rau", snack: "Chuối", calo: "~2.000" },
    ],
  },
  "Tăng cân": {
    calories: "2.350 - 2.650 kcal",
    focus: "Tăng năng lượng",
    note: "Tăng khẩu phần, thêm bữa phụ giàu dinh dưỡng",
    description: "Thực đơn tăng cân lành mạnh, bổ sung thêm tinh bột, sữa và đạm trong ngày.",
    days: [
      { day: "Thứ 2", breakfast: "Bánh mì trứng + sữa + chuối", lunch: "Cơm tấm sườn + trứng", dinner: "Cơm bò áp chảo + canh", snack: "Sữa chua + hạt", calo: "~2.520" },
      { day: "Thứ 3", breakfast: "Phở bò + sữa tươi", lunch: "Cơm gà + rau + canh", dinner: "Mì Ý thịt bò", snack: "Chuối + sữa", calo: "~2.480" },
      { day: "Thứ 4", breakfast: "Xôi gà", lunch: "Cơm cá hồi + khoai lang", dinner: "Cơm thịt kho trứng", snack: "Bánh mì bơ đậu phộng", calo: "~2.620" },
      { day: "Thứ 5", breakfast: "Yến mạch + sữa + trứng", lunch: "Cơm sườn + rau", dinner: "Bún bò Huế", snack: "Sữa tươi + chuối", calo: "~2.560" },
      { day: "Thứ 6", breakfast: "Bánh mì thịt + sữa", lunch: "Cơm bò xào + trứng", dinner: "Cơm cá kho + canh", snack: "Sữa chua + trái cây", calo: "~2.430" },
      { day: "Thứ 7", breakfast: "Cơm chiên trứng", lunch: "Cơm gà xối mỡ phần vừa", dinner: "Lẩu cá + bún", snack: "Sinh tố chuối", calo: "~2.650" },
      { day: "Chủ nhật", breakfast: "Bún thịt nướng", lunch: "Cơm tấm sườn bì trứng", dinner: "Cơm bò + rau", snack: "Sữa + bánh mì", calo: "~2.600" },
    ],
  },
  "Tăng cơ": {
    calories: "2.100 - 2.400 kcal",
    focus: "Giàu protein",
    note: "Ưu tiên đạm nạc, carb tốt và bữa sau tập",
    description: "Kế hoạch tăng cơ tập trung protein từ ức gà, cá, trứng, bò và đậu hũ.",
    days: [
      { day: "Thứ 2", breakfast: "Yến mạch + 2 trứng + sữa", lunch: "Cơm gạo lứt + ức gà + rau", dinner: "Cá hồi + khoai lang", snack: "Sữa chua Hy Lạp", calo: "~2.180" },
      { day: "Thứ 3", breakfast: "Bánh mì trứng + sữa", lunch: "Cơm bò áp chảo + rau", dinner: "Ức gà + salad + cơm ít", snack: "Chuối + sữa", calo: "~2.250" },
      { day: "Thứ 4", breakfast: "Phở bò nhiều thịt", lunch: "Cơm cá hấp + đậu hũ", dinner: "Trứng chiên + rau + khoai", snack: "Sữa tươi", calo: "~2.160" },
      { day: "Thứ 5", breakfast: "Khoai lang + trứng luộc", lunch: "Cơm gà luộc + rau", dinner: "Thịt bò xào rau + cơm", snack: "Sữa chua + chuối", calo: "~2.220" },
      { day: "Thứ 6", breakfast: "Yến mạch + sữa + chuối", lunch: "Cơm cá hồi + rau", dinner: "Ức gà áp chảo + khoai", snack: "Trứng luộc", calo: "~2.120" },
      { day: "Thứ 7", breakfast: "Bún bò phần nhiều thịt", lunch: "Cơm gạo lứt + bò + rau", dinner: "Cá hấp + đậu hũ", snack: "Sữa protein", calo: "~2.350" },
      { day: "Chủ nhật", breakfast: "Bánh mì ốp la 2 trứng", lunch: "Cơm gà + canh rau", dinner: "Bít tết + khoai lang", snack: "Sữa chua", calo: "~2.300" },
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
  document.getElementById("menuWeeklyDescription").textContent = data.description;

  tbody.innerHTML = "";
  data.days.forEach(function (item) {
    var tr = document.createElement("tr");
    tr.innerHTML =
      "<td><strong>" + item.day + "</strong></td>" +
      "<td>" + item.breakfast + "</td>" +
      "<td>" + item.lunch + "</td>" +
      "<td>" + item.dinner + "</td>" +
      "<td>" + item.snack + "</td>" +
      '<td><span class="menu-calorie-pill">' + item.calo + " kcal</span></td>";
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

function appendChatMsg(text, type) {
  var container = document.getElementById("chatMessages");
  var div = document.createElement("div");
  div.className = "chat-msg " + type;
  div.textContent = text;
  container.appendChild(div);

  // Cuộn xuống cuối
  container.scrollTop = container.scrollHeight;
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
      return name + ", chỉ số BMI hiện tại của bạn là " + bmi.toFixed(2) +
        ", thuộc nhóm " + bmiStatus + ". " +
        "Với mục tiêu " + goal.toLowerCase() + ", bạn nên theo dõi lượng calo hằng ngày và duy trì chế độ ăn phù hợp.";
    }
    return "Bạn chưa nhập thông tin sức khỏe. Hãy vào mục 'Hồ sơ sức khỏe' để tính BMI nhé.";
  }

  if (q.includes("giảm cân")) {
    return "Để giảm cân, bạn nên tạo mức thâm hụt khoảng 300–500 kcal mỗi ngày. " +
      "Hạn chế trà sữa, nước ngọt, đồ chiên rán và tăng rau xanh, đạm nạc như ức gà, cá, trứng, đậu hũ. " +
      "Mức calo mục tiêu của bạn là khoảng " + Math.round(targetCalo) + " kcal/ngày.";
  }

  if (q.includes("tăng cân")) {
    return "Để tăng cân, bạn nên ăn cao hơn TDEE khoảng 300–500 kcal mỗi ngày. " +
      "Nên bổ sung cơm, khoai, yến mạch, thịt, cá, trứng, sữa và chia thành nhiều bữa nhỏ trong ngày.";
  }

  if (q.includes("tăng cơ") || q.includes("protein")) {
    return "Để tăng cơ, bạn cần ưu tiên protein. Các món phù hợp gồm ức gà, trứng, cá hồi, thịt bò, sữa, đậu hũ. " +
      "Nên kết hợp tập luyện và ngủ đủ giấc để cơ thể phục hồi tốt.";
  }

  if (q.includes("tối") || q.includes("bữa tối")) {
    if (remaining <= 0) {
      return "Hôm nay bạn đã gần đạt hoặc vượt calo mục tiêu. Bữa tối nên ăn nhẹ như rau luộc, salad, cá hấp " +
        "hoặc sữa chua không đường. Tránh cơm nhiều, đồ chiên và đồ ngọt.";
    }
    return "Bạn còn khoảng " + Math.round(remaining) + " kcal. " +
      "Bữa tối có thể chọn cá hấp, salad ức gà, rau luộc, đậu hũ hoặc một phần cơm gạo lứt vừa phải.";
  }

  if (q.includes("trà sữa") || q.includes("nước ngọt")) {
    return "Trà sữa và nước ngọt thường chứa nhiều đường, dễ làm vượt calo nhưng ít giá trị dinh dưỡng. " +
      "Nếu đang giảm cân, bạn nên hạn chế còn 1–2 lần/tuần hoặc chọn size nhỏ, ít đường.";
  }

  if (q.includes("thực đơn") || q.includes("ăn gì")) {
    return "Với mục tiêu " + goal.toLowerCase() + ", bạn có thể tham khảo: " +
      "sáng ăn yến mạch hoặc bánh mì trứng, trưa ăn cơm gạo lứt với ức gà và rau, " +
      "tối ăn cá hấp hoặc salad. Bữa phụ có thể dùng chuối, táo hoặc sữa chua không đường.";
  }

  if (q.includes("calo") || q.includes("kcal")) {
    if (totalCalo > 0) {
      return "Hôm nay bạn đã nạp " + Math.round(totalCalo) + " kcal, " +
        "mục tiêu là " + Math.round(targetCalo) + " kcal. " +
        (remaining > 0 ? "Còn lại khoảng " + Math.round(remaining) + " kcal." : "Bạn đã vượt mục tiêu!");
    }
    return "Bạn chưa ghi nhận bữa ăn nào hôm nay. Hãy vào 'Nhật ký ăn uống' để thêm món nhé.";
  }

  // Trả lời mặc định
  return "Mình có thể tư vấn về BMI, giảm cân, tăng cân, tăng cơ, protein, thực đơn, bữa tối hoặc calo. " +
    "Bạn hãy hỏi cụ thể hơn, ví dụ: 'Tối nay tôi nên ăn gì?' hoặc 'Tôi muốn giảm cân thì ăn thế nào?'.";
}
