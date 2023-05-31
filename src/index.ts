import { Rule } from "eslint";
import minimatch from "minimatch";

interface Options {
  patterns: { pattern: string }[];
}

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: 'check if the file starts with "use server"',
      category: "Possible Errors",
      recommended: true,
    },
    schema: [
      {
        type: "object",
        properties: {
          patterns: {
            type: "array",
            items: {
              type: "object",
              properties: {
                pattern: {
                  type: "string",
                },
              },
              required: ["pattern"],
            },
          },
        },
        required: ["patterns"],
      },
    ],
  },

  create: (context) => {
    const options: Options = context.options[0];
    const isMatch = options.patterns.some(({ pattern }) =>
      minimatch(context.filename, pattern)
    );

    if (!isMatch) {
      return {};
    }

    const firstLine = context.sourceCode.lines[0];
    const isValid =
      firstLine.startsWith(`"use server"`) ||
      firstLine.startsWith(`'use server'`);

    if (!isValid) {
      context.report({
        message: 'No "use server" directive found.',
        loc: { line: 1, column: 1 },
      });
    }

    return {};
  },
};

export default {
  rules: {
    "use-server-directive": rule,
  },
};
