export function Validator(validationSchema) {
  const targetMap = {};

  function validateTarget(input) {
    const inputValue = input.type === "checkbox" ? input.checked : input.value;
    const schema = validationSchema[input.name];
    const keys = Object.keys(schema);

    for (const key of keys) {
      if (
        (key === "required" && !inputValue) ||
        (key === "regex" && !schema[key].test(inputValue)) ||
        (key === "minLength" && inputValue.length < schema[key]) ||
        (key === "match" && inputValue !== targetMap[schema[key]].value)
      ) {
        return { result: false, message: schema.message[key] };
      }
    }

    return { result: true };
  }

  return {
    regist: (target) => {
      targetMap[target.name] = target;
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
