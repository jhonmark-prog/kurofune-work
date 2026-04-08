# Browse Feature - Atomic Design

This feature follows the atomic design methodology, organizing components into hierarchical levels. Global reusable components have been moved to `src/components/`.

## Structure

```
components/
├── molecules/      # Browse-specific molecules
│   ├── FilterChip.tsx    # Individual filter chip (browse-specific)
│   └── JobMeta.tsx       # Job metadata display (browse-specific)
├── organisms/      # Complex components made of molecules/atoms
│   ├── ActiveFilterChips.tsx    # Filter chip collection
│   ├── FilterModal.tsx          # Complete filter interface
│   ├── JobCard.tsx             # Job listing card
│   └── ProfileCompletionBanner.tsx
├── templates/      # Page-level layouts (to be implemented)
└── pages/          # Actual screens (to be implemented)
```

## Component Levels

### Molecules (Browse-specific)
- **FilterChip**: Individual filter chip with remove functionality
- **JobMeta**: Job metadata row with icon and text

### Organisms
- **ActiveFilterChips**: Collection of active filter chips
- **FilterModal**: Complete filter modal with form elements
- **JobCard**: Job listing card with all job information
- **ProfileCompletionBanner**: Profile completion progress banner

## Global Components Used

This feature imports the following global components from `src/components/`:
- **Atoms**: Button, Card, Icon, Input, Typography
- **Molecules**: ProgressRing, Select

## Usage

Import browse-specific components:

```typescript
import { JobCard, FilterModal, FilterChip } from '../components';
```

Import global components:

```typescript
import { Button, Typography } from '../../../components';
```