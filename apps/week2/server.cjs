const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// CORS 설정: 프론트엔드(웹페이지)에서 서버로 요청을 보낼 수 있도록 허용
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

// Multer 설정: 파일 저장 위치와 이름 지정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, name + '-' + Date.now() + ext);
  },
});

// Multer 인스턴스 생성
const upload = multer({ storage: storage });

// 파일 업로드 처리 엔드포인트
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('업로드된 파일이 없습니다.');
  }

  console.log(`파일 업로드 성공: ${req.file.filename}`);
  console.log(`저장 경로: ${req.file.path}`);

  res.status(200).json({
    message: '파일 업로드 성공',
    filename: req.file.filename,
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`🚀 서버가 http://localhost:${port} 에서 실행 중입니다.`);
  console.log(`프론트엔드에서 /upload 엔드포인트로 파일을 전송해주세요.`);
});
