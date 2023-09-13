const forge = require("mappersmith").default;
const { configs, version } = require("mappersmith");
const FetchGateway = require("mappersmith/gateway/fetch").default;
const _HTTPGateway = require("mappersmith/gateway/http");
const _MockGateway = require("mappersmith/gateway/mock");
const _XHRGateway = require("mappersmith/gateway/xhr");
const TimeoutError = require("mappersmith/gateway/timeout-error");
const { isTimeoutError, createTimeoutError } = TimeoutError;
const github = require("./client");

if (isTimeoutError(createTimeoutError("classic timeout error"))) {
  console.log("TimeoutError OK");
} else {
  throw new Error("TimeoutError not OK");
}

configs.gateway = FetchGateway;

github.Status.current().then((response) => {
  if (response instanceof Response) {
    console.log(`Response OK`);
  }
  console.log({
    version,
    status: response.data().status.description,
  });
});
