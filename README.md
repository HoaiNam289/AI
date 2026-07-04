# NutriCare AI

NutriCare AI là web app hỗ trợ theo dõi dinh dưỡng cá nhân. Ứng dụng có giao diện web riêng trong thư mục `web-ui` và được chạy thông qua Streamlit.

## Tính năng chính

- Nhập hồ sơ sức khỏe: họ tên, tuổi, giới tính, chiều cao, cân nặng, mức độ vận động và mục tiêu.
- Tính BMI, BMR, TDEE và lượng calo mục tiêu mỗi ngày.
- Dashboard theo dõi calo đã nạp, calo còn lại và tiến trình trong ngày.
- Nhật ký ăn uống với dữ liệu calo, protein, carb và fat.
- Gợi ý thực đơn theo mục tiêu: giảm cân, giữ cân, tăng cân, tăng cơ.
- Chatbot tư vấn dinh dưỡng dạng rule-based.
- Upload ảnh món ăn và nhận diện demo trên giao diện web.

## Cấu trúc thư mục

```text
NutriCare_AI/
├── app.py                     # File chạy Streamlit
├── requirements.txt           # Danh sách thư viện Python cần cài
├── train_food101_model.py     # Script huấn luyện model Food-101
├── web-ui/
│   ├── index.html             # Giao diện chính
│   ├── styles.css             # CSS giao diện
│   └── script.js              # Logic frontend
└── model/                     # Thư mục lưu model nếu có
```

## Yêu cầu cài đặt

Cần cài trước:

- Python 3.10 hoặc 3.11
- Git
- VS Code hoặc terminal bất kỳ

Kiểm tra đã cài Python và Git:

```powershell
python --version
git --version
```

Nếu máy báo không nhận lệnh `python` hoặc `git`, hãy cài:

- Python: https://www.python.org/downloads/
- Git: https://git-scm.com/downloads

Khi cài Python trên Windows, nhớ chọn `Add python.exe to PATH`.

## Cách cài và chạy trên Windows

### Bước 1: Tải source code

Mở PowerShell hoặc terminal, chạy:

```powershell
git clone https://github.com/HoaiNam289/AI.git
cd AI
```

Nếu bạn đã có thư mục project rồi thì chỉ cần mở đúng thư mục:

```powershell
cd "D:\Vs code\FoodAI\NutriCare_AI"
```

### Bước 2: Tạo môi trường ảo

```powershell
python -m venv .venv
```

### Bước 3: Kích hoạt môi trường ảo

PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Nếu bị lỗi quyền chạy script, chạy lệnh này một lần:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Sau đó kích hoạt lại:

```powershell
.\.venv\Scripts\Activate.ps1
```

Khi kích hoạt thành công, terminal sẽ hiện `(.venv)` ở đầu dòng.

### Bước 4: Cài thư viện

```powershell
python -m pip install --upgrade pip
pip install -r requirements.txt
```

Lần đầu cài có thể mất vài phút vì có TensorFlow.

### Bước 5: Chạy ứng dụng

```powershell
streamlit run app.py
```

Sau khi chạy, mở trình duyệt tại:

```text
http://localhost:8501
```

## Cách chạy trên macOS/Linux

```bash
git clone https://github.com/HoaiNam289/AI.git
cd AI
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
streamlit run app.py
```

Mở:

```text
http://localhost:8501
```

## Lưu ý về nhận diện món ăn

Phần giao diện `web-ui` hiện có chức năng upload ảnh và nhận diện demo bằng JavaScript. Trong `app.py` cũng có phần code liên quan đến AI/model, nhưng để dùng model thật cần có file model trong thư mục `model/`.

Các file model dự kiến:

```text
model/food101_model.h5
model/food101_class_names.json
```

Nếu chưa có model, app vẫn chạy giao diện web bình thường.

## Lỗi thường gặp

### 1. `Error: Invalid value: File does not exist: app.py`

Bạn đang chạy sai thư mục. Hãy vào đúng thư mục chứa `app.py`:

```powershell
cd "D:\Vs code\FoodAI\NutriCare_AI"
streamlit run app.py
```

Hoặc chạy từ thư mục cha:

```powershell
streamlit run .\NutriCare_AI\app.py
```

### 2. `streamlit` không được nhận diện

Kích hoạt môi trường ảo rồi cài lại thư viện:

```powershell
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Sau đó chạy:

```powershell
streamlit run app.py
```

### 3. Cài TensorFlow bị lỗi

Nên dùng Python 3.10 hoặc 3.11. Kiểm tra:

```powershell
python --version
```

Nếu đang dùng Python quá mới, hãy cài Python 3.10/3.11 rồi tạo lại môi trường ảo.

### 4. Giao diện chưa cập nhật sau khi sửa code

Tải lại trình duyệt bằng:

```text
Ctrl + F5
```

Hoặc dừng app bằng `Ctrl + C`, rồi chạy lại:

```powershell
streamlit run app.py
```

## Lệnh nhanh cho người đã cài môi trường

```powershell
cd "D:\Vs code\FoodAI\NutriCare_AI"
.\.venv\Scripts\Activate.ps1
streamlit run app.py
```

