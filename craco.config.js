const path = require(`path`);

const aliases = {
  "@assets": "./src/assets",
  "@config": "./src/config/index.ts",
  "@constants": "./src/constants",
  "@context": "./src/context",
  "@hooks": "./src/hooks",
  "@models": "./src/models",
  "@DTOs": "./src/models/DTOs",
  "@services": "./src/services",
  "@ui": "./src/ui",
  "@pages": "./src/ui/pages",
  "@components": "./src/ui/components",
  "@utils": "./src/utils",
};

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [
    key,
    path.resolve(__dirname, value),
  ])
);

module.exports = {
  webpack: {
    alias: resolvedAliases,
  },
};
