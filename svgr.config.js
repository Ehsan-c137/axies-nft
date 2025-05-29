const baseConfig = {
  typescript: true,
  jsxRuntime: "automatic",
  dimensions: true,
  plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx", "@svgr/plugin-prettier"],
  icon: true,
  ignoreExisting: true,
};

module.exports = {
  ...baseConfig,
  indexTemplate: (files) => {
    const exportEntries = files.map(({ path: filePath }) => {
      const basename = filePath
        .split("/")
        .pop()
        .replace(/\.tsx?$/, "");
      return `export { default as ${basename} } from './${basename}'`;
    });
    return exportEntries.join("\n");
  },
  multipass: true,
  ext: "tsx",
  config: (opts) => {
    const config = opts.filePath.includes("illustrations")
      ? {
          ...baseConfig,
          outDir: "src/components/illustrations",
          icon: false,
        }
      : {
          ...baseConfig,
          outDir: "src/components/icons",
          icon: true,
        };

    return {
      ...config,
      prettierConfig: {
        ...config.prettierConfig,
        parser: "typescript",
      },
      filenameCase: "kebab",
      template: ({ componentName, jsx }, { tpl }) => {
        // Convert component name to kebab case for the file name
        const kebabName = componentName
          .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
          .replace(/([A-Z])([A-Z])(?=[a-z])/g, "$1-$2")
          .toLowerCase()
          .replace(/^svg-/, "");

        return tpl`
          import type { SVGProps } from "react";
          const ${componentName.replace("Svg", "")} = (props: SVGProps<SVGSVGElement>) => ${jsx};
          export default ${componentName.replace("Svg", "")};
        `;
      },
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
    ],
  },
};
