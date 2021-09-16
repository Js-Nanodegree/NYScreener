module.exports = {
  apps: [{
    name: "app1",
    script: "./index.js",
    instances: "max",
    exec_mode: "cluster",
    env_production: {
      NODE_ENV: "production",
      "APOLLO_KEY": "service:Js-Nanodegree-3304:7v9zYQ7V587AP1oF_0eT8w",
      "APOLLO_GRAPH_ID": "Js-Nanodegree-3304",
      "APOLLO_GRAPH_VARIANT": "current",
      "APOLLO_SCHEMA_REPORTING": "true",
    },
    env_development: {
      NODE_ENV: "development",
      "APOLLO_KEY": "service:Js-Nanodegree-3304:7v9zYQ7V587AP1oF_0eT8w",
      "APOLLO_GRAPH_ID": "Js-Nanodegree-3304",
      "APOLLO_GRAPH_VARIANT": "current",
      "APOLLO_SCHEMA_REPORTING": "true",
    }
  }]
}
