import { Rule } from "eslint";

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
        type: "array",
        items: [
          {
            type: "object",
            properties: {
              pattern: {
                type: "string",
              },
            },
          },
        ],
      },
    ],
  },

  create: (context) => {
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
