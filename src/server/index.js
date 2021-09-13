const express = require("express");

function startExpressApp() {
    const app = express();
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () =>
        console.info(`server listening on port ${server.address().port}`)
    );
}

const worker = async (workerId, disconnect) => {
    startExpressApp();
    const shutdown = () => {
        disconnect();
    };
    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
};

const master = async () => {
    console.log("Started master.");
};


module.exports = {
    worker,
    master
}