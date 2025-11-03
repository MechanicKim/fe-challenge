const path = require("path");
const multer = require("multer");

// Multer 설정: 파일 저장 위치와 이름 지정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, name + "-" + Date.now() + ext);
  },
});

// Multer 인스턴스 생성
const upload = multer({ storage: storage });

function reqHandler(req, res) {
  if (!req.file) {
    return res.status(400).send("업로드된 파일이 없습니다.");
  }

  console.log(`파일 업로드 성공: ${req.file.filename}`);
  console.log(`저장 경로: ${req.file.path}`);

  res.status(200).json({
    message: "파일 업로드 성공",
    filename: req.file.filename,
  });
}

exports.upload = upload;
exports.reqHandler = reqHandler;
