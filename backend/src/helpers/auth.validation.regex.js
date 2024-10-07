const emailRegex =
  /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const mobileNumberRegex = /^[6-9]\d{9}$/;

const validateEmail = (email) => {
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return passwordRegex.test(password);
};

const validateMobileNumber = (mobileNumber) => {
    mobileNumber = mobileNumber.slice(3, 13)
  return mobileNumberRegex.test(mobileNumber.toString());
};

module.exports = {
  validateEmail,
  validatePassword,
  validateMobileNumber,
};
