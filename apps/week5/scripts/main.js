import { Validator } from "./Validator.js";
import { validationSchema } from "./validationSchema.js";

window.onload = () => {
  const validator = Validator(validationSchema);

  const form = document.signupForm;
  const inputGroupList = [...form.querySelectorAll(".input-group")];
  const checkBoxGroupList = [...form.querySelectorAll(".checkbox-group")];
  const allInputGroups = [...inputGroupList, ...checkBoxGroupList];

  for (const inputGroup of allInputGroups) {
    const input = inputGroup.querySelector("input");
    const error = inputGroup.querySelector(".error");

    validator.regist(input);

    if (input.type === "checkbox") {
      input.onchange = () => {
        const { result, message } = validator.validate(input.name);
        error.textContent = result ? "" : message;
      };
    } else {
      input.onkeyup = () => {
        const { result, message } = validator.validate(input.name);
        error.textContent = result ? "" : message;
      };
    }
  }

  form.onsubmit = (e) => {
    e.preventDefault();
    const allInputGroups = [...inputGroupList, ...checkBoxGroupList];
    for (const inputGroup of allInputGroups) {
      const input = inputGroup.querySelector("input");
      const { result, message } = validator.validate(input.name);

      if (!result) {
        const error = inputGroup.querySelector(".error");
        error.textContent = message;
        return;
      }
    }

    console.log("유효성 검사 통과!");
    const formData = new FormData(form);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  };
};
