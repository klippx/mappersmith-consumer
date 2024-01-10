import forge, { configs, version } from "mappersmith";

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
github.Status.status().then((response) => {
  console.log(`mappersmith version ${version}`, response.data());
  console.log(`loaded in ${response.timeElapsed}ms`);
});
