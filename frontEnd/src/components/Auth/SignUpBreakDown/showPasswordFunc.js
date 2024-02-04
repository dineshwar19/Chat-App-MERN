// showPasswordFunc.js
const showPasswordFunc = (e, setpassType, setShowPassword, showPassword) => {
  e.preventDefault();
  setShowPassword(!showPassword);
  setpassType(showPassword ? "text" : "password");
};
export default showPasswordFunc;
