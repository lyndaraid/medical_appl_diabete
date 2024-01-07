import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

function getSteps() {
  return [
    "Basic information",
    "Wellness Metrics Form",
    "Detailed Smoking Survey",
    "Former Smoking Experience",
  ];
}

const BasicForm = () => {
  const { control } = useFormContext();
  return (
    <>
    <Controller
        control={control}
        name="gender"
        render={({ field }) => (
          <TextField
            id="gender"
            label="Gender"
            variant="outlined"
            placeholder="Enter Your Gender (0 for Male, 1 for Female)"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="age"
        render={({ field }) => (
          <TextField
            id="age"
            label="Age"
            variant="outlined"
            placeholder="Enter Your Age"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

<Controller
        control={control}
        name="hypertension"
        render={({ field }) => (
          <TextField
            id="hypertension"
            label="Hypertension"
            variant="outlined"
            placeholder="Enter Your Hypertension Status (0 or 1)"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

<Controller
        control={control}
        name="heart_disease"
        render={({ field }) => (
          <TextField
            id="heart-disease"
            label="Heart Disease"
            variant="outlined"
            placeholder="Enter Your Heart Disease Status (0 or 1)"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};

const ContactForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="bmi"
        render={({ field }) => (
          <TextField
            id="bmi"
            label="BMI"
            variant="outlined"
            placeholder="Enter Your BMI"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

    <Controller
        control={control}
        name="HbA1c_level"
        render={({ field }) => (
          <TextField
            id="hba1c-level"
            label="HbA1c Level"
            variant="outlined"
            placeholder="Enter Your HbA1c Level"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="blood_glucose_level"
        render={({ field }) => (
          <TextField
            id="blood-glucose-level"
            label="Blood Glucose Level"
            variant="outlined"
            placeholder="Enter Your Blood Glucose Level"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};

const PersonalForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="smoking_history_No_Info"
        render={({ field }) => (
          <TextField
            id="smoking-history-no-info"
            label="Smoking History (No Info)"
            variant="outlined"
            placeholder="Enter Your Smoking History (No Info)"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="smoking_history_current"
        render={({ field }) => (
          <TextField
            id="smoking-history-current"
            label="Smoking History (Current)"
            variant="outlined"
            placeholder="Enter Your Smoking History (Current)"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="smoking_history_ever"
        render={({ field }) => (
          <TextField
            id="smoking-history-ever"
            label="Smoking History (Ever)"
            variant="outlined"
            placeholder="Enter Your Smoking History (Ever)"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

    </>
  );
};

const PaymentForm = () => {
  const { control } = useFormContext();
  return (
    <>
     <Controller
        control={control}
        name="smoking_history_former"
        render={({ field }) => (
          <TextField
            id="smoking-history-former"
            label="Smoking History (Former)"
            variant="outlined"
            placeholder="Enter Your Smoking History (Former)"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
       <Controller
        control={control}
        name="smoking_history_never"
        render={({ field }) => (
          <TextField
            id="smoking-history-never"
            label="Smoking History (Never)"
            variant="outlined"
            placeholder="Enter Your Smoking History (Never)"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="smoking_history_not_current"
        render={({ field }) => (
          <TextField
            id="smoking-history-not-current"
            label="Smoking History (Not Current)"
            variant="outlined"
            placeholder="Enter Your Smoking History (Not Current)"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />


    </>
  );
};

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicForm />;

    case 1:
      return <ContactForm />;
    case 2:
      return <PersonalForm />;
    case 3:
      return <PaymentForm />;
    default:
      return "unknown step";
  }
}

const LinaerStepper = () => {
  const methods = useForm({
    defaultValues: {
    gender: 0,
    age: 0,
    hypertension: 0,
    heart_disease: 0,
    bmi: 0,
    HbA1c_level: 0,
    blood_glucose_level: 0,
    smoking_history_No_Info: 0,
    smoking_history_current: 0,
    smoking_history_ever: 0,
    smoking_history_former: 0,
    smoking_history_never: 0,
    smoking_history_not_current: 0,
    },
  });
  const [activeStep, setActiveStep] = useState(0);
const [skippedSteps, setSkippedSteps] = useState([]);
const [predictionResult, setPredictionResult] = useState(null);
const [showVisualization, setShowVisualization] = useState(true); // Add this line
const [showVisualizationDialog, setShowVisualizationDialog] = useState(false); // Add this line
const steps = getSteps();
 const [data, setData] = useState({});

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const VisualizationComponent = ({ onClose }) => {
  // Implement your logic to display the visualization components here

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Visualization</DialogTitle>
      <DialogContent>
        {/* Add your visualization components here */}
        <Typography>Visualization Content Goes Here</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

  const fetchData = async (data) => {
    try {
      const response = await fetch("https://dc01-34-66-122-1.ngrok-free.app/diabetes_prediction", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "gender": data.gender || 0,
          "age": data.age || 0,
          "hypertension": data.hypertension || 0,
          "heart_disease": data.heart_disease || 0,
          "bmi": data.bmi || 0,
          "HbA1c_level": data.HbA1c_level || 0,
          "blood_glucose_level": data.blood_glucose_level || 0,
          "smoking_history_No_Info": data.smoking_history_No_Info || 0,
          "smoking_history_current": data.smoking_history_current || 0,
          "smoking_history_ever": data.smoking_history_ever || 0,
          "smoking_history_former": data.smoking_history_former || 0,
          "smoking_history_never": data.smoking_history_never || 0,
          "smoking_history_not_current": data.smoking_history_not_current || 0
        }),
      });
  
      if (!response.ok) {
        console.error(`Prediction request failed with status ${response.status}: ${await response.text()}`);
        throw new Error('Prediction request failed');
      }
  
      const predictionResult = await response.json();
      console.log(predictionResult);
      setPredictionResult(predictionResult);; // Set the result to state
      // Handle the result in your React application
      // For example, you can update the UI based on the prediction result
      // result will be a string like "the person is diabetic" or "the person is not diabetic"
    } catch (error) {
      console.error('Error making prediction request:', error.message);
    }
  };

  const handleNext = async (data) => {
    if (activeStep === steps.length - 1) {
      fetch("https://jsonplaceholder.typicode.com/comments")
       .then((data) => data.json())
        .then((res) => {
        console.log(res);
         setActiveStep(activeStep + 1);
        });
       setData(data); // Set formData to the data variable
      await fetchData();

      await fetchData(data);


    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const fetchVisualization = async (data) => {
  try {
    const queryParams = queryString.stringify(data);
    const visualizationUrl = `https://dc01-34-66-122-1.ngrok-free.app/diabetes_visualization?${queryParams}`;

    const response = await fetch(visualizationUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });

    if (!response.ok) {
      console.error(`Visualization request failed with status ${response.status}: ${await response.text()}`);
      throw new Error('Visualization request failed');
    }

    // Assuming your backend returns the image as a base64-encoded string
    const visualizationData = await response.json();
    console.log(visualizationData);

    // Process the visualization data as needed (e.g., display images)
  } catch (error) {
    console.error('Error making visualization request:', error.message);
  }
};

const handleVisualization = async () => {
  console.log("Show Visualization");
  setShowVisualization(false); // Hide the button after clicking
  setShowVisualizationDialog(true); // Show the visualization dialog
  await fetchVisualization(data); // Call the function to request visualizations
};

  const handleCloseVisualization = () => {
    // Handle closing the visualization dialog
    setShowVisualizationDialog(false);
  };


  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8} lg={6}>
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((step, index) => {
            const labelProps = {};
            const stepProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography
                  variant="caption"
                  align="center"
                  style={{ display: "block" }}
                >
                  optional
                </Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step {...stepProps} key={index}>
                <StepLabel {...labelProps}>{step}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <>
            {predictionResult ? (
              <div>
                <Typography variant="h6" align="center">
                  Prediction Result: {predictionResult}
                </Typography>
                {showVisualization && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleVisualization}
                    fullWidth
                  >
                    Show Visualization
                  </Button>
                )}
                {showVisualizationDialog && (
                  <VisualizationComponent onClose={handleCloseVisualization} />
                )}
              </div>
            ) : (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <CircularProgress style={{ color: "#4caf50" }} />
              </div>
            )}
          </>
        ) : (
          <>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleNext)}>
                {getStepContent(activeStep)}

                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={6} md={3}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      fullWidth
                    >
                      Back
                    </Button>
                  </Grid>
                  {isStepOptional(activeStep) && (
                    <Grid item xs={6} md={3}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSkip}
                        fullWidth
                      >
                        Skip
                      </Button>
                    </Grid>
                  )}
                  <Grid item xs={12} md={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </FormProvider>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default LinaerStepper;
