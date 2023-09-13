const mappersmith = require("mappersmith");
const { Response: MResponse, version } = mappersmith;

const TimeoutError = require("mappersmith/gateway/timeout-error");
const { isTimeoutError, createTimeoutError } = TimeoutError;

const { github } = require("./client");

if (!isTimeoutError(createTimeoutError("classic timeout error"))) {
  throw new Error("TimeoutError not OK");
}

github.Status.current().then((response: any) => {
  if (!(response instanceof MResponse)) {
    throw new Error(`Response is not a Response`);
  }

  console.log({
    version,
    status: response.data().status.description,
  });
});
