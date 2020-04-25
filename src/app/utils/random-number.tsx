// Generate a random number
// Used for random curated photos page
const randomNumber = (multiplier: number = 100) => {
  return Math.round(Math.random() * multiplier);
};

export default randomNumber;
