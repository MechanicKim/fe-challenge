function reqHandler(req, res) {
  res.status(200).json({
    success: true,
    features: [
      {
        id: 1,
        img: {
          src: "http://127.0.0.1:3000/images/deng-xiang--WXQm_NTK0U-unsplash.jpg",
          alt: "기능 1 시각 자료",
        },
        title: "실시간 데이터 분석",
        description: "복잡한 데이터를 직관적인 대시보드로 한눈에 파악하세요.",
      },
      {
        id: 2,
        img: {
          src: "http://127.0.0.1:3000/images/kelly-sikkema-wdnpaTNwOEQ-unsplash.jpg",
          alt: "기능 2 시각 자료",
        },
        title: "자동화된 워크플로우",
        description: "반복적인 업무를 자동화하여 팀의 생산성을 극대화합니다.",
      },
      {
        id: 3,
        img: {
          src: "http://127.0.0.1:3000/images/franck-DoWZMPZ-M9s-unsplash.jpg",
          alt: "기능 3 시각 자료",
        },
        title: "강력한 보안",
        description: "최신 보안 기술을 적용하여 당신의 데이터를 안전하게 보호합니다.",
      },
    ],
  });
}

exports.reqHandler = reqHandler;
