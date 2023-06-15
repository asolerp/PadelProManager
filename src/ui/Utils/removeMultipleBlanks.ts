export const removeMultipleBlanks = string => string.replace(/ +(?= )/g, '');
export const removeBlanks = string => string.replace(/\s/g, '');
