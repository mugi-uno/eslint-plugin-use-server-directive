import { ESLint, RuleTester } from "eslint";
import { describe, expect, it } from "vitest";
import path from "path";
import plugin from "../src";

const eslint = new ESLint({
  plugins: {
    "use-server-directive": plugin,
  },

  overrideConfig: {
    parserOptions: {
      ecmaVersion: 2022,
    },
    plugins: ["use-server-directive"],
    rules: {
      "use-server-directive/use-server-directive": [
        "error",
        [{ pattern: "**/*.ts" }],
      ],
    },
  },
});

describe("use-server rule", () => {
  it.each([
    { file: "valid-single-quote.js" },
    { file: "valid-double-quote.js" },
  ])(
    'should pass if the file starts with "use server" : $file',
    async ({ file }) => {
      const results = await eslint.lintFiles(
        path.resolve(__dirname, "fixtures/valid", file)
      );
      expect(results[0].errorCount).toBe(0);
    }
  );

  it.each([{ file: "invalid-missing.js" }, { file: "invalid-typo.js" }])(
    'should pass if the file starts with "use server" : $file',
    async ({ file }) => {
      const results = await eslint.lintFiles(
        path.resolve(__dirname, "fixtures/invalid", file)
      );
      expect(results[0].errorCount).toBe(1);
      expect(results[0].messages[0].message).toBe(
        'No "use server" directive found.'
      );
    }
  );
});
