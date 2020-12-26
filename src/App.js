import React, { useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import ShirtSide from './components/steps/ShirtSide/ShirtSide';
import ShirtGraphic from './components/steps/ShirtGraphic/ShirtGraphic';
import ShirtGraphicStyle from './components/steps/ShirtGraphicStyle/ShirtGraphicStyle';
import ImageFormSummary from './components/steps/ImageFormSummary/ImageFormSummary';
import ClientData from './components/steps/ClientData/ClientData';
import OrderMethod from './components/steps/OrderMethod/OrderMethod';
import OrderSummary from './components/steps/OrderSummary/OrderSummary';
import { default as Stepper } from './components/common/Stepper';
import axios from 'axios';

export default function App() {
  // material ui default theme
  const theme = createMuiTheme();
  // state hooks for managing state of application
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
  const [clientData, setClientData] = useState({
    first_name: '',
    last_name: '',
    street_name: '',
    home_number: '',
    zip_code: '',
    city: '',
    phone_number: '',
    email: ''
  });
  const [deliveryMethod, setDeliveryMethod] = useState('personal');
  const [deliveryInfo, setDeliveryInfo] = useState({
    street_name: '',
    home_number: '',
    zip_code: '',
    city: ''
  });

  const fetchImage = async () => {
    const res = await axios.get('https://picsum.photos/200');
    return res;
  }

  const handleNextComponent = () => {
    let infoMessage;
    // validate shirtSide component
    if(counter === 1) {
      if(nextImageUrl !== imageUrl) {
        setImageUrl(nextImageUrl);
      }
    }
    // validate imageFormSummary component
    if(counter === 3) {
      const { step1, step2, step3 } = confirmStep;
      if(imageStyle) {
        if(!step1 || !step2 || !step3) {
          setMessage('Please confirm all steps!');
          return false;
        } else {
          setMessage(null);
        }
      } else {
        if(!step1 || !step2) {
          setMessage('Please confirm all steps!');
          return false;
        } else {
          setMessage(null);
        }
      }

    }
    // validate clients data
    if(counter === 4) {
      if(clientData.first_name === '') {
        setMessage('Please fill the form before going to the next step.');
        return false;
      } else {
        setMessage(null);
      }
    }
    // validate clients way of delivery
    if(counter === 5 && deliveryMethod === 'shipment') {
      const { street_name, home_number, zip_code, city } = deliveryInfo;
      if(street_name === '' || home_number === '' || zip_code === '' || city === '') {
        setMessage('Please, fill the fields with proper values!');
        return false;
      } else {
        setMessage(null);
      }
    }

    setCounter((prevCounter) => prevCounter + 1);
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
        return <ClientData
                  setData={setClientData}
                  clientData={clientData}
                  image={imageStyle ?? imageUrl}
                  shirtType={shirtType}
                  message={message}
                />;
      case 5:
        return <OrderMethod
                  message={message}
                  clientData={clientData}
                  setClientData={setClientData}
                  delivery={deliveryMethod}
                  setDelivery={setDeliveryMethod}
                  deliveryInfo={deliveryInfo}
                  setDeliveryInfo={setDeliveryInfo}
                />;
      case 6:
        return <OrderSummary
                  imageUrl={imageUrl}
                  imageStyle={imageStyle}
                  shirtType={shirtType}
                />;
      default:
        return 'No component...';
    }
  }

  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="lg">
      {displayComponents()}
      <Stepper
        counter={counter}
        setCounter={setCounter}
        handleNextComponent={handleNextComponent}
      />
    </Container>
    </ThemeProvider>
  );
}
