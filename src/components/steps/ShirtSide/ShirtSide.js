import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, CardActions, Radio, Grid, FormControlLabel, RadioGroup, makeStyles } from '@material-ui/core';
import ShirtFront from '../../../images/front.png';
import ShirtBack from '../../../images/back.png';
import Loader from 'react-loader-spinner';

const useStyles = makeStyles({
  centerImg: {
    textAlign: 'center',
    position: 'relative'
  },
  image: {
    maxWidth: '400px',
    width: '100%',
    '& + img, & ~ div':{
      position:'absolute',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%,-40%)',
    },
    '& + img': {
      maxWidth: '160px',
      width: '100%'
    }
  },
  centerLabel: {
    justifyContent: 'center'
  }
});

export default function ShirtSide({ setImage, image, fetchImage, setShirt }) {
  const classes = useStyles();
  const [checked, setChecked] = useState({
    front_shirt: true,
    back_shirt: false
  });

  useEffect(() => {
    if(!image) { handleInitData(); }
  }, []);

  const handleInitData = () => {
    const res = fetchImage()
    .then(res => setImage(res.request.responseURL));
    setShirt('front');
  }

  const handleChange = e => {
    setImage(null);

    const res = fetchImage()
    .then(res => setImage(res.request.responseURL));

    let data = null;
    if(e.target.name === 'front_shirt') {
      data = {
        [e.target.name]: e.target.checked,
        back_shirt: false
      }
    } else {
      data = {
        [e.target.name]: e.target.checked,
        front_shirt: false
      }
    }
    setChecked(data);
    setShirt(e.target.name === 'front_shirt' ? 'front' : 'back');
  }

  const displayImage = () => {
    if(image === null) {
      return <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />;
    } else {
      return <img src={image} />
    }
  }

  return (
      <>
        <Typography variant="h2">
          ShirtSide Component
        </Typography>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={10} sm={6} md={4}>
            <Card>
              <CardContent className={classes.centerImg}>
                <img 
                  src={ShirtFront} 
                  className={classes.image} 
                  alt="front shirt" 
                />
                {checked.front_shirt ? displayImage() : ''}
              </CardContent>
              <CardActions className={classes.centerLabel}>
                <FormControlLabel
                  onChange={handleChange} 
                  value="front"
                  name="front_shirt"
                  control={<Radio />}
                  label="Front Side"
                  labelPlacement="bottom"
                  checked={checked.front_shirt}
                />
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={10} sm={6} md={4}>
            <Card>
              <CardContent className={classes.centerImg}>
                <img 
                  src={ShirtBack} 
                  className={classes.image} 
                  alt="back shirt"
                />
                {checked.back_shirt ? displayImage() : ''}
              </CardContent>
              <CardActions className={classes.centerLabel}>
                <FormControlLabel
                  onChange={handleChange} 
                  value="back"
                  name="back_shirt"
                  control={<Radio />}
                  label="Back Side"
                  labelPlacement="bottom"
                  checked={checked.back_shirt}
                />
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </>
  )
}