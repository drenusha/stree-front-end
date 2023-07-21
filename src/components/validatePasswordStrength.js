import zxcvbn from "zxcvbn";

const validatePasswordStrength = (password) => {
  const passwordResult = zxcvbn(password);
  return passwordResult.score;
};

export default validatePasswordStrength;
