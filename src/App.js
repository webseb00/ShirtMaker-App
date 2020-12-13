import React, { useState, Component } from 'react';
import { Container, Paper, Typography } from '@material-ui/core';
import ShirtSide from './components/steps/ShirtSide/ShirtSide';
import ShirtGraphic from './components/steps/ShirtGraphic/ShirtGraphic';
import ShirtGraphicStyle from './components/steps/ShirtGraphicStyle/ShirtGraphicStyle';
import ImageFormSummary from './components/steps/ImageFormSummary/ImageFormSummary';
import ClientData from './components/steps/ClientData/ClientData';
import { default as Stepper } from './components/common/Stepper';
import axios from 'axios';

export default function App() {
  const [counter, setCounter] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [nextImageUrl, setNextImageUrl] = useState(null);
  const [shirtType, setShirtType] = useState('');
  const [imageStyle, setImageStyle] = useState(null);
  const [message, setMessage] = useState(null);
  const [confirmStep, handleConfirmStep] = useState({
    step1: false,
    step2: false,
    step3: false
  });

  const fetchImage = async () => {
    const res = await axios.get('https://picsum.photos/200');
    return res;
  }

  const handleNextComponent = () => {
    // validate shirtSide component
    if(counter === 1) {
      if(nextImageUrl !== imageUrl) {
        setImageUrl(nextImageUrl);
      }
    }
    // validate imageFormSummary component
    if(counter === 3) {
      const { step1, step2, step3 } = confirmStep;
      if(step1 === false || step2 === false || step3 === false) {
        setMessage('Please confirm all steps!');
        return false;
      } else {
        setMessage(null);
      }
    }

    setCounter(prevCounter => prevCounter + 1);
  }

  const displayComponents = () => {
    switch (counter) {
      case 0: 
        return <ShirtSide 
                  setImage={setImageUrl}
                  image={imageUrl} 
                  fetchImage={fetchImage}
                  setShirt={setShirtType}
                />;
      case 1: 
        return <ShirtGraphic 
                  image={imageUrl} 
                  shirtType={shirtType} 
                  fetchImage={fetchImage}
                  setNext={setNextImageUrl}
                  nextImage={nextImageUrl}
                />;
      case 2: 
        return <ShirtGraphicStyle 
                  image={imageUrl} 
                  shirtType={shirtType}
                  setStyle={setImageStyle}
                  imageStyle={imageStyle}
               />;
      case 3:
        return <ImageFormSummary 
                  image={imageUrl}
                  imageStyle={imageStyle}
                  shirtType={shirtType}
                  confirm={confirmStep}
                  handleConfirm={handleConfirmStep}
                  setCount={setCounter}
                  message={message}
               />;
      case 4: 
        return <ClientData />
      default: 
        return 'No component...';
    }
  }

  return (
    <Container maxWidth="lg">
      {displayComponents()}  
      <Stepper 
        counter={counter} 
        setCounter={setCounter} 
        handleNextComponent={handleNextComponent}
      />
    </Container>
  );
}
