import {
  describe,
  afterAll,
  beforeAll,
  beforeEach,
  expect,
  test,
} from "vitest";
import { install, uninstall, mockRequest, MockAssert } from "mappersmith/test";
import { github } from "./client";

describe("github client", () => {
  let mockSource: MockAssert;
  beforeAll(() => {
    install();
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

  test("standard debugging of mappersmith error during testing works", async () => {
    const response = await github.Status.summary().catch((r) => r);
    const message = response.errors[0].message.replace(
      /x-started-at=\d+/g,
      "x-started-at=<timestamp>",
    );
    expect(message).toMatchInlineSnapshot(
      `"[Mappersmith Test] No match found for "GET https://www.githubstatus.com/api/v2/summary.json" (body: "undefined"; headers: "x-started-at=<timestamp>"), check your mock definition"`,
    );
  });
});
