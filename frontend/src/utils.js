export const defaultCopy_DOM = () => {
  const inputBox = document.getElementById("inputBox");
  inputBox.classList.remove("bg-green-100");
  inputBox.classList.remove("border-green-100");
};

export const copiedBox_DOM = () => {
  const inputBox = document.getElementById("inputBox");
  inputBox.classList.add("bg-green-100");
  inputBox.classList.add("border-green-100");
};
