const path = require("path");

const baseConfig = {
  typescript: true,
  jsxRuntime: "automatic",
  dimensions: true,
  plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx", "@svgr/plugin-prettier"],
  icon: true,
  ignoreExisting: true,
};

const toPascalCase = (str) => {
  return str
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
};

module.exports = {
  ...baseConfig,
  filenameCase: "kebab", // Keep this if you want kebab-case filenames on disk
  svgProps: {
    fill: "currentColor",
    stroke: "currentColor",
  },
  template: ({ componentName, jsx }, { tpl }) => {
    const pascalCaseComponentName = toPascalCase(componentName);
    const finalComponentName = pascalCaseComponentName.replace("Svg", "");

    return tpl`
      import type { SVGProps } from "react";
      const ${finalComponentName} = (props: SVGProps<SVGSVGElement>) => ${jsx};
      export default ${finalComponentName};
    `;
  },

  indexTemplate: (files) => {
    const exportEntries = files.map((file) => {
      const componentFilenameBase = path.basename(file.path, ".tsx");
      const pascalCaseAlias = toPascalCase(componentFilenameBase).replace(
        "Svg",
        "",
      );
      return `export { default as ${pascalCaseAlias} } from './${componentFilenameBase}';`;
    });
    return exportEntries.join("\n");
  },

  multipass: true,
  ext: "tsx",
  config: (opts) => {
    if (opts.filePath.includes("illustrations")) {
      return {
        ...baseConfig,
        outDir: "src/components/illustrations",
        icon: false,
      };
    }
    return {
      ...baseConfig,
      outDir: "src/components/icons",
      icon: true,
    };
  },
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      {
        name: "removeAttrs",
        params: {
          attrs: ["fill", "stroke"],
        },
      },
    ],
  },
};
