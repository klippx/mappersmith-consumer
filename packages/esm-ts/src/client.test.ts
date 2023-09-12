import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { install, uninstall, mockRequest, MockAssert } from "mappersmith/test";
import { github } from "./client.js";

describe("github client works", () => {
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
});
