import {
  describe,
  afterAll,
  beforeAll,
  beforeEach,
  expect,
  test,
} from "vitest";
const { install, uninstall, mockRequest } = require("mappersmith/test");
const github = require("./client");

describe("github client", () => {
  let mockSource;
  beforeAll(() => {
    console.log("beforeAll");
    install();
  });

  afterAll(() => {
    console.log("afterAll");
    uninstall();
  });

  beforeEach(() => {
    console.log("beforeEach");
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
