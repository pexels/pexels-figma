// Generate a random number
// Used for random curated photos page
const randomNumber = (multiplier: number = 100) => {
  return Math.floor(Math.random() * multiplier);
};

export default randomNumber;
