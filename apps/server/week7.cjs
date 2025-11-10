// 실시간 드로잉을 위한 데이터 저장소
const lines = [];
const userSet = new Set();

function listener(socket) {
  console.log("새로운 클라이언트가 연결되었습니다.");
  if (socket.id) userSet.add(socket.id);

  // 새로운 클라이언트에게 기존 라인 전체를 전송
  socket.emit("initial-lines", lines);

  // 클라이언트로부터 'draw-line' 이벤트를 받으면 다른 클라이언트들에게 브로드캐스팅
  socket.on("draw-line", (line) => {
    lines.push(line);
    socket.broadcast.emit("draw-line", line);
  });

  socket.on("disconnect", () => {
    if (socket.id) userSet.delete(socket.id);
    console.log("클라이언트 연결이 끊어졌습니다.");
  });
}

exports.listener = listener;
