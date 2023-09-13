const { Response, version } = require("mappersmith");
const TimeoutError = require("mappersmith/gateway/timeout-error");
const { isTimeoutError, createTimeoutError } = TimeoutError;
const github = require("./client");

if (!isTimeoutError(createTimeoutError("classic timeout error"))) {
  throw new Error("TimeoutError not OK");
}

github.Status.current().then((response) => {
  if (!(response instanceof Response)) {
    throw new Error(`Response is not a Response`);
  }

  console.log({
    version,
    status: response.data().status.description,
  });
});
