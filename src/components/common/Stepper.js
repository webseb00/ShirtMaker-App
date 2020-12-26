import React from 'react';
import { makeStyles, Button, useTheme} from '@material-ui/core';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles({
  centerContent: {
    textAlign: 'center'
  },
  marginLR: {
    margin: '0 8px'
  },
  root: {
    justifyContent: 'center',
    '& .MuiLinearProgress-root': {
      margin: '0 15px',
      width: '40%'
    }
  }
});

export default function HorizontalLabelPositionBelowStepper({ counter:  activeStep, setCounter: setActiveStep, handleNextComponent }) {
  const classes = useStyles();
  const theme = useTheme();

  const handleNext = () => {
    handleNextComponent();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <MobileStepper
      variant="progress"
      steps={7}
      position="static"
      activeStep={activeStep}
      className={classes.root}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === 6}>
          Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          Back
        </Button>
      }
    /> 
  );
}