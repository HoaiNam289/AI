import os
import json
import tensorflow as tf
import tensorflow_datasets as tfds
from tensorflow.keras import layers, models
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

# =========================
# CẤU HÌNH
# =========================
MODEL_DIR = "model"
IMG_SIZE = (224, 224)
BATCH_SIZE = 16
EPOCHS = 5

os.makedirs(MODEL_DIR, exist_ok=True)

# Chọn một số món trước để demo, không train hết 101 món cho nhẹ
SELECTED_CLASSES = [
    "pho",
    "fried_rice",
    "ramen",
    "pizza",
    "sushi",
    "hamburger",
    "chicken_wings",
    "greek_salad",
    "ice_cream",
    "donuts"
]

# =========================
# LOAD DATASET FOOD-101
# =========================
print("Đang tải Food-101 dataset, lần đầu sẽ hơi lâu...")

(ds_train, ds_val), ds_info = tfds.load(
    "food101",
    split=["train", "validation"],
    as_supervised=True,
    with_info=True
)

all_class_names = ds_info.features["label"].names

selected_class_ids = [
    all_class_names.index(class_name)
    for class_name in SELECTED_CLASSES
]

id_to_new_id = {
    old_id: new_id
    for new_id, old_id in enumerate(selected_class_ids)
}

print("Các món được chọn:")
for i, name in enumerate(SELECTED_CLASSES):
    print(i, name)

# =========================
# LỌC DATASET
# =========================
def filter_selected_classes(image, label):
    return tf.reduce_any(tf.equal(label, selected_class_ids))


def preprocess(image, label):
    # Đổi label gốc của Food-101 thành label mới từ 0 -> số class - 1
    new_label = tf.py_function(
        func=lambda x: id_to_new_id[int(x.numpy())],
        inp=[label],
        Tout=tf.int64
    )

    new_label.set_shape([])

    image = tf.image.resize(image, IMG_SIZE)
    image = tf.cast(image, tf.float32)

    label_one_hot = tf.one_hot(new_label, depth=len(SELECTED_CLASSES))

    return image, label_one_hot


train_ds = (
    ds_train
    .filter(filter_selected_classes)
    .map(preprocess, num_parallel_calls=tf.data.AUTOTUNE)
    .shuffle(1000)
    .batch(BATCH_SIZE)
    .prefetch(tf.data.AUTOTUNE)
)

val_ds = (
    ds_val
    .filter(filter_selected_classes)
    .map(preprocess, num_parallel_calls=tf.data.AUTOTUNE)
    .batch(BATCH_SIZE)
    .prefetch(tf.data.AUTOTUNE)
)

# Lưu class name
with open(os.path.join(MODEL_DIR, "food101_class_names.json"), "w", encoding="utf-8") as f:
    json.dump(SELECTED_CLASSES, f, ensure_ascii=False, indent=4)

# =========================
# XÂY DỰNG MODEL
# =========================
base_model = MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=False,
    weights="imagenet"
)

base_model.trainable = False

inputs = layers.Input(shape=(224, 224, 3))
x = preprocess_input(inputs)
x = base_model(x, training=False)
x = layers.GlobalAveragePooling2D()(x)
x = layers.Dropout(0.3)(x)
outputs = layers.Dense(len(SELECTED_CLASSES), activation="softmax")(x)

model = models.Model(inputs, outputs)

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.0005),
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)

model.summary()

# =========================
# TRAIN
# =========================
history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=EPOCHS
)

# =========================
# LƯU MODEL
# =========================
model.save(os.path.join(MODEL_DIR, "food101_model.h5"))

print("Train xong.")
print("Đã lưu model tại: model/food101_model.h5")
print("Đã lưu class tại: model/food101_class_names.json")