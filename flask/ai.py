import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, Conv1D, GlobalMaxPooling1D, Dense
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

app = Flask(__name__)
CORS(app)

# Load the data
data = pd.read_csv("disease-and-symptoms.csv")
data.columns = data.columns.str.strip()
data['Symptoms'].fillna('', inplace=True)

# Preprocess the data
tokenizer = Tokenizer()
tokenizer.fit_on_texts(data['Symptoms'])
X = tokenizer.texts_to_sequences(data['Symptoms'])
X = pad_sequences(X)

label_encoder = LabelEncoder()
y = label_encoder.fit_transform(data['Disease'])

# Build a CNN model
vocab_size = len(tokenizer.word_index) + 1
embedding_dim = 50
maxlen = X.shape[1]  # Infer input length from the padded sequences

model = Sequential()
model.add(Embedding(input_dim=vocab_size, output_dim=embedding_dim))
model.add(Conv1D(128, 5, activation='relu'))
model.add(GlobalMaxPooling1D())
model.add(Dense(64, activation='relu'))
model.add(Dense(len(label_encoder.classes_), activation='softmax'))

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Train the CNN model (you may want to move this to a separate script for model training)
model.fit(X, y, epochs=50, batch_size=32, validation_split=0.1)

# Train a k-Nearest Neighbors (KNN) model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
knn_model = KNeighborsClassifier(n_neighbors=5)
knn_model.fit(X_train, y_train)

@app.route('/symptom_checker', methods=['POST'])
def symptom_checker():
    # Receive symptoms in JSON format
    symptoms_json = request.json.get('symptoms')
    # Wrap the string into a list
    symptoms = [symptoms_json]
    
    # Print received symptoms
    print("Received symptoms:", symptoms)
    
    # Process symptoms (for example, pass to the model for prediction)
    predicted_disease = predict_disease(symptoms)
    
    # Return results as JSON response
    return jsonify({'predicted_disease': predicted_disease})

def predict_disease(new_symptoms):
    # Tokenize and pad new symptoms
    new_symptoms_sequence = pad_sequences(tokenizer.texts_to_sequences(new_symptoms), maxlen=maxlen)

    # Calculate cosine similarity between new symptoms and training data
    cosine_similarities = cosine_similarity(new_symptoms_sequence, X_train)

    # Find k nearest neighbors based on cosine similarity
    k_nearest_indices = cosine_similarities.argsort()[:, -5:]  # Choose top 5 nearest neighbors

    # Get diseases corresponding to the k nearest neighbors
    nearest_diseases = [y_train[idx] for idx in k_nearest_indices.flatten()]
    predicted_disease_knn = label_encoder.inverse_transform([max(set(nearest_diseases), key=nearest_diseases.count)])[0]

    # Predict using CNN model
    predictions_cnn = model.predict(new_symptoms_sequence)
    predicted_class_index_cnn = predictions_cnn.argmax(axis=-1)
    predicted_disease_cnn = label_encoder.inverse_transform(predicted_class_index_cnn.flatten())[0]  # Flatten the array

    # Compare and choose the best prediction
    if predicted_disease_cnn == "Unknown":
        predicted_disease = predicted_disease_knn
    else:
        predicted_disease = predicted_disease_cnn

    return predicted_disease

if __name__ == '__main__':
    app.run(debug=True)
