import { build } from "esbuild";

build({
  entryPoints: ["./src/index.ts"],
  outdir: "./dist",
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node16",
});
