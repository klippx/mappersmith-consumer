import { forge, configs } from "mappersmith";
import {
  FetchGateway,
  HTTPGateway as _HTTPGateway,
  MockGateway as _MockGateway,
  XHRGateway as _XHRGateway,
} from "mappersmith/gateway";

import {
  RetryMiddleware,
  BasicAuthMiddleware,
  CsrfMiddleware,
  DurationMiddleware,
  EncodeJsonMiddleware,
  GlobalErrorHandlerMiddleware,
  LogMiddleware,
  TimeoutMiddleware,
} from "mappersmith/middleware";

import { setContext as _setContext } from "mappersmith";
import { MethodDescriptor as _MethodDescriptor } from "mappersmith";
import { Request as _Request } from "mappersmith";
import { Response as _Response } from "mappersmith";
import { version as _version } from "mappersmith";

configs.gateway = FetchGateway;

export const github = forge({
  clientId: "github",
  middleware: [
    RetryMiddleware(),
    BasicAuthMiddleware({
      username: "username",
      password: "password",
    }),
    CsrfMiddleware(),
    DurationMiddleware,
    EncodeJsonMiddleware,
    GlobalErrorHandlerMiddleware,
    LogMiddleware,
    TimeoutMiddleware(1000),
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
