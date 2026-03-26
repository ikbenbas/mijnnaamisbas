# Architecture Overview

## Layer Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                      │
│                    (SvelteKit Routes)                        │
├─────────────────────────────────────────────────────────────┤
│  +page.server.ts  │  bookmarks/  │  espresso/  │  tidal/   │
│                   │  +page.ts    │  +page.ts   │  +page.ts │
└──────────────┬────────────────────────────────┬─────────────┘
               │                                │
               │ Uses Services                  │ Uses Services
               ▼                                ▼
┌─────────────────────────────────────────────────────────────┐
│                      SERVICE LAYER                           │
│           (Business Logic - Strategy Pattern)                │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────┐       │
│  │         Hygraph Core Utilities                   │       │
│  │         (Pure Functions)                         │       │
│  │                                                  │       │
│  │  • getHygraphClients()                          │       │
│  │  • executeQuery(client, query, vars)           │       │
│  │  • executeMutation(client, mutation, vars)     │       │
│  │  • publishContent(client, mutation, id)        │       │
│  └──────────────────┬───────────────────────────────┘       │
│                     │ Used by                                │
│                     ▼                                        │
│  ┌──────────────────────────┐  ┌────────────────────────┐  │
│  │ BookmarkService          │  │ EspressoNoteService    │  │
│  │ (Strategy Implementation)│  │ (Strategy Implementation)│ │
│  │                          │  │                        │  │
│  │ IBookmarkService         │  │ IEspressoNoteService   │  │
│  │  • list()               │  │  • list()              │  │
│  │  • create()             │  │  • getById()           │  │
│  │  • getBySlug()          │  │  • create()            │  │
│  │  • update()             │  │  • getMethodTypes()    │  │
│  │  • delete()             │  │  • getStatistics()     │  │
│  │  • existsBySlug()       │  │                        │  │
│  │                          │  │                        │  │
│  │ Factory:                 │  │ Factory:               │  │
│  │ createHygraphBookmark    │  │ createHygraphEspresso  │  │
│  │        Strategy()        │  │       NoteStrategy()   │  │
│  └──────────────────────────┘  └────────────────────────┘  │
│                                                               │
│  Benefits: Easy to swap implementations (GraphQL ↔ REST)    │
└───────────────────────┼─────────────────────────────────────┘
                        │
                        │ Uses
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                              │
│                   (External APIs)                            │
├─────────────────────────────────────────────────────────────┤
│              Hygraph CMS (GraphQL API)                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   CROSS-CUTTING CONCERNS                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Validation/          Utils/              Config/           │
│  ├─ url.ts            ├─ slug.ts          └─ Constants.ts   │
│  └─ form.ts                                                  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Request Flow

### Creating a Bookmark

```
User Submits Form
      ↓
[Route Handler]
src/routes/bookmarks/add/+page.server.ts
      ↓
[Validation]
validateUrlField(url)  ← from validation/url.ts
      ↓
[Service Layer]
bookmarkService.create({link, title, description})
      ↓
[Service Logic]
1. extractTitleFromUrl() if needed  ← from validation/url.ts
2. generateSlug(title)              ← from utils/slug.ts
3. getHygraphClients()              ← from hygraph.ts
4. executeMutation(client, CREATE_BOOKMARK, data)
5. publishContent(client, PUBLISH_BOOKMARK, id)
      ↓
[External API]
Hygraph CMS (GraphQL)
      ↓
[Response]
Return BookmarkResult
      ↓
[Route Handler]
Redirect to /bookmarks
```

### Fetching Bookmarks

```
Page Load
      ↓
[Route Handler]
src/routes/bookmarks/+page.server.ts
      ↓
[Service Layer]
bookmarkService.list(10)
      ↓
[Strategy Implementation]
1. getHygraphClients()              ← Get configured clients
2. executeQuery(client, GET_BOOKMARKS, {first: 10})
      ↓
[External API]
Hygraph CMS (GraphQL)
      ↓
[Response]
Return Bookmark[]
      ↓
[Route Handler]
Return { bookmarks }
      ↓
[Component]
Render bookmark list
```

## Dependency Graph

```
Routes
  │
  ├─► BookmarkService ────────┐
  │    (Strategy)             │
  │                           │
  ├─► EspressoNoteService ───┤
  │    (Strategy)             │
  │                           ├──► Hygraph Utils ──► Hygraph API
  │                           │    (Pure Functions)
  └─► Validation ─────────────┤
      Utils ──────────────────┤
      Constants ───────────────┘
```

## Component Organization

```
src/lib/components/
├── base/                    # Reusable UI primitives
│   ├── Modal.svelte         # ✅ Accessible modal
│   └── Form.svelte          # ✅ Base form component
│
└── app/                     # Domain-specific components
    (Future: BookmarkCard, NoteCard, etc.)
```

## Service Exports

```typescript
// src/lib/services/index.ts (Central export)

// Core utilities (pure functions)
export {
  getHygraphClients,
  executeQuery,
  executeMutation,
  publishContent
} from './api/hygraph';

// Strategy implementations and interfaces
export {
  createHygraphBookmarkStrategy,
  bookmarkService
} from './api/bookmarks';
export type { IBookmarkService } from './api/bookmarks';

export {
  createHygraphEspressoNoteStrategy,
  espressoNoteService
} from './api/espresso';
export type { IEspressoNoteService } from './api/espresso';

// Utilities
export * from './utils/slug';
export * from './validation/url';
export * from './validation/form';

// Types
export type { CreateBookmarkInput, BookmarkResult } from './api/bookmarks';
export type { CreateEspressoNoteInput, EspressoNoteResult } from './api/espresso';
```

## Usage Pattern

### In Route Handlers

```typescript
// ❌ OLD WAY (Direct API calls)
import { getHygraphClient, GET_BOOKMARKS } from '$lib';

try {
    const client = getHygraphClient();
    const data = await client.request<{ bookmarks: Bookmark[] }>(GET_BOOKMARKS);
    return { bookmarks: data.bookmarks };
} catch {
    return { bookmarks: [] };
}

// ✅ NEW WAY (Service layer)
import { bookmarkService } from '$lib/services';

const bookmarks = await bookmarkService.list(10);
return { bookmarks };
```

### Benefits
1. **Cleaner**: 8 lines → 2 lines
2. **DRY**: Reusable across all routes
3. **Testable**: Easy to mock services
4. **Type-safe**: Full TypeScript support
5. **Maintainable**: Change once, update everywhere

## Error Handling Strategy

```
┌─────────────────────────────────────────┐
│         Route Handler                    │
│  (Receives result from service)         │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│    Service Strategy Implementation       │
│  (Catches errors, returns Result type)  │
│                                          │
│  Success: { success: true, data }       │
│  Error: { success: false, error }       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      Hygraph Utility Functions           │
│  (Logs errors, handles retries)         │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│         External API                     │
│  (Throws errors)                         │
└─────────────────────────────────────────┘
```

## Type Safety Flow

```typescript
// Input Type
CreateBookmarkInput
    ↓
// Service Method
bookmarkService.create(input)
    ↓
// Result Type
BookmarkResult<Bookmark>
    ↓
// Route Handler
{ success: boolean; data?: Bookmark; error?: string }
    ↓
// Component
PageData { bookmarks: Bookmark[] }
```

## Configuration Hierarchy

```
CONSTANTS (Constants.ts)
    ├── API_ENDPOINTS
    │   ├── HYGRAPH
    │   └── TIDAL
    ├── PAGINATION
    │   ├── defaultPageSize: 10
    │   ├── bookmarksPageSize: 10
    │   └── notesPageSize: 20
    ├── VALIDATION
    │   ├── slug { maxLength: 100 }
    │   ├── title { maxLength: 200 }
    │   └── rating { min: 1, max: 10 }
    ├── DESIGN
    │   ├── colors
    │   └── borderRadius
    └── FEATURES
        ├── enableTidal: true
        └── enableEspresso: true
```

## Testing Structure

```
tests/
├── unit/
│   ├── services/
│   │   ├── bookmarks.test.ts
│   │   └── espresso.test.ts
│   ├── validation/
│   │   ├── url.test.ts
│   │   └── form.test.ts
│   └── utils/
│       └── slug.test.ts
│
└── integration/
    ├── routes/
    │   ├── bookmarks.test.ts
    │   └── espresso.test.ts
    └── services/
        └── hygraph.test.ts
```

## Performance Optimization

### Caching Strategy (Future)
```
Request
    ↓
Service Layer
    ↓
Check Cache (CONSTANTS.CACHE.bookmarks = 300s)
    ├─ Hit → Return cached data
    └─ Miss → Fetch from API → Cache → Return
```

### Pagination Strategy
```typescript
// Configurable through Constants
CONSTANTS.PAGINATION.bookmarksPageSize = 10;

// Used in services
async list(limit = CONSTANTS.PAGINATION.bookmarksPageSize)
```

## Extensibility

### Adding New Service (Strategy Pattern)

1. Create service file:
```typescript
// src/lib/services/api/my-service.ts
import { getHygraphClients, executeQuery, executeMutation } from './hygraph';

// Define the service interface
export interface IMyService {
    myMethod(): Promise<MyData[]>;
}

// Create strategy factory
export const createHygraphMyServiceStrategy = (): IMyService => {
    const { client, mutationClient } = getHygraphClients();

    return {
        myMethod: async (): Promise<MyData[]> => {
            const data = await executeQuery<{ myData: MyData[] }>(
                client,
                MY_QUERY,
                {},
                'Fetch my data'
            );
            return data?.myData || [];
        }
    };
};

// Export singleton instance
export const myService: IMyService = createHygraphMyServiceStrategy();
```

2. Export from index:
```typescript
// src/lib/services/index.ts
export { createHygraphMyServiceStrategy, myService } from './api/my-service';
export type { IMyService } from './api/my-service';
```

3. Use in routes:
```typescript
import { myService } from '$lib/services';
const data = await myService.myMethod();
```

4. Can easily swap implementations:
```typescript
// For testing: create mock strategy
const createMockMyServiceStrategy = (): IMyService => ({
    myMethod: async () => [/* mock data */]
});

// For REST API: create REST strategy
const createRestMyServiceStrategy = (): IMyService => ({
    myMethod: async () => {
        const response = await fetch('/api/my-data');
        return response.json();
    }
});
```

## Key Benefits

✅ **Strategy Pattern**: Easy to swap implementations (GraphQL ↔ REST ↔ Mock)
✅ **SOLID Compliance**: Single responsibility with dependency injection
✅ **DRY**: No duplicate code across routes
✅ **Type Safety**: Full TypeScript coverage with interfaces
✅ **Testable**: Pure functions and strategies easy to mock
✅ **Maintainable**: Change once, update everywhere
✅ **Extensible**: Add new strategies without modifying existing code
✅ **No Inheritance**: Composition over inheritance
✅ **Documented**: JSDoc comments throughout
✅ **Consistent**: All routes follow same pattern
