import React, { useState, useEffect } from 'react';
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Slider, Grid,  } from '@material-ui/core';
import axios from 'axios';
import ShirtGraphicPreview from '../ShirtGraphic/ShirtGraphicPreview';

export default function ShirtSide({ image, setStyle, imageStyle, shirtType }) {
  // reset image style
  useEffect(() => {
    setStyle(null);
  }, []);

  const [value, setValue] = useState('normal');
  const [amount, setAmount] = useState(1);
  // handler for normal, grayscale and first grade of blurred image
  const handleChange = e => {
    setValue(e.target.value);
    loadGraphicStyle(e.target.value);
  }
  // handler for setting amount of blur effect
  const handleSlider = (e, newValue) => {
    setAmount(newValue);
    loadGraphicStyle('blur');
  }

  const loadGraphicStyle = async (style) => {
    const getImageInfo = await axios.get(image);
    const imageID = getImageInfo.headers['picsum-id'];

    if(style === 'normal') {
      setStyle(null);
    }

    if(style === 'grayscale') {
      setStyle(`https://picsum.photos/id/${imageID}/200/?${style}`);
    }

    if(style === 'blur') {
      setStyle(`https://picsum.photos/id/${imageID}/200/?${style}=${amount}`);
    }
  }

  const valuetext = value => `${value}`;
  const img = imageStyle ?? image;

  return (
    <>
      <Grid container justify="center" spacing={3}>
        <Grid item>
          <ShirtGraphicPreview img={img} type={shirtType} />
        </Grid>
        <Grid item>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select graphic style:</FormLabel>
            <RadioGroup value={value} onChange={handleChange}>
              <FormControlLabel value="normal" control={<Radio />} label="Normal" />
              <FormControlLabel value="grayscale" control={<Radio />} label="Grayscale" />
              <div>
                <FormControlLabel value="blur" control={<Radio />} label="Blur" />
                <Slider
                  disabled={value === 'blur' ? false : true}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  defaultValue={1}
                  step={1}
                  min={1}
                  max={10}
                  marks
                  value={amount}
                  onChange={handleSlider}
                />
              </div>
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}
