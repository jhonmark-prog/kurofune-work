# Global Components

This directory contains reusable components that can be used across the entire application, following atomic design principles.

## Structure

```
components/
├── atoms/           # Basic building blocks
│   ├── Button.tsx   # Reusable button with variants (primary, secondary, ghost)
│   ├── Card.tsx     # Container with padding and shadow options
│   ├── Icon.tsx     # Wrapper around Ionicons with consistent styling
│   ├── Input.tsx    # Text input with focus states and error handling
│   └── Typography.tsx # Text component with predefined variants
├── molecules/       # Combinations of atoms
│   ├── ProgressRing.tsx # Circular progress indicator using SVG
│   └── Select.tsx   # Dropdown selector using Picker
└── index.ts         # Centralized exports
```

## Usage

Import components from the main index:

```typescript
import { Button, Input, Typography, ProgressRing } from '../components';
```

## Component Details

### Atoms

#### Button
- **Variants**: `primary`, `secondary`, `ghost`
- **Sizes**: `small`, `medium`, `large`
- **Features**: Icons (left/right), disabled state, custom styling

#### Card
- **Padding options**: `none`, `small`, `medium`, `large`
- **Shadow**: Optional elevation effect
- **Background**: Uses theme colors

#### Icon
- **Icon set**: Ionicons
- **Customizable**: size, color, additional styles

#### Input
- **States**: Normal, focused, error
- **Features**: Placeholder styling, error messages
- **Validation**: Built-in error display

#### Typography
- **Variants**: `heading1`, `heading2`, `heading3`, `body`, `caption`, `label`
- **Colors**: Customizable text colors
- **Responsive**: Consistent line heights and font weights

### Molecules

#### ProgressRing
- **SVG-based**: Smooth circular progress indicator
- **Customizable**: Size, stroke width, colors
- **Percentage-based**: 0-100% completion

#### Select
- **Picker-based**: Native dropdown selector
- **Options**: Array of label/value pairs
- **Styling**: Consistent with app theme

## Migration Notes

These components were originally created in the browse feature and moved here for global reuse. The browse feature now imports these components from this central location.