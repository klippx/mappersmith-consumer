# Copilot Instructions

## Purpose

This is a **smoke test / compatibility matrix** for the [`mappersmith`](https://github.com/tulios/mappersmith) library. It verifies that `mappersmith`'s built `dist/` folder works correctly across a range of consumer module configurations (CJS, ESM, TypeScript variants, bundlers, runtimes). It is not a feature project — each package exists to prove a specific import/module pattern compiles and runs.

## Setup

Install dependencies with `yarn`. The repo works out of the box using the published `mappersmith` version pinned in each package's `package.json`.

### Testing a local mappersmith branch

When developing `mappersmith` locally (e.g., validating a branch before opening a PR), you can point this repo at your local build instead of the published package:

1. In your `mappersmith` clone, run `yarn` + `yarn publish:prepare`.
2. In this repo, run: `yarn link ../mappersmith/dist`

This sets a portal resolution in the root `package.json`:

```json
"resolutions": {
  "mappersmith": "portal:/Users/MKLIPPIN/repos/mappersmith/dist"
}
```

## Commands

### Root (all workspaces)

```sh
yarn build:all        # tsc --noEmit type-check across all packages
yarn test:all         # vitest --run across all packages
yarn integration:all  # live HTTP requests across all packages
yarn clean:all        # rm -rf dist/ across all packages
```

### Single workspace

```sh
yarn workspace @mappersmith-consumer/<name> build       # tsc --noEmit (type-check only)
yarn workspace @mappersmith-consumer/<name> test        # vitest --run
yarn workspace @mappersmith-consumer/<name> test:live   # compile + run against real API
```

### Single test file (cd into package first)

```sh
cd packages/cjs-ts && yarn vitest --run src/client.test.ts
```

The `bun` package uses `bun test` instead of vitest.

## Package Matrix

Each package tests a distinct module format / import style:

| Package                 | Type     | Runtime | Import pattern                                                                    |
| ----------------------- | -------- | ------- | --------------------------------------------------------------------------------- |
| `cjs`                   | CommonJS | Node    | `require()` (plain JS)                                                            |
| `cjs-ts`                | CommonJS | Node    | `import x from 'mappersmith'` (TS, standard)                                      |
| `cjs-ts-cr`             | CommonJS | Node    | `const { default: forge } = require('mappersmith')` (TS)                          |
| `cjs-ts-ir`             | CommonJS | Node    | `import forge = require('mappersmith')` (TS)                                      |
| `cjs-ts-old`            | CommonJS | Node    | Demonstrates TypeScript >=4.7 requirement                                         |
| `esm-ts`                | ESM      | Node    | Named imports from barrel paths (`mappersmith/gateway`, `mappersmith/middleware`) |
| `esm-ts-legacy-imports` | ESM      | Node    | Default imports from per-file paths (`mappersmith/gateway/fetch`, etc.)           |
| `esm-esbuild`           | ESM      | Node    | ESM + TypeScript bundled via esbuild                                              |
| `bun`                   | ESM      | Bun     | TypeScript, `bun test`                                                            |
| `web`                   | CommonJS | Browser | Parcel bundler (`yarn start` only — no test script)                               |

## Key Conventions

### Package structure

Every testable package follows this layout:

```
src/
  client.ts      # forge() definition with middleware and resources
  client.test.ts # vitest tests using mappersmith/test mocks
  index.ts       # live runner (used by test:live)
```

### `build` means type-check only

`build` runs `tsc --noEmit` — it does not emit JS. To actually compile and run, use `test:live` (which does `tsc && node dist/index.js`).

### Import style differences

- **`esm-ts`**: Uses modern barrel imports — `import { FetchGateway } from "mappersmith/gateway"` and `import { RetryMiddleware } from "mappersmith/middleware"`. This is the preferred modern style.
- **`esm-ts-legacy-imports`**: Uses per-file paths — `import FetchGateway from "mappersmith/gateway/fetch"`. Tests backward compatibility.
- **`cjs-ts-cr`**: Needs `.default` suffix on middleware when using `const x = require()` — e.g., `Duration.default`, `RetryMiddleware.default()`.
- **`cjs-ts-ir`**: Uses TypeScript's `import x = require()` syntax which avoids the `.default` issue.

### Mocking pattern (vitest)

All unit tests use `mappersmith/test`:

```ts
import { install, uninstall, mockRequest } from "mappersmith/test";

beforeAll(() => install());
afterAll(() => uninstall());
beforeEach(() =>
  mockRequest({
    method: "get",
    url: "...",
    response: { status: 200, body: {} },
  }),
);
```

### tsconfig pattern

All TypeScript packages use `"module": "Node16"` / `"moduleResolution": "Node16"` with `"strict": true`. There is no shared/extended root tsconfig — each package has its own.

### Vitest config

Packages that use vitest have a `vite.config.ts` that inlines mappersmith. This is required because mappersmith is portal-linked:

```ts
export default defineConfig({
  test: { server: { deps: { inline: ["mappersmith"] } } },
});
```

If you add a new vitest-based package, include this config or tests will fail to resolve mappersmith.

### Runtime versions

Required tool versions are pinned in `.tool-versions` (asdf)

### GitHub Actions

Each package has its own workflow file (e.g., `test-cjs-ts.yml`) that calls the reusable `test-workspace.yml` workflow. The `verify-release-candidate` workflow is triggered manually to test a mappersmith branch before release.
