import React, { useState, useEffect } from 'react';
import ShirtGraphicPreview from './ShirtGraphicPreview';
import { Typography, Grid, Button, makeStyles } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const useStyles = makeStyles({
  slider: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  buttons: {
    margin: '10px 0',
    '& > .MuiButton-root': {
      margin: '0 5px'
    }
  }
});

export default function ShirtSide({ image, shirtType, fetchImage, setNext, nextImage }) {  
  useEffect(() => {
    setNext(image);
  }, []);

  const classes = useStyles();
  const [counter, setCounter] = useState(0);
  const images = [image, nextImage];
  
  const slideNextImage = async () => {
    if(counter === 0) {
      const data = fetchImage();
      await data.then(res => setNext(res.request.responseURL));
      setCounter(counter + 1);
    }
  }

  const slidePrevImage = () => {
    if(counter === 1) {
      setNext(null);
      setCounter(counter - 1);
    }
  }
  
  return (
      <>
        <Typography variant="h2">
          ShirtGraphic Component
        </Typography>
        <Grid container justify="center" spacing={3}>
          <Grid item>
            <ShirtGraphicPreview img={images[counter]} type={shirtType} />
          </Grid>
          <Grid item>
            <div className={classes.slider}>
              <img src={images[counter]} />
              <div className={classes.buttons}>
                <Button
                  disabled={counter === 0 ? true : false} 
                  onClick={slidePrevImage} 
                  variant="contained" 
                  color="primary">
                    <KeyboardArrowLeftIcon />
                </Button>
                <Button 
                  disabled={counter === 1 ? true : false}
                  onClick={slideNextImage} 
                  variant="contained"
                  color="primary">
                    <KeyboardArrowRightIcon />
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </>
    )
}