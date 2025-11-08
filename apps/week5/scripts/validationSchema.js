export const validationSchema = {
  email: {
    required: true,
    regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: {
      required: "이메일은 필수 입력 항목입니다.",
      regex: "유효하지 않은 이메일 형식입니다",
    },
  },
  password: {
    required: true,
    minLength: 12,
    message: {
      required: "비밀번호는 필수 입력 항목입니다.",
      minLength: "최소 12자 이상 입력해야 합니다.",
    },
  },
  password2: {
    required: true,
    minLength: 12,
    match: "password",
    message: {
      required: "확인 비밀번호는 필수 입력 항목입니다.",
      minLength: "최소 12자 이상 입력해야 합니다.",
      match: "비밀번호와 일치하는 값을 입력해야 합니다.",
    },
  },
  userName: {
    required: true,
    message: {
      required: "회원 이름은 필수 입력 항목입니다.",
    },
  },
  usageConsent: {
    required: true,
    message: {
      required: "이용약관에 동의해야 합니다.",
    },
  },
};
