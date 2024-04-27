import app from "./app.js";
const PORT = process.env.APP_PORT || 5010;

app.listen(PORT, () => {
  console.log("Express server running at http://localhost:" + PORT);
});
