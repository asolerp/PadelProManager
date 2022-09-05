import React from 'react';
import {Polyline, Circle, Path, G, Text} from 'react-native-svg';

const polarToX = (angle, distance) => Math.cos(angle - Math.PI / 2) * distance;

const polarToY = (angle, distance) => Math.sin(angle - Math.PI / 2) * distance;

const points = points => {
  return points
    .map(point => point[0].toFixed(4) + ',' + point[1].toFixed(4))
    .join(' ');
};

const axis = options => (col, i) =>
  (
    <Polyline
      key={`poly-axis-${i}`}
      points={points([
        [0, 0],
        [
          polarToX(col.angle, options.chartSize / 2),
          polarToY(col.angle, options.chartSize / 2),
        ],
      ])}
      {...options.axisProps(col)}
    />
  );

const dot = (columns, options) => (chartData, i) => {
  const data = chartData.data;
  const meta = chartData.meta || {};
  const extraProps = options.dotProps(meta);
  let extraPropsSvg = {};

  if (extraProps.r) {
    extraPropsSvg.r = extraProps.r;
  }
  if (extraProps.fill) {
    extraPropsSvg.fill = extraProps.fill;
  }
  if (extraProps.stoke) {
    extraPropsSvg.stroke = extraProps.stroke;
  }
  if (extraProps.stokeWidth) {
    extraPropsSvg.strokeWidth = extraProps.strokeWidth;
  }
  return columns.map(col => {
    const val = data[col.key];
    if (typeof val !== 'number') {
      throw new Error(`Data set ${i} is invalid.`);
    }

    return (
      <Circle
        key={`dot-${col.key}-${val}`}
        cx={polarToX(col.angle, (val * options.chartSize) / 2)}
        cy={polarToY(col.angle, (val * options.chartSize) / 2)}
        {...extraPropsSvg}
      />
    );
  });
};

const shape = (columns, options) => (chartData, i) => {
  const data = chartData.data;
  const meta = chartData.meta || {};
  const extraProps = options.shapeProps(meta);
  let extraPropsSvg = {};
  if (!meta.fill) {
    meta.fill = `${meta.color}90`;
  }
  if (meta.strokeWidth) {
    extraPropsSvg.strokeWidth = meta.strokeWidth;
  }
  if (meta.strokeDasharray) {
    extraPropsSvg.strokeDasharray = meta.strokeDasharray;
  }
  if (meta.strokeLinecap) {
    extraPropsSvg.strokeLinecap = meta.strokeLinecap;
  }
  return (
    <Path
      key={`shape-${i}`}
      d={options.smoothing(
        columns.map(col => {
          const val = data[col.key];
          if (typeof val !== 'number') {
            throw new Error(`Data set ${i} is invalid.`);
          }

          return [
            polarToX(col.angle, (val * options.chartSize) / 2),
            polarToY(col.angle, (val * options.chartSize) / 2),
          ];
        }),
      )}
      {...extraProps}
      {...extraPropsSvg}
      stroke={meta.color}
      fill={meta.fill}
      className={[extraProps.className, meta.class].join(' ')}
    />
  );
};

const scale = (options, value) => (
  <Circle
    key={`circle-${value}`}
    cx={0}
    cy={0}
    r={(value * options.chartSize) / 2}
    {...options.scaleProps(value)}
  />
);

const caption = options => col => {
  let wrapped = 1;
  if (col.caption.length > options.wrapCaptionAt) {
    wrapped = Math.round(col.caption.length / options.wrapCaptionAt);
  }
  const fontSize = (options.captionProps(col).fontSize || 12) / 2;
  return new Array(wrapped).fill().map((_, index) => (
    <Text
      key={`caption-of-${col.key}-${index}`}
      x={polarToX(col.angle, (options.size / 2) * 0.95).toFixed(4)}
      y={(
        polarToY(col.angle, (options.size / 2) * 0.95) +
        options.captionLineHeight * index
      ).toFixed(4)}
      dy={fontSize}
      {...options.captionProps(col)}>
      {col.caption.substring(
        index * options.wrapCaptionAt,
        (index + 1) * options.wrapCaptionAt,
      )}
    </Text>
  ));
};

const render = (captions, chartData, options = {}) => {
  if (typeof captions !== 'object' || Array.isArray(captions)) {
    throw new Error('caption must be an object');
  }
  if (!Array.isArray(chartData)) {
    throw new Error('data must be an array');
  }
  options.chartSize = options?.size / options?.zoomDistance;

  const {rotation = 0} = options;

  const columns = Object.keys(captions).map((key, i, all) => {
    const angle = (Math.PI * 2 * i) / all.length + rotation * (Math.PI / 180);
    return {
      key,
      caption: captions[key],
      angle: angle,
    };
  });
  const groups = [
    <G key={'g-groups}'}>{chartData.map(shape(columns, options))}</G>,
  ];
  if (options.captions) {
    groups.push(<G key={'poly-captions'}>{columns.map(caption(options))}</G>);
  }
  if (options.dots) {
    groups.push(<G key={'g-dots'}>{chartData.map(dot(columns, options))}</G>);
  }
  if (options.axes) {
    groups.unshift(<G key={'group-axes'}>{columns.map(axis(options))}</G>);
  }
  if (options.scales > 0) {
    const scales = [];
    for (let i = options.scales; i > 0; i--) {
      scales.push(scale(options, i / options.scales));
    }
    groups.unshift(<G key={'poly-scales'}>{scales}</G>);
  }
  const delta = (options?.size / 2).toFixed(4);
  return <G transform={`translate(${delta},${delta})`}>{groups}</G>;
};

export default render;
