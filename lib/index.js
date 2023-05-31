"use strict";
const glob_1 = require("glob");
const rule = {
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
                    pattern: {
                        type: "string",
                    },
                },
                additionalProperties: false,
            },
        ],
    },
    create: (context) => {
        const { pattern = "**/*.js" } = context.options[0] || {};
        const files = (0, glob_1.sync)(pattern, { cwd: context.getCwd() });
        return {
            Program: (node) => {
                const { comments } = node;
                if (comments && comments.length > 0) {
                    const firstComment = comments[0];
                    if (firstComment.value.trim() !== "use server") {
                        context.report({
                            node,
                            message: 'The file must start with "use server"',
                        });
                    }
                }
                else {
                    context.report({
                        node,
                        message: 'The file must start with "use server"',
                    });
                }
            },
        };
    },
};
module.exports = rule;
