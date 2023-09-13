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
});
