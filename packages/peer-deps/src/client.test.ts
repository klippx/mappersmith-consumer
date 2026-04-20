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

describe("github client (optional peer deps)", () => {
  let mockSource: MockAssert;
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

  test("github client works with or without optional peer deps", async () => {
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

  test("error formatting works with or without optional peer deps (diff, tty-table)", async () => {
    const response = await github.Status.summary().catch((r) => r);
    const message = response.errors[0].message.replace(
      /x-started-at=\d+/g,
      "x-started-at=<timestamp>",
    );
    // With richMockErrors: true the error message is a structured breakdown.
    // The exact format varies based on whether optional peer deps (diff, tty-table)
    // are installed, but these invariants always hold.
    expect(message).not.toContain("[Mappersmith Test] No match found for");
    expect(message).toContain(
      "https://www.githubstatus.com/api/v2/summary.json",
    );
    expect(message).toContain("Mock definitions installed:");
  });
});
