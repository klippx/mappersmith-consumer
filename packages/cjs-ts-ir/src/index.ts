import mappersmith = require("mappersmith");
import TimeoutError = require("mappersmith/gateway/timeout-error");
import client = require("./client");
const { github } = client;

const { Response, version } = mappersmith;
const { isTimeoutError, createTimeoutError } = TimeoutError;

if (isTimeoutError(createTimeoutError("classic timeout error"))) {
  console.log("TimeoutError OK");
} else {
  throw new Error("TimeoutError not OK");
}

github.Status.current().then((response) => {
  if (response instanceof Response) {
    console.log(`Response OK`);
  }
  console.log({
    version,
    status: response.data<{ status: { description: string } }>().status
      .description,
  });
});
