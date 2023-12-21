import mappersmith = require("mappersmith");
const { default: forge, Response, configs, version } = mappersmith;
import FetchGateway = require("mappersmith/gateway/fetch");
import _HTTPGateway = require("mappersmith/gateway/http");
import _MockGateway = require("mappersmith/gateway/mock");
// import _XHRGateway = require("mappersmith/gateway/xhr");
import TimeoutError = require("mappersmith/gateway/timeout-error");
const { isTimeoutError, createTimeoutError } = TimeoutError;

// import _RetryMiddlewareV1 = require("mappersmith/middleware/retry");
import _RetryMiddlewareV1Alt = require("mappersmith/middleware/retry/v1");
import RetryMiddleware = require("mappersmith/middleware/retry/v2");
import BasicAuth = require("mappersmith/middlewares/basic-auth");
import CSRF = require("mappersmith/middleware/csrf");
import Duration = require("mappersmith/middleware/duration");
import EncodeJSON = require("mappersmith/middleware/encode-json");
import ErrorHandler = require("mappersmith/middleware/global-error-handler");
import Log = require("mappersmith/middleware/log");
import Timeout = require("mappersmith/middleware/timeout");

configs.gateway = FetchGateway.default;

export const github = forge({
  clientId: "github",
  middleware: [
    RetryMiddleware.default(),
    BasicAuth.default({
      username: "username",
      password: "password",
    }),
    CSRF.default(),
    Duration.default,
    EncodeJSON.default,
    ErrorHandler.default,
    Log.default,
    Timeout.default(1000),
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
