# Asset Generation Guide

## Icons and Illustrations

To convert SVG files into React components, run:

```bash
pnpm run svgr icons
```

This command will process SVG files in the component icons & illustrations directory and generate corresponding React components.

### Usage Notes

1. Place your SVG files in the `icons` or `illustrations` directory
2. Run the command above to generate components

### Example Usage

```tsx
import IconName from "@icons/IconName";
import IlustrationsName from "@illustrations/IllustrationsName";

function MyComponent() {
  return (
    <>
      <IconName width={24} height={24} />
      <IlustrationsName />
    </>
  );
}
```
