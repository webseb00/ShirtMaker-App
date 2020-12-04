import React, { useState } from 'react';
import { Container, Paper, Typography } from '@material-ui/core';
import ShirtSide from './components/steps/ShirtSide/ShirtSide';
import ShirtGraphic from './components/steps/ShirtGraphic/ShirtGraphic';
import ShirtGraphicStyle from './components/steps/ShirtGraphicStyle/ShirtGraphicStyle';
import { default as Stepper } from './components/common/Stepper';
import axios from 'axios';

export default function App() {
  const [counter, setCounter] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [nextImageUrl, setNextImageUrl] = useState(null);
  const [shirtType, setShirtType] = useState('');

  const fetchImage = async () => {
    const res = await axios.get('https://picsum.photos/200');
    return res;
  }

  const handleNextComponent = () => {
    if(counter === 1) {
      nextImageUrl !== null ? setImageUrl(nextImageUrl) : '';
    }
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
        return <ShirtGraphicStyle image={imageUrl} />;
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
