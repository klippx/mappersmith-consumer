import forge, { configs } from "mappersmith";
import FetchGateway from "mappersmith/gateway/fetch";
import _HTTPGateway from "mappersmith/gateway/http";
import _MockGateway from "mappersmith/gateway/mock";
import _XHRGateway from "mappersmith/gateway/xhr";

import _RetryMiddlewareV1 from "mappersmith/middleware/retry";
import _RetryMiddlewareV1Alt from "mappersmith/middleware/retry/v1";
import RetryMiddleware from "mappersmith/middleware/retry/v2";
import BasicAuth from "mappersmith/middlewares/basic-auth";
import CSRF from "mappersmith/middleware/csrf";
import Duration from "mappersmith/middleware/duration";
import EncodeJSON from "mappersmith/middleware/encode-json";
import ErrorHandler from "mappersmith/middleware/global-error-handler";
import Log from "mappersmith/middleware/log";
import Timeout from "mappersmith/middleware/timeout";
import type { AsyncFunction as _AsyncFunction } from "mappersmith/client-builder";
import { setContext as _setContext } from "mappersmith/mappersmith";
import { MethodDescriptor as _MethodDescriptor } from "mappersmith/method-descriptor";
import { Request as _Request } from "mappersmith/request";
import { Response as _Response } from "mappersmith/response";
import { version as _version } from "mappersmith/version";

configs.gateway = FetchGateway;

export const github = forge({
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
