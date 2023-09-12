import { version } from "mappersmith";
import type { Response as ResponseType } from "mappersmith";

import {
  isTimeoutError,
  createTimeoutError,
} from "mappersmith/gateway/timeout-error";

if (isTimeoutError(createTimeoutError("classic timeout error"))) {
  console.log("TimeoutError OK");
} else {
  throw new Error("TimeoutError not OK");
}

import { github } from "./client.js";

github.Status.current().then(
  (response: ResponseType<{ status: { description: string } }>) => {
    if (response instanceof Response) {
      console.log(`Response OK`);
    }
    const status = response.data<{ status: { description: string } }>().status
      .description;
    console.log({
      version,
      status,
    });
  }
);
