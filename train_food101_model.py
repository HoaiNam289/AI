import os
import json
import tensorflow as tf
import tensorflow_datasets as tfds
from tensorflow.keras import layers, models
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.applications.efficientnet import preprocess_input


DATA_DIR = 'C:/AI_Data/tfds_data'
LOCAL_DATA_DIR = 'C:/AI_Data/local_data'
MODEL_DIR = "model"
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 10

os.makedirs(MODEL_DIR, exist_ok=True)
os.makedirs(DATA_DIR, exist_ok=True)
os.environ['TFDS_DATA_DIR'] = DATA_DIR


gpus = tf.config.list_physical_devices('GPU')
if gpus:
    print(f"✅ Đã tìm thấy GPU: {gpus}. Bắt đầu tăng tốc!")

SELECTED_CLASSES = [
    "pho", "fried_rice", "pizza", "sushi", 
    "hamburger", "chicken_wings", "greek_salad", "ice_cream", "donuts",
    "spring_rolls", "dumplings", "french_fries", "hot_dog", "steak",
    "omelette", "tacos", "pork_chop", "pancakes", "hot_and_sour_soup",
    "chocolate_cake", "cheesecake", "club_sandwich",
    "pad_thai", "spaghetti_bolognese", "mussels", "nachos"
]

# Tự động tạo sẵn các thư mục rỗng để bạn bỏ ảnh Việt Nam vào sau này
for split in ["train", "val"]:
    for c in SELECTED_CLASSES:
        os.makedirs(os.path.join(LOCAL_DATA_DIR, split, c), exist_ok=True)


data_augmentation = tf.keras.Sequential([
    layers.RandomFlip("horizontal"),       # Lật ảnh trái phải ngẫu nhiên
    layers.RandomRotation(0.15),           # Xoay nghiêng 15%
    layers.RandomZoom(0.15),               # Phóng to/thu nhỏ 15%
    layers.RandomContrast(0.15)            # Chỉnh sáng tối ngẫu nhiên
])

print("Đang quét dữ liệu từ ổ C, vui lòng đợi...")
(ds_train, ds_val), ds_info = tfds.load(
    "food101",
    split=["train", "validation"],
    as_supervised=True,
    with_info=True,
    data_dir=DATA_DIR
)

all_class_names = ds_info.features["label"].names
selected_class_ids = [all_class_names.index(c) for c in SELECTED_CLASSES]
id_to_new_id = {old_id: new_id for new_id, old_id in enumerate(selected_class_ids)}

def filter_selected_classes(image, label):
    return tf.reduce_any(tf.equal(label, selected_class_ids))

def preprocess(image, label):
    new_label = tf.py_function(func=lambda x: id_to_new_id[int(x.numpy())], inp=[label], Tout=tf.int64)
    new_label.set_shape([])
    image = tf.image.resize(image, IMG_SIZE)
    image = tf.cast(image, tf.float32)
    label_one_hot = tf.one_hot(new_label, depth=len(SELECTED_CLASSES))
    return image, label_one_hot

tfds_train_ds = ds_train.filter(filter_selected_classes).map(preprocess, num_parallel_calls=tf.data.AUTOTUNE)
tfds_val_ds = ds_val.filter(filter_selected_classes).map(preprocess, num_parallel_calls=tf.data.AUTOTUNE)

def check_local_data(folder_path):
    for c in SELECTED_CLASSES:
        p = os.path.join(folder_path, c)
        if os.path.exists(p) and any(os.scandir(p)):
            return True
    return False

has_local_train = check_local_data(os.path.join(LOCAL_DATA_DIR, "train"))
has_local_val = check_local_data(os.path.join(LOCAL_DATA_DIR, "val"))

if has_local_train:
    print("📊 Đang trộn dữ liệu ảnh vỉa hè Việt Nam vào tập Train...")
    local_train_ds = tf.keras.utils.image_dataset_from_directory(
        os.path.join(LOCAL_DATA_DIR, "train"), label_mode='categorical',
        class_names=SELECTED_CLASSES, image_size=IMG_SIZE, batch_size=None
    ).map(lambda x, y: (tf.cast(x, tf.float32), tf.cast(y, tf.float32)))
    train_ds = tfds_train_ds.concatenate(local_train_ds)
else:
    train_ds = tfds_train_ds

if has_local_val:
    print("📊 Đang trộn dữ liệu ảnh vỉa hè Việt Nam vào tập Validation...")
    local_val_ds = tf.keras.utils.image_dataset_from_directory(
        os.path.join(LOCAL_DATA_DIR, "val"), label_mode='categorical',
        class_names=SELECTED_CLASSES, image_size=IMG_SIZE, batch_size=None
    ).map(lambda x, y: (tf.cast(x, tf.float32), tf.cast(y, tf.float32)))
    val_ds = tfds_val_ds.concatenate(local_val_ds)
else:
    val_ds = tfds_val_ds

# Tối ưu hóa đường truyền dữ liệu
train_ds = train_ds.shuffle(2000).batch(BATCH_SIZE).prefetch(tf.data.AUTOTUNE)
val_ds = val_ds.batch(BATCH_SIZE).prefetch(tf.data.AUTOTUNE)

# Xuất danh sách 30 món ra file JSON để web đọc
with open(os.path.join(MODEL_DIR, "food101_class_names.json"), "w", encoding="utf-8") as f:
    json.dump(SELECTED_CLASSES, f, ensure_ascii=False, indent=4)

base_model = EfficientNetB0(input_shape=(224, 224, 3), include_top=False, weights="imagenet")
base_model.trainable = False

inputs = layers.Input(shape=(224, 224, 3))
x = data_augmentation(inputs)  # Ảnh đi qua máy nhào nặn làm méo trước
x = preprocess_input(x)
x = base_model(x, training=False)
x = layers.GlobalAveragePooling2D()(x)
x = layers.Dropout(0.4)(x)     # Tăng mức độ khó để AI tập trung hơn
outputs = layers.Dense(len(SELECTED_CLASSES), activation="softmax")(x) 

model = models.Model(inputs, outputs)
model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.0005), loss="categorical_crossentropy", metrics=["accuracy"])


print(f"\n🚀 Bắt đầu quá trình huấn luyện nâng cao {len(SELECTED_CLASSES)} món ăn...")
model.fit(train_ds, validation_data=val_ds, epochs=EPOCHS)

model.save(os.path.join(MODEL_DIR, "food101_model.keras"))
