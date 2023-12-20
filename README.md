# mappersmith-cjs

## Setup

1. In this repo, install correct node version (see `.tool-versions`) and latest yarn (`yarn set version stable`)
2. Clone mappersmith and run `yarn` + `yarn publish:prepare`
3. Back in this repo, link to the dist/ folder: `yarn link ../mappersmith/dist`

## Test

### TSC

```sh
yarn build
```

### Integration/live tests

```sh
yarn test:integration
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

```sh
yarn test
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

# 2.42

`yarn workspace @mappersmith-consumer/{name} test:live`

```
cjs - ✅
cjs-ts - ✅
cjs-ts-cr - ✅
cjs-ts-ir - ✅
cjs-ts-old - ✅
esm-ts - ⛔️
```

# 2.43-beta

```
cjs - ✅
cjs-ts - ✅
cjs-ts-cr - ✅
cjs-ts-ir - ✅
cjs-ts-old - ✅
esm-ts - ✅
```
