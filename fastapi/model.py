
import csv
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split, cross_val_score, learning_curve
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.metrics import accuracy_score, classification_report,f1_score,confusion_matrix


df = pd.read_csv("C:\\M2\\projects\\SIAD\\datasets\\diabetes_prediction_dataset.csv", delimiter=",")#changer le lien

df= df[df["gender"] != "Other"]
df= pd.get_dummies(df, columns=['smoking_history'])
df['gender'] = df['gender'].map({'Male': 1, 'Female': 0})
# Créer un objet MinMaxScaler
scaler = MinMaxScaler()


df.head()
x = df.drop('diabetes', axis=1)
y = df['diabetes']
print(x)
print(y)
# Supposons que x et y soient vos données d'entraînement et d'étiquettes respectivement
X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.3, random_state=42)

model = DecisionTreeClassifier(random_state=0)

def evaluation(model):
    # Entraîner le modèle
    model.fit(X_train, y_train)


    y_pred = model.predict(X_test)


    print("matrice de confusion")
    print(confusion_matrix(y_test, y_pred))


    accuracy = accuracy_score(y_test, y_pred)
    print("\nPrecision:", accuracy)


    cv_scores = cross_val_score(model, x, y, cv=5, scoring='accuracy')
    print("Validation Croisée :", cv_scores)


    N, train_score, val_score = learning_curve(model, X_train, y_train,
                                              cv=4, scoring='accuracy',
                                              train_sizes=np.linspace(0.1, 1, 10))

    plt.figure(figsize=(12, 8))
    plt.plot(N, train_score.mean(axis=1), label='Train Score')
    plt.plot(N, val_score.mean(axis=1), label='Validation Score')
    plt.legend()
    plt.show()


evaluation(model)
def plot_cross_val_scores(model, x, y, cv=5):
    cv_scores = cross_val_score(model, x, y, cv=cv)
    plt.figure(figsize=(8, 6))
    plt.plot(range(1, cv + 1), cv_scores, marker='o', linestyle='-', color='b')
    plt.title('Validation Croisée avec arbre de decision')
    plt.xlabel('ensemble')
    plt.ylabel('Score')
    plt.xticks(range(1, cv + 1))
    plt.axhline(y=cv_scores.mean(), color='r', linestyle='--', label='Moyenne des scores')
    plt.legend()
    plt.show()

plot_cross_val_scores(model, x, y)

import pickle
try:
    with open('diabetesmodel.sav', 'wb',protocol=pickle.HIGHEST_PROTOCOL) as model_file:
        pickle.dump(model, model_file)
    print("Model saved successfully.")
except Exception as e:
    print(f"Error saving model: {e}")