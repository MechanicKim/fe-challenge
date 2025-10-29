function Title({ text }) {
  const h3 = document.createElement('h3');
  h3.className = 'title';
  h3.textContent = text;
  return h3;
}

function Input({ labelText, name, type }) {
  const label = document.createElement('label');
  label.setAttribute('for', name);
  label.textContent = labelText;

  const input = document.createElement('input');
  input.type = type;
  input.id = name;
  input.name = name;
  input.autocomplete = 'off';

  const group = document.createElement('div');
  group.className = 'input-group';
  group.append(label, input);

  return group;
}

function CheckBox({ labelText }) {
  const checkBox = Input({ labelText, name: 'approval', type: 'checkbox' });
  checkBox.className = 'checkbox-group';
  return checkBox;
}

function SignUpButton() {
  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = '가입';
  return button;
}

function SignUpForm({ inputDataList, onSubmit }) {
  const title = Title({ text: '회원 가입' });
  const inputList = inputDataList.map(Input);

  const form = document.createElement('form');
  form.id = 'signup';
  form.name = 'signupForm';
  form.append(
    title,
    ...inputList,
    CheckBox({
      labelText: '서비스 이용을 위해 입력한 정보를 제공하는 것에 동의합니다.',
    }),
    SignUpButton()
  );
  form.onsubmit = (e) => {
    e.preventDefault();
    onSubmit(e.target);
  };

  return form;
}

window.onload = () => {
  const inputDataList = [
    { labelText: '이메일', name: 'email', type: 'text' },
    { labelText: '비밀번호', name: 'password', type: 'password' },
    { labelText: '비밀번호 확인', name: 'password2', type: 'password' },
    { labelText: '회원 이름', name: 'name', type: 'text' },
  ];
  const signUpForm = SignUpForm({
    inputDataList,
    onSubmit: (form) => {
      console.log(form);
    },
  });

  const root = document.getElementById('root');
  root.append(signUpForm);
};
