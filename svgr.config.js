const path = require("path");

const baseConfig = {
  typescript: true,
  jsxRuntime: "automatic",
  dimensions: true,
  plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx", "@svgr/plugin-prettier"],
  icon: true,
  ignoreExisting: true,
};

// Helper function to convert kebab-case to PascalCase
const toPascalCase = (str) => {
  return str
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
};

module.exports = {
  ...baseConfig,
  filenameCase: "kebab", // Keep this if you want kebab-case filenames on disk

  template: ({ componentName, jsx }, { tpl }) => {
    // componentName is "fire-icon" (due to filenameCase: "kebab")
    // Convert to PascalCase for the JS variable, e.g., "FireIcon"
    const pascalCaseComponentName = toPascalCase(componentName);
    // Apply .replace("Svg", "") as in your original template, if needed for the final name
    const finalComponentName = pascalCaseComponentName.replace("Svg", "");

    return tpl`
      import type { SVGProps } from "react";
      const ${finalComponentName} = (props: SVGProps<SVGSVGElement>) => ${jsx};
      export default ${finalComponentName};
    `;
  },

  indexTemplate: (files) => {
    const exportEntries = files.map((file) => {
      // componentFilenameBase will be kebab-case, e.g., "fire-icon"
      const componentFilenameBase = path.basename(file.path, ".tsx");

      // Convert kebab-case filename to PascalCase for the JS alias
      // This must create the same name that is default exported by your 'template'
      const pascalCaseAlias = toPascalCase(componentFilenameBase).replace(
        "Svg",
        "",
      );

      // The 'from' part still uses the kebab-case filename on disk
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
    ],
  },
};
