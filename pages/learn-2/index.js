import utils from "./utils";

utils.registerErrorHandler((e) => {
  console.log(e);
});

utils.foo(() => {
  console.log(1);
});

utils.bar(() => {
  throw new Error("bar error");
})

// npx rollup ./pages/learn-2/index.js -f esm -o bundle.js
