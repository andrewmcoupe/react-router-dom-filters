## ✨Type-safe filters

Create type-safe hooks for filtering data with React Router.

### 📦 Installation

```bash
pnpm add react-router-dom-filters
```

```bash
npm install --save react-router-dom-filters
```

```bash
yarn add react-router-dom-filters
```

### 🚀 Usage

```tsx
import { createFiltersHook } from 'react-router-dom-filters';

const filterKeys = ['instances', 'categories', 'sortBy'] as const;
export const useFilters = createFiltersHook(filterKeys);

const App = () => {
  const { activeFilters, updateFilters } = useFilters();

  const handleClick = () => {
    // ✨ Type-safe filter keys
    updateFilters({
      instances: 'all',
      categories: 'all',
      sortBy: 'price',
    });
  }
  
  return (
    <div>
      <button onClick={handleClick}>Update</button>
    </div>
  );
};
```
