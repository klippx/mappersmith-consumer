# mappersmith-cjs

Integration/live test:

```sh
yarn workspace @mappersmith-consumer/cjs test:live;
yarn workspace @mappersmith-consumer/cjs-ts test:live;
yarn workspace @mappersmith-consumer/cjs-ts-ir test:live;
yarn workspace @mappersmith-consumer/cjs-ts-cr test:live;
yarn workspace @mappersmith-consumer/esm-ts test:live;
```

Unit test:

```sh
# yarn workspace @mappersmith-consumer/cjs test --run;
yarn workspace @mappersmith-consumer/cjs-ts test --run;
# yarn workspace @mappersmith-consumer/cjs-ts-ir test --run;
# yarn workspace @mappersmith-consumer/cjs-ts-cr test --run;
yarn workspace @mappersmith-consumer/esm-ts test --run;
```

# 2.42

`yarn workspace @mappersmith-consumer/{name} test`

cjs - ✅
cjs-ts - ✅
cjs-ts-cr - ✅
cjs-ts-ir - ✅
esm-ts - ⛔️ [TS7006,TS2349,TS2307]

# 2.35

cjs - ✅
cjs-ts - ✅
cjs-ts-cr - ⛔️ [TS7006]
cjs-ts-ir - ✅
esm-ts - ⛔️ "Cannot find module '/Users/MKLIPPIN/repos/mappersmith-consumer/node_modules/mappersmith/gateway/fetch'"

# 2.43-beta

cjs - ✅
cjs-ts - ✅
cjs-ts-cr - ✅
cjs-ts-ir - ✅
esm-ts - ✅
