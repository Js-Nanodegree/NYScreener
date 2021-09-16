
module.exports = {
    apps : [{
      name   : "app1",
      script : "babel-node ./src/server/express.js",
      env_production: {
        NODE_ENV: "production"
     },
     env_development: {
        NODE_ENV: "development"
     }
    }]
  }