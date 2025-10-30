function Validator() {
  const targetMap = {};

  function validateCheckBox(input) {
    const { checked, dataset } = input;
    const rules = dataset.rules.split('|');

    for (const rule of rules) {
      const [key] = rule.split(':');

      if (key === 'required' && !checked) {
        return { result: false, message: '필수 체크입니다.' };
      }
    }

    return { result: true };
  }

  function validateTarget(input) {
    const inputValue = input.value;
    const rules = input.dataset.rules.split('|');

    if (input.type === 'checkbox') {
      return validateCheckBox(input);
    }

    for (const rule of rules) {
      const [key, value] = rule.split(':');

      if (key === 'required' && !inputValue) {
        return { result: false, message: '필수 입력입니다.' };
      }

      if (key === 'min' && inputValue.length < +value) {
        return { result: false, message: `최소 ${value}자 입력입니다.` };
      }

      if (key === 'max' && inputValue.length > +value) {
        return { result: false, message: `최대 ${value}자 입력입니다.` };
      }

      if (key === 'match' && inputValue !== targetMap[value].value) {
        return { result: false, message: '입력 값이 일치하지 않습니다.' };
      }
    }

    return { result: true };
  }

  return {
    regist: (target) => {
      const name = target.name;
      targetMap[name] = target;
    },
    validate: (name) => {
      const input = targetMap[name];
      if (!input) {
        console.error(`${name} - validator에 등록되지 않았습니다.`);
      } else {
        return validateTarget(input);
      }
    },
  };
}

window.onload = () => {
  const validator = Validator();

  const form = document.signupForm;
  const inputGroupList = [...form.querySelectorAll('.input-group')];
  const checkBoxGroupList = [...form.querySelectorAll('.checkbox-group')];
  const allInputGroups = [...inputGroupList, ...checkBoxGroupList];

  for (const inputGroup of allInputGroups) {
    const input = inputGroup.querySelector('input');
    const error = inputGroup.querySelector('.error');

    validator.regist(input);

    if (input.type === 'checkbox') {
      input.onchange = () => {
        const { result, message } = validator.validate(input.name);
        error.textContent = result ? '' : message;
      };
    } else {
      input.onkeyup = () => {
        const { result, message } = validator.validate(input.name);
        error.textContent = result ? '' : message;
      };
    }
  }

  form.onsubmit = (e) => {
    e.preventDefault();
    const allInputGroups = [...inputGroupList, ...checkBoxGroupList];
    for (const inputGroup of allInputGroups) {
      const input = inputGroup.querySelector('input');
      const error = inputGroup.querySelector('.error');
      const { result, message } = validator.validate(input.name);
      error.textContent = result ? '' : message;
      if (!result) return;
    }

    console.log('유효성 검사 통과!');
    const formData = new FormData(form);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  };
};
