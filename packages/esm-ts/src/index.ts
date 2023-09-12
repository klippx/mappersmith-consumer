import forge, { configs, version } from "mappersmith";
import type { Response as ResponseType } from "mappersmith";
import FetchGateway from "mappersmith/gateway/fetch";
import _HTTPGateway from "mappersmith/gateway/http";
import _MockGateway from "mappersmith/gateway/mock";
import _XHRGateway from "mappersmith/gateway/xhr";
import {
  isTimeoutError,
  createTimeoutError,
} from "mappersmith/gateway/timeout-error";

import _RetryMiddlewareV1 from "mappersmith/middleware/retry";
import _RetryMiddlewareV1Alt from "mappersmith/middleware/retry/v1";
import RetryMiddleware from "mappersmith/middleware/retry/v2";
import BasicAuth from "mappersmith/middleware/basic-auth";
import CSRF from "mappersmith/middleware/csrf";
import Duration from "mappersmith/middleware/duration";
import EncodeJSON from "mappersmith/middleware/encode-json";
import ErrorHandler from "mappersmith/middleware/global-error-handler";
import Log from "mappersmith/middleware/log";
import Timeout from "mappersmith/middleware/timeout";

if (isTimeoutError(createTimeoutError("classic timeout error"))) {
  console.log("TimeoutError OK");
} else {
  throw new Error("TimeoutError not OK");
}

configs.gateway = FetchGateway;

const github = forge({
  clientId: "github",
  middleware: [
    RetryMiddleware(),
    BasicAuth({
      username: "username",
      password: "password",
    }),
    CSRF(),
    Duration,
    EncodeJSON,
    ErrorHandler,
    Log,
    Timeout(1000),
  ],
  host: "https://www.githubstatus.com",
  resources: {
    Status: {
      current: { path: "/api/v2/status.json" },
      summary: { path: "/api/v2/summary.json" },
      components: { path: "/api/v2/components.json" },
    },
  },
});

github.Status.current().then(
  (response: ResponseType<{ status: { description: string } }>) => {
    if (response instanceof Response) {
      console.log(`Response OK`);
    }
    console.log({
      version,
      status: response.data().status.description,
    });
  }
);
