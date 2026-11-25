# Payday

The design system behind the product-led FairShift site (v1), built on shadcn/ui and themed from DESIGN.md. Runs on port 3930: `npm run dev -- --port 3930`.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```
