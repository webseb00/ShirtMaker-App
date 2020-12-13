import React, { useState } from 'react';
import { makeStyles, Typography, Step, StepLabel, Stepper, Button } from '@material-ui/core';

const useStyles = makeStyles({
  centerContent: {
    textAlign: 'center'
  },
  marginLR: {
    margin: '0 8px'
  }
});

function getSteps() {
  return ['Select side of the shirt', 'Select image to print', 'Select style of the graphic', 'Select image summary', 'Customer Data'];
}

export default function HorizontalLabelPositionBelowStepper({ counter:  activeStep, setCounter: setActiveStep, handleNextComponent }) {
  const classes = useStyles();
  const steps = getSteps();

  const handleNext = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    handleNextComponent();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <div className={classes.centerContent}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                size="large"
                className={classes.marginLR}
              >
                Back
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleNext} 
                size="large"
                className={classes.marginLR}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}