
import pickle
import logging
from fastapi import FastAPI, Query, File, UploadFile
from pydantic import BaseModel
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()




# Allow all origins in development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class model_input(BaseModel):
    gender: int
    age: int
    hypertension: int
    heart_disease: int
    bmi: float
    HbA1c_level: float
    blood_glucose_level: int
    smoking_history_No_Info: int
    smoking_history_current: int
    smoking_history_ever: int
    smoking_history_former: int
    smoking_history_never: int
    smoking_history_not_current: int

diabetes_model = pickle.load(open('diabetesmodel.sav', 'rb'))

@app.post('/diabetes_prediction')
async def diabetes_pred(input_parameters: model_input):
    input_data = input_parameters.json()
    input_dictionary = json.loads(input_data)

    gen = input_dictionary['gender']
    Age = input_dictionary['age']
    hyperTen = input_dictionary['hypertension']
    Heart_disease = input_dictionary['heart_disease']
    BMI = input_dictionary['bmi']
    HbA1c = input_dictionary['HbA1c_level']
    glucose = input_dictionary['blood_glucose_level']
    smoking_No_Info = input_dictionary['smoking_history_No_Info']
    smoking_current = input_dictionary['smoking_history_current']
    smoking_ever = input_dictionary['smoking_history_ever']
    smoking_former = input_dictionary['smoking_history_former']
    smoking_never = input_dictionary['smoking_history_never']
    smoking_not_current = input_dictionary['smoking_history_not_current']

    input_list = [gen, Age, hyperTen, Heart_disease, BMI, HbA1c, glucose, smoking_No_Info, smoking_current, smoking_ever, smoking_former, smoking_never, smoking_not_current]

    prediction = diabetes_model.predict([input_list])

    if prediction[0] == 0:
        return 'the person is not diabetic'
    else:
        return 'the person is diabetic'
@app.get('/diabetes_visualization')
async def diabetes_visualization(
    gender: int = Query(..., description="Gender"),
    age: int = Query(..., description="Age"),
    hypertension: int = Query(..., description="Hypertension"),
    heart_disease: int = Query(..., description="Heart Disease"),
    bmi: float = Query(..., description="BMI"),
    HbA1c_level: float = Query(..., description="HbA1c Level"),
    blood_glucose_level: int = Query(..., description="Blood Glucose Level"),
    smoking_history_No_Info: int = Query(..., description="Smoking History (No Info)"),
    smoking_history_current: int = Query(..., description="Smoking History (Current)"),
    smoking_history_ever: int = Query(..., description="Smoking History (Ever)"),
    smoking_history_former: int = Query(..., description="Smoking History (Former)"),
    smoking_history_never: int = Query(..., description="Smoking History (Never)"),
    smoking_history_not_current: int = Query(..., description="Smoking History (Not Current)"),
):
    # Your code to create visualizations
    # For example, let's create a simple plot
    plt.plot([1, 2, 3, 4])
    plt.ylabel('Some Numbers')

    # Save the plot to a BytesIO object
    img_bytesio = io.BytesIO()
    plt.savefig(img_bytesio, format='png')
    img_bytesio.seek(0)
    plt.close()

    # Return the BytesIO object as a file
    return UploadFile(file=img_bytesio, filename="visualization.png")
