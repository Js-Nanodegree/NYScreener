const throng = require("throng");
const { master, worker } = require('./src/server')
const os = require("os");

throng({
    master,
    worker,
    count: os.cpus().length,
    signals: ["SIGTERM", "SIGINT"],
});
