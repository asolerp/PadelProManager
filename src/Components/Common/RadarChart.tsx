import React from 'react';

import radar from '../../Utils/radarChart';
import Svg from 'react-native-svg';
import {Dimensions} from 'react-native';

const shapeStyles = {
  fill: '#FAFAFA',
};

const axisStyles = {
  stroke: '#fff',
  strokeWidth: 0.5,
};

const scaleStyles = {
  fill: '#FAFAFA',
  stroke: '#fff',
  strokeWidth: 1,
};

const dotStyles = {
  backgroundColor: 'white',
  stroke: '#e7e8e7',
  borderRadius: 5,
};

const captionStyles = {
  fill: '#fff',
  fontWeight: 'bold',
  textShadow: '1px 1px 0 #fff',
};

const noSmoothing = points => {
  let d = 'M' + points[0][0].toFixed(4) + ',' + points[0][1].toFixed(4);
  for (let i = 1; i < points.length; i++) {
    d += 'L' + points[i][0].toFixed(4) + ',' + points[i][1].toFixed(4);
  }
  return d + 'z';
};

const setViewBox = options =>
  `-${options.captionMargin} 0 ${options.size + options.captionMargin * 2} ${
    options.size
  }`;

const defaultOptions = {
  size: Dimensions.get('window').width - 50,
  axes: true, // show axes?
  scales: 3, // show scale circles?
  captions: true, // show captions?
  dots: false, // show dots?
  zoomDistance: 1.2, // where on the axes are the captions?
  smoothing: noSmoothing, // shape smoothing function
  captionMargin: 30,
  setViewBox,
  axisProps: () => ({...axisStyles}),
  scaleProps: () => ({...scaleStyles, fill: 'none'}),
  shapeProps: () => ({...shapeStyles}),
  dotProps: () => ({
    dotStyles,
  }),
  captionProps: () => ({
    ...captionStyles,
    textAnchor: 'middle',
    fontSize: 12,
  }),
  rotation: 0,
  wrapCaptionAt: 15,
  captionLineHeight: 20,
};

export const RadarChart = props => {
  const {data, captions, options, size = defaultOptions.size, id} = props;

  const chartOptions = {
    ...defaultOptions,
    ...options,
    size,
  };

  const chart = radar(captions, data, chartOptions);

  return (
    <Svg
      version="1"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={setViewBox(chartOptions)}
      id={id}>
      {chart}
    </Svg>
  );
};
