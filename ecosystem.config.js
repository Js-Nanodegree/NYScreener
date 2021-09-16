module.exports = {
  apps: [{
    name: "app",
    "script": "npm",
    "args": "server",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}