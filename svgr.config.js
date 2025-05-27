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
  // Multiple configurations based on input path pattern
  multipass: true,
  ext: "tsx",
  config: (opts) => {
    // Check if the file is from the illustrations folder
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
  template: ({ componentName, jsx }, { tpl }) => {
    return tpl`
      import type { SVGProps } from "react";
      const ${componentName.replace("Svg", "")} = (props: SVGProps<SVGSVGElement>) => ${jsx};
      export default ${componentName.replace("Svg", "")};
    `;
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
  filenameCase: "kebab",
};
