const { createDbConn } = require("./db");
const { app } = require("./app.js");

const port = 7000;
const server = require("http").createServer(app);

createDbConn("customers")
  .then(_ => {
    server.listen(port, () => {
      console.log(`Server running at port ${port}`);
    });
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });
