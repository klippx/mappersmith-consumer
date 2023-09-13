import { version, Response } from "mappersmith";
import {
  isTimeoutError,
  createTimeoutError,
} from "mappersmith/gateway/timeout-error";
import { github } from "./client";

if (!isTimeoutError(createTimeoutError("classic timeout error"))) {
  throw new Error("TimeoutError not OK");
}

github.Status.current().then((response) => {
  if (!(response instanceof Response)) {
    throw new Error(`Response is not a Response`);
  }
  const status = response.data<{ status: { description: string } }>().status
    .description;
  console.log({
    version,
    status,
  });

  return status;
});
