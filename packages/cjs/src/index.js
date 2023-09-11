const forge = require("mappersmith").default;
const { configs } = require("mappersmith");
const FetchGateway = require("mappersmith/gateway/fetch").default;

console.log("Fetching from Github Status with mappersmith [CJS]");

configs.gateway = FetchGateway;

const github = forge({
  clientId: "github",
  host: "https://www.githubstatus.com",
  resources: {
    Status: {
      current: { path: "/api/v2/status.json" },
      summary: { path: "/api/v2/summary.json" },
      components: { path: "/api/v2/components.json" },
    },
  },
});

github.Status.current().then((response) => {
  console.log(`summary`, response.data());
});
