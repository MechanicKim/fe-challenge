const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static('public'));

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

app.get('/api/week1/traffic', (req, res) => {
  try {
    const period = +(req.query.period || '1');

    const data = JSON.parse(fs.readFileSync('./public/traffic.json', 'utf-8'));
    const sliceStart = period === 0 ? 0 : data.length - period;
    const sliced = data.slice(sliceStart);

    res.status(200).json({
      success: true,
      data: sliced,
    });
  } catch(error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`🚀 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
