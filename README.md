# Mappersmith Consumer

This is a smoke test project that verifies that the `dist/` folder about to get published to npm for the `mappersmith` project works in a range of consumer projects, represented by a number of workspaces in this repo.

## Setup

1. Install correct node version (see `.tool-versions`) and latest yarn (`yarn set version stable`)
2. Clone mappersmith and run `yarn` + `yarn publish:prepare`
3. Back in this repo, link to the dist/ folder: `yarn link ../mappersmith/dist`

## Test

### Type compilation

Verify tsc works in all projects:

```sh
yarn build:all
```

### Integration/live tests

Verify runtime is working in all projects:

```sh
yarn integration:all
```

or one-by-one:

```sh
# only works on 2.38 and higher (due to Response and version being exported):
yarn workspace @mappersmith-consumer/cjs test:live;
yarn workspace @mappersmith-consumer/cjs-ts test:live;
yarn workspace @mappersmith-consumer/cjs-ts-ir test:live;
yarn workspace @mappersmith-consumer/cjs-ts-cr test:live;
yarn workspace @mappersmith-consumer/cjs-ts-old test:live;
# only works on 2.43 and higher:
# Related: https://github.com/evanw/esbuild/issues/1343
yarn workspace @mappersmith-consumer/esm-ts test:live;
yarn workspace @mappersmith-consumer/esm-ts-legacy-imports test:live;
yarn workspace @mappersmith-consumer/bun test:live;
```

### Unit tests

Verify tests are running in all projects:

```sh
yarn test:all
```

or one-by-one:

```sh
yarn workspace @mappersmith-consumer/cjs test;
yarn workspace @mappersmith-consumer/cjs-ts test;
yarn workspace @mappersmith-consumer/cjs-ts-ir test;
yarn workspace @mappersmith-consumer/cjs-ts-cr test;
yarn workspace @mappersmith-consumer/cjs-ts-old test;
yarn workspace @mappersmith-consumer/esm-ts test;
yarn workspace @mappersmith-consumer/bun test;
```

## Compatibility log

# 2.42

In this version there was no ESM export so importing would not work correctly for ESM consumers.

`yarn workspace @mappersmith-consumer/{name} test:live`

```
bun - ⛔️
cjs - ✅
cjs-ts - ✅
cjs-ts-cr - ✅
cjs-ts-ir - ✅
cjs-ts-old - ✅
esm-ts - ⛔️
esm-ts-legacy-imports - ⛔️
```

# 2.43

In this version we changed from using a custom build script to start using `tsup` bundling the dist/ folder. This is the milestone first ESM package exported to NPM.

```
bun - ✅
cjs - ✅
cjs-ts - ✅
cjs-ts-cr - ✅
cjs-ts-ir - ✅
cjs-ts-old - ✅
esm-ts - ✅
esm-ts-legacy-imports - ✅
```
