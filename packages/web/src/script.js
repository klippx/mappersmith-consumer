import mappersmith from "./mappersmith.production.min.mjs";
// import mappersmith from "./mappersmith-2.35.0.js";
const forge = mappersmith.default;
const configs = mappersmith.configs;
const version = mappersmith.version;

configs.gatewayConfigs.XHR = {
  withCredentials: false,
  configure(xhr) {
    xhr.ontimeout = () => console.error("timeout!");
  },
};

const github = forge({
  host: "https://www.githubstatus.com/",
  resources: {
    Status: {
      status: { path: "/api/v2/status.json" },
    },
  },
});

// profit!
const response = await github.Status.status();

console.log(`mappersmith version ${version}`, response.data());
console.log(`loaded in ${response.timeElapsed}ms`);
