import mappersmith = require("mappersmith");
const { default: forge, configs, version } = mappersmith;
import FetchGateway = require("mappersmith/gateway/fetch");

console.log(
  "Fetching from Github Status with mappersmith [CJS with typescript, import/require]"
);

configs.gateway = FetchGateway.default;

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
  console.log(`mappersmith version ${version}`, response.data());
});
