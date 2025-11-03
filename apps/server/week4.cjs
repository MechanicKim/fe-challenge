const fs = require("fs");

function filterByNameAndStatus(users, name, status) {
  const filteredByName = name
    ? users.filter((user) => user.name.indexOf(name) > -1)
    : users;
  return filteredByName.filter((user) => {
    if (status === "all") return true;
    if (status === "active") return user.status === "활성";
    return user.status === "비활성";
  });
}

function sortByField(users, [field, type]) {
  const clone = [...users];
  if (type === "desc") {
    clone.sort((a, b) => {
      const aVal = field === "id" ? +a[field] : a[field];
      const bVal = field === "id" ? +b[field] : b[field];
      if (aVal < bVal) return 1;
      if (aVal > bVal) return -1;
      return 0;
    });
  } else {
    clone.sort((a, b) => {
      const aVal = field === "id" ? +a[field] : a[field];
      const bVal = field === "id" ? +b[field] : b[field];
      if (aVal < bVal) return -1;
      if (aVal > bVal) return 1;
      return 0;
    });
  }
  return clone;
}

function sliceByPageAndCount(users, page, count) {
  const start = ((page || 1) - 1) * (count || 10);
  const end = start + (count || 10);
  return users.slice(start, end);
}

function reqHandler(req, res) {
  try {
    const { status, name, sort } = req.query;
    const page = +(req.query.page || 1);
    const count = +(req.query.count || 10);

    const userListData = JSON.parse(
      fs.readFileSync("./public/users.json", "utf-8")
    );
    const filtered = filterByNameAndStatus(userListData, name, status);
    const sorted = sort ? sortByField(filtered, sort.split(",")) : filtered;
    const sliced = sliceByPageAndCount(sorted, page, count);

    res.status(200).json({
      success: true,
      data: sliced,
      total: filtered.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
}

exports.reqHandler = reqHandler;
