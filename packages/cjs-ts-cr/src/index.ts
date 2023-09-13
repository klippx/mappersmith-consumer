const mappersmith = require("mappersmith");
const { version } = mappersmith;

const TimeoutError = require("mappersmith/gateway/timeout-error");
const { isTimeoutError, createTimeoutError } = TimeoutError;

const { github } = require("./client");

if (isTimeoutError(createTimeoutError("classic timeout error"))) {
  console.log("TimeoutError OK");
} else {
  throw new Error("TimeoutError not OK");
}

github.Status.current().then((response: any) => {
  if (response instanceof Response) {
    console.log(`Response OK`);
  }
  console.log({
    version,
    status: response.data().status.description,
  });
});
