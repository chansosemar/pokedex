import useFetchData from './UseFetchData';

const capitalizeFirstLetter = (string: string) => {
  if (
    string === null ||
    string === undefined ||
    string === '' ||
    string?.charAt(0) === undefined
  )
    return undefined;
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

function randomColor() {
  // Generate random values for red, green, and blue components (0-255).
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Create the RGB color string.
  const color = `rgb(${red}, ${green}, ${blue})`;

  return color;
}

export {useFetchData, capitalizeFirstLetter, randomColor};
