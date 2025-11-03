const fs = require('fs');

function reqHandler(req, res) {
  try {
    const period = +(req.query.period || "1");

    const data = JSON.parse(fs.readFileSync("./public/traffic.json", "utf-8"));
    const sliceStart = period === 0 ? 0 : data.length - period;
    const sliced = data.slice(sliceStart);

    res.status(200).json({
      success: true,
      data: sliced,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
}

exports.reqHandler = reqHandler;
