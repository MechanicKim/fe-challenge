const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const port = 3000;

app.use(express.static('public'));

// CORS 설정: 프론트엔드(웹페이지)에서 서버로 요청을 보낼 수 있도록 허용
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

// 웹 소켓 서버 객체 준비
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

// Week1 API - 트래픽 데이터
const week1 = require('./week1.cjs');
app.get('/api/week1/traffic', week1.reqHandler);

// Week2 API - 파일 업로드 처리 엔드포인트
const week2 = require('./week2.cjs');
app.post('/api/week2/upload', week2.upload.single('file'), week2.reqHandler);

// Week4 API - 사용자 목록 데이터
const week4 = require('./week4.cjs');
app.get('/api/week4/users', week4.reqHandler);

// Week7 - 실시간 드로잉을 위한 데이터 저장소
const week7 = require('./week7.cjs');
io.on('connection', week7.listener);

// Week8 - Next/Nuxt 기반의 고성능 랜딩 페이지 목업 구현
const week8 = require('./week8.cjs');
app.get('/api/week8/features', week8.reqHandler);

// 서버 시작
httpServer.listen(port, () => {
  console.log(`🚀 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
