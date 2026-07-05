import os
import json
import tensorflow as tf
import tensorflow_datasets as tfds
from tensorflow.keras import layers, models
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

# =========================
# 1. CẤU HÌNH VÀ THIẾT LẬP (BẢN NÂNG CẤP 30 MÓN)
# =========================
DATA_DIR = 'C:/AI_Data/tfds_data'  # Kho chứa dữ liệu trên máy bạn
MODEL_DIR = "model"
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 10  # Tăng lên 10 vòng vì 30 món cần thời gian học kỹ hơn

os.makedirs(MODEL_DIR, exist_ok=True)
os.makedirs(DATA_DIR, exist_ok=True)
os.environ['TFDS_DATA_DIR'] = DATA_DIR

# Kích hoạt sức mạnh của card RTX 4050
gpus = tf.config.list_physical_devices('GPU')
if gpus:
    print(f"✅ Đã tìm thấy GPU: {gpus}. Bắt đầu tăng tốc!")

# Danh sách 30 món ăn từ Á sang Âu
SELECTED_CLASSES = [
    "pho", "fried_rice", "ramen", "pizza", "sushi", 
    "hamburger", "chicken_wings", "greek_salad", "ice_cream", "donuts",
    "spring_rolls", "dumplings", "french_fries", "hot_dog", "steak",
    "omelette", "tacos", "pork_chop", "pancakes", "hot_and_sour_soup",
    "lasagna", "chocolate_cake", "cheesecake", "garlic_bread", "club_sandwich",
    "pad_thai", "spaghetti_bolognese", "mussels", "nachos", "fish_and_chips"
]

# =========================
# 2. LOAD VÀ TIỀN XỬ LÝ DỮ LIỆU
# =========================
print("Đang quét dữ liệu từ ổ C, vui lòng đợi...")
(ds_train, ds_val), ds_info = tfds.load(
    "food101",
    split=["train", "validation"],
    as_supervised=True,
    with_info=True,
    data_dir=DATA_DIR
)

# Ánh xạ ID món ăn từ bộ data gốc sang ID mới (từ 0 đến 29)
all_class_names = ds_info.features["label"].names
selected_class_ids = [all_class_names.index(c) for c in SELECTED_CLASSES]
id_to_new_id = {old_id: new_id for new_id, old_id in enumerate(selected_class_ids)}

def filter_selected_classes(image, label):
    # Lọc bỏ những ảnh không nằm trong 30 món đã chọn
    return tf.reduce_any(tf.equal(label, selected_class_ids))

def preprocess(image, label):
    # Đổi label, chỉnh kích thước ảnh về 224x224 và mã hóa One-Hot
    new_label = tf.py_function(func=lambda x: id_to_new_id[int(x.numpy())], inp=[label], Tout=tf.int64)
    new_label.set_shape([])
    image = tf.image.resize(image, IMG_SIZE)
    image = tf.cast(image, tf.float32)
    label_one_hot = tf.one_hot(new_label, depth=len(SELECTED_CLASSES))
    return image, label_one_hot

# Đưa ảnh vào dây chuyền xử lý tốc độ cao
train_ds = ds_train.filter(filter_selected_classes).map(preprocess, num_parallel_calls=tf.data.AUTOTUNE).shuffle(1000).batch(BATCH_SIZE).prefetch(tf.data.AUTOTUNE)
val_ds = ds_val.filter(filter_selected_classes).map(preprocess, num_parallel_calls=tf.data.AUTOTUNE).batch(BATCH_SIZE).prefetch(tf.data.AUTOTUNE)

# Xuất danh sách 30 món ra file JSON để web đọc
with open(os.path.join(MODEL_DIR, "food101_class_names.json"), "w", encoding="utf-8") as f:
    json.dump(SELECTED_CLASSES, f, ensure_ascii=False, indent=4)

# =========================
# 3. XÂY DỰNG MẠNG NEURAL (BỘ NÃO)
# =========================
# Dùng bộ khung MobileNetV2 siêu nhẹ, chuyên dùng cho ứng dụng di động
base_model = MobileNetV2(input_shape=(224, 224, 3), include_top=False, weights="imagenet")
base_model.trainable = False

inputs = layers.Input(shape=(224, 224, 3))
x = preprocess_input(inputs)
x = base_model(x, training=False)
x = layers.GlobalAveragePooling2D()(x)
x = layers.Dropout(0.3)(x)
outputs = layers.Dense(len(SELECTED_CLASSES), activation="softmax")(x) # Lớp đầu ra 30 nơ-ron cho 30 món

model = models.Model(inputs, outputs)
model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.0005), loss="categorical_crossentropy", metrics=["accuracy"])

# =========================
# 4. BẮT ĐẦU HUẤN LUYỆN
# =========================
print(f"\n🚀 Bắt đầu quá trình huấn luyện {len(SELECTED_CLASSES)} món ăn...")
model.fit(train_ds, validation_data=val_ds, epochs=EPOCHS)

# =========================
# 5. LƯU THÀNH QUẢ
# =========================
model.save(os.path.join(MODEL_DIR, "food101_model.keras"))
print("\n🎉 Train xong! File food101_model.keras đã cập nhật bộ não 30 món.")