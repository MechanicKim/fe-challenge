// 실시간 드로잉을 위한 데이터 저장소
const lines = {};

function listener(socket) {
  console.log("새로운 클라이언트가 연결되었습니다.");

  // 새로운 클라이언트에게 기존 라인 전체를 전송
  socket.emit("initial-lines", lines);

  // 클라이언트로부터 'draw-line' 이벤트를 받으면 다른 클라이언트들에게 브로드캐스팅
  socket.on("draw-line", (line) => {
    if (!lines[socket.id]) lines[socket.id] = {};
    if (!lines[socket.id][line.timestamp]) {
      lines[socket.id][line.timestamp] = {
        userID: line.userID,
        color: line.color,
        lineWidth: line.lineWidth,
        points: line.points,
      };
    } else {
      lines[socket.id][line.timestamp].points = line.points;
    }

    socket.broadcast.emit("initial-lines", lines);
  });

  socket.on("undo", () => {
    if (lines[socket.id]) {
      const timestamps = Object.keys(lines[socket.id]);
      timestamps.sort();
      const last = timestamps.pop();
      delete lines[socket.id][last];

      socket.emit("initial-lines", lines);
      socket.broadcast.emit("initial-lines", lines);
    }
  });

  socket.on("disconnect", () => {
    console.log("클라이언트 연결이 끊어졌습니다.");
  });
}

exports.listener = listener;
