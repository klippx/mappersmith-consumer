const mappersmith = require("mappersmith");
const { default: forge, configs, version } = mappersmith;
const FetchGateway = require("mappersmith/gateway/fetch");
const _HTTPGateway = require("mappersmith/gateway/http");
const _MockGateway = require("mappersmith/gateway/mock");
// const _XHRGateway = require("mappersmith/gateway/xhr");
const TimeoutError = require("mappersmith/gateway/timeout-error");
const { isTimeoutError, createTimeoutError } = TimeoutError;

const _RetryMiddlewareV1 = require("mappersmith/middleware/retry");
const _RetryMiddlewareV1Alt = require("mappersmith/middleware/retry/v1");
const RetryMiddleware = require("mappersmith/middleware/retry/v2");
const BasicAuth = require("mappersmith/middleware/basic-auth");
const CSRF = require("mappersmith/middleware/csrf");
const Duration = require("mappersmith/middleware/duration");
const EncodeJSON = require("mappersmith/middleware/encode-json");
const ErrorHandler = require("mappersmith/middleware/global-error-handler");
const Log = require("mappersmith/middleware/log");
const Timeout = require("mappersmith/middleware/timeout");

if (isTimeoutError(createTimeoutError("classic timeout error"))) {
  console.log("TimeoutError OK");
} else {
  throw new Error("TimeoutError not OK");
}

configs.gateway = FetchGateway.default;

const github = forge({
  clientId: "github",
  host: "https://www.githubstatus.com",
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
  resources: {
    Status: {
      current: { path: "/api/v2/status.json" },
      summary: { path: "/api/v2/summary.json" },
      components: { path: "/api/v2/components.json" },
    },
  },
});

github.Status.current().then((response: any) => {
  if (response instanceof Response) {
    console.log(`Response OK`);
  }
  console.log({
    version,
    status: response.data().status.description,
  });
});
