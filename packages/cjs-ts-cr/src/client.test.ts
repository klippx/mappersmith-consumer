import testLib = require("mappersmith/test");
import {
  describe,
  afterAll,
  beforeAll,
  beforeEach,
  expect,
  test,
} from "vitest";
import { github } from "./client";

const { install, uninstall, mockRequest } = testLib;

describe("github client", () => {
  let mockSource: any;
  beforeAll(() => {
    install({ richMockErrors: true });
  });

  afterAll(() => {
    uninstall();
  });

  beforeEach(() => {
    mockSource = mockRequest({
      method: "get",
      url: "https://www.githubstatus.com/api/v2/status.json",
      response: {
        status: 200,
        body: {
          status: {
            description: "All Systems Operational",
          },
        },
      },
    });
  });

  test("github client works", async () => {
    const response = await github.Status.current();
    expect(response.data()).toMatchInlineSnapshot(`
      {
        "status": {
          "description": "All Systems Operational",
        },
      }
    `);
    expect(mockSource.callsCount()).toEqual(1);
  });

  test("enhanced debugging of missing mappersmith mock works", async () => {
    const response = await github.Status.summary().catch((r: unknown) => r);
    const message = response.errors[0].message.replace(
      /x-started-at=\d+/g,
      "x-started-at=<timestamp>",
    );
    expect(message).toMatchInlineSnapshot(`
      "


      ------------------------------------------------------------------------------------------------------------------
      Mappersmith matches a mock to an outgoing request by comparing the request's URL, METHOD, BODY and HEADERS.

      URL:     The URL is sorted and normalized before comparison.
      BODY:    The BODY is sorted and normalized in the form of a query-string before comparison.
      HEADERS: The headers of the outgoing request is stripped of any headers that are not present in the
               mock definition headers and then sorted and normalized before comparison.
      METHOD:  The method of the outgoing request is compared as is.
      ------------------------------------------------------------------------------------------------------------------

      Request:
        [1mUrl     [22m https://www.githubstatus.com/api/v2/summary.json
        Method   get
        Body     undefined
        Headers  x-started-at=<timestamp>

      Mock definitions installed:

      [32m●[39m Exact match
      [33m●[39m Partial match (When URL and METHOD match)
      [31m●[39m Not matching

      [32mMock value matches the request value[39m
      [42mPresent in mock but not in request[49m
      [41mPresent in request but not in mock[49m

      [31m✗[39m [1m1[22m
        [1mUrl     [22m [31mNo [39m  [31m[31mhttps://www.githubstatus.com/api/v2/summary.json[39m → [32mhttps://www.githubstatus.com/api/v2/status.json[39m[39m
        [1mMethod  [22m [32mYes[39m  [32mget[39m
        [1mBody    [22m [32mYes[39m  [32mMATCHED_AS_UNDEFINED_IN_MOCK[39m
        [1mHeaders [22m [32mYes[39m  [32mMATCHED_AS_UNDEFINED_IN_MOCK[39m

      [31m✗[39m [1m2[22m
        [1mUrl     [22m [31mNo [39m  [31m[31mhttps://www.githubstatus.com/api/v2/summary.json[39m → [32mhttps://www.githubstatus.com/api/v2/status.json[39m[39m
        [1mMethod  [22m [32mYes[39m  [32mget[39m
        [1mBody    [22m [32mYes[39m  [32mMATCHED_AS_UNDEFINED_IN_MOCK[39m
        [1mHeaders [22m [32mYes[39m  [32mMATCHED_AS_UNDEFINED_IN_MOCK[39m

      NOTE: Install optional peer dependencies for richer output: "diff" (character-level diffs) and "tty-table" (formatted tables). See https://github.com/tulios/mappersmith#enhanced-debugging


      [31m[Mappersmith Test] No match found, check your mock definitions, debug information available above.[39m
      "
    `);
  });
});
