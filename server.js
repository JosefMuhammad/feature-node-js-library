const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const userRouter = require("./routes/usersRoutes");
const bookRouter = require("./routes/booksRoutes");
const morgan = require("morgan");
const camelcaseKeys = (...args) =>
  import("camelcase-keys").then(({ default: camelcase }) => camelcase(args));
const omitEmpty = require("omit-empty");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const teacherModel = require("./models/teacher");
const courseModel = require("./models/course");
const coursesRouter = require("./routes/coursesRoute");
const commentModel = require("./models/comment");
const sessionsModel = require("./models/session");
const uploader = require("./middlewares/multer");

require("./configs/db");

const app = express(); // server
// app.use(express.json());
// app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public"))); //By this code backend will recieve photoes, texts and styles from public folder

const camelcase = async (req, res, next) => {
  req.body = await camelcaseKeys(req.body, { deep: true });
  req.params = await camelcaseKeys(req.params);
  req.query = await camelcaseKeys(req.query);

  next();
};

const removeEmptyFields = (options) => {
  return function (req, res, next) {
    req.body = omitEmpty(req.body, options);
    return next();
  };
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(camelcase);
// app.use(removeEmptyFields({ omitZero: true }));
// app.use(helmet()); //security middleware
// app.use(cors());
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "index.html"));
// });

app.post("/", uploader.array("profile", 3), async (req, res) => {
  res.json(req.file);
});

app.use(morgan("dev"));

app.use("/api/users/", userRouter);
app.use("/api/books/", bookRouter);
app.use("/api/courses", coursesRouter);

app.use((req, res) => {
  return res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000, () => {
  console.log(`Server Running On Port 3000`);
});
