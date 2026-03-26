# Architecture Overview

## Layer Diagram

```mermaid
graph TB
    subgraph Presentation["PRESENTATION LAYER<br/>(SvelteKit Routes)"]
        Routes["+page.server.ts<br/>bookmarks/+page.ts<br/>espresso/+page.ts<br/>tidal/+page.ts"]
    end

    subgraph Service["SERVICE LAYER<br/>(Business Logic - Strategy Pattern)"]
        subgraph Core["Hygraph Core Utilities (Pure Functions)"]
            getClients["getHygraphClients()"]
            execQuery["executeQuery(client, query, vars)"]
            execMutation["executeMutation(client, mutation, vars)"]
            publish["publishContent(client, mutation, id)"]
        end

        subgraph Bookmark["BookmarkService<br/>(Strategy Implementation)"]
            BInterface["IBookmarkService"]
            BList["• list()"]
            BCreate["• create()"]
            BGetBySlug["• getBySlug()"]
            BUpdate["• update()"]
            BDelete["• delete()"]
            BExists["• existsBySlug()"]
            BFactory["Factory: createHygraphBookmarkStrategy()"]
        end

        subgraph Espresso["EspressoNoteService<br/>(Strategy Implementation)"]
            EInterface["IEspressoNoteService"]
            EList["• list()"]
            EGetById["• getById()"]
            ECreate["• create()"]
            ETypes["• getMethodTypes()"]
            EStats["• getStatistics()"]
            EFactory["Factory: createHygraphEspressoNoteStrategy()"]
        end

        Core --> Bookmark
        Core --> Espresso
    end

    subgraph Data["DATA LAYER<br/>(External APIs)"]
        Hygraph["Hygraph CMS (GraphQL API)"]
    end

    subgraph CrossCutting["CROSS-CUTTING CONCERNS"]
        Validation["Validation/<br/>• url.ts<br/>• form.ts"]
        Utils["Utils/<br/>• slug.ts"]
        Config["Config/<br/>• Constants.ts"]
    end

    Routes -->|Uses Services| Bookmark
    Routes -->|Uses Services| Espresso
    Service -->|Uses| Hygraph
    Routes --> CrossCutting
    Service --> CrossCutting

    style Presentation fill:#e1f5ff
    style Service fill:#fff4e1
    style Data fill:#ffe1e1
    style CrossCutting fill:#e8f5e8
```

## Request Flow

### Creating a Bookmark

```mermaid
flowchart TD
    Start([User Submits Form]) --> RouteHandler1[Route Handler<br/>src/routes/bookmarks/add/+page.server.ts]
    RouteHandler1 --> Validation[Validation<br/>validateUrlField url<br/>from validation/url.ts]
    Validation --> ServiceCall[Service Layer<br/>bookmarkService.create link, title, description]
    ServiceCall --> Logic[Service Logic]
    Logic --> Step1["1. extractTitleFromUrl() if needed<br/>from validation/url.ts"]
    Step1 --> Step2["2. generateSlug(title)<br/>from utils/slug.ts"]
    Step2 --> Step3["3. getHygraphClients()<br/>from hygraph.ts"]
    Step3 --> Step4["4. executeMutation(client, CREATE_BOOKMARK, data)"]
    Step4 --> Step5["5. publishContent(client, PUBLISH_BOOKMARK, id)"]
    Step5 --> API[External API<br/>Hygraph CMS GraphQL]
    API --> Response[Response<br/>Return BookmarkResult]
    Response --> Redirect[Route Handler<br/>Redirect to /bookmarks]
    Redirect --> End([Complete])

    style Start fill:#e1f5ff
    style API fill:#ffe1e1
    style End fill:#e8f5e8
```

### Fetching Bookmarks

```mermaid
flowchart TD
    Start([Page Load]) --> RouteHandler1[Route Handler<br/>src/routes/bookmarks/+page.server.ts]
    RouteHandler1 --> ServiceCall[Service Layer<br/>bookmarkService.list 10]
    ServiceCall --> Strategy[Strategy Implementation]
    Strategy --> Step1["1. getHygraphClients()<br/>Get configured clients"]
    Step1 --> Step2["2. executeQuery(client, GET_BOOKMARKS, {first: 10})"]
    Step2 --> API[External API<br/>Hygraph CMS GraphQL]
    API --> Response[Response<br/>Return Bookmark array]
    Response --> RouteHandler2[Route Handler<br/>Return bookmarks]
    RouteHandler2 --> Component[Component<br/>Render bookmark list]
    Component --> End([Display])

    style Start fill:#e1f5ff
    style API fill:#ffe1e1
    style End fill:#e8f5e8
```

## Dependency Graph

```mermaid
graph LR
    Routes[Routes] --> BS[BookmarkService<br/>Strategy]
    Routes --> ES[EspressoNoteService<br/>Strategy]
    Routes --> Val[Validation]
    Routes --> Utils[Utils]
    Routes --> Const[Constants]

    BS --> HU[Hygraph Utils<br/>Pure Functions]
    ES --> HU
    Val --> HU
    Utils --> HU
    Const --> HU

    HU --> API[Hygraph API]

    style Routes fill:#e1f5ff
    style HU fill:#fff4e1
    style API fill:#ffe1e1
```

## Component Organization

```mermaid
graph TD
    Root[src/lib/components/]
    Root --> Base[base/<br/>Reusable UI primitives]
    Root --> App[app/<br/>Domain-specific components]

    Base --> Modal[Modal.svelte<br/>✅ Accessible modal]
    Base --> Form[Form.svelte<br/>✅ Base form component]

    App --> Future[Future:<br/>BookmarkCard, NoteCard, etc.]

    style Root fill:#e1f5ff
    style Base fill:#e8f5e8
    style App fill:#fff4e1
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

```mermaid
flowchart TD
    RouteHandler[Route Handler<br/>Receives result from service]
    Strategy[Service Strategy Implementation<br/>Catches errors, returns Result type<br/><br/>Success: success: true, data<br/>Error: success: false, error]
    Utils[Hygraph Utility Functions<br/>Logs errors, handles retries]
    API[External API<br/>Throws errors]

    RouteHandler --> Strategy
    Strategy --> Utils
    Utils --> API

    style RouteHandler fill:#e1f5ff
    style Strategy fill:#fff4e1
    style Utils fill:#e8f5e8
    style API fill:#ffe1e1
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

```mermaid
graph TD
    Root[CONSTANTS<br/>Constants.ts]

    Root --> API[API_ENDPOINTS]
    API --> Hygraph[HYGRAPH]
    API --> Tidal[TIDAL]

    Root --> Pagination[PAGINATION]
    Pagination --> Default[defaultPageSize: 10]
    Pagination --> Bookmarks[bookmarksPageSize: 10]
    Pagination --> Notes[notesPageSize: 20]

    Root --> Validation[VALIDATION]
    Validation --> Slug["slug { maxLength: 100 }"]
    Validation --> Title["title { maxLength: 200 }"]
    Validation --> Rating["rating { min: 1, max: 10 }"]

    Root --> Design[DESIGN]
    Design --> Colors[colors]
    Design --> Border[borderRadius]

    Root --> Features[FEATURES]
    Features --> FTidal[enableTidal: true]
    Features --> FEspresso[enableEspresso: true]

    style Root fill:#e1f5ff
    style API fill:#fff4e1
    style Pagination fill:#e8f5e8
    style Validation fill:#ffe1e1
    style Design fill:#f5e1ff
    style Features fill:#ffffcc
```

## Testing Structure

```mermaid
graph TD
    Root[tests/]

    Root --> Unit[unit/]
    Root --> Integration[integration/]

    Unit --> UServices[services/]
    UServices --> UBookmarks[bookmarks.test.ts]
    UServices --> UEspresso[espresso.test.ts]

    Unit --> UValidation[validation/]
    UValidation --> UUrl[url.test.ts]
    UValidation --> UForm[form.test.ts]

    Unit --> UUtils[utils/]
    UUtils --> USlug[slug.test.ts]

    Integration --> IRoutes[routes/]
    IRoutes --> IBookmarks[bookmarks.test.ts]
    IRoutes --> IEspresso[espresso.test.ts]

    Integration --> IServices[services/]
    IServices --> IHygraph[hygraph.test.ts]

    style Root fill:#e1f5ff
    style Unit fill:#e8f5e8
    style Integration fill:#fff4e1
```

## Performance Optimization

### Caching Strategy (Future)

```mermaid
flowchart TD
    Request[Request] --> Service[Service Layer]
    Service --> CheckCache{Check Cache<br/>CONSTANTS.CACHE.bookmarks = 300s}
    CheckCache -->|Hit| ReturnCached[Return cached data]
    CheckCache -->|Miss| FetchAPI[Fetch from API]
    FetchAPI --> Cache[Cache]
    Cache --> Return[Return]

    style Request fill:#e1f5ff
    style CheckCache fill:#fff4e1
    style ReturnCached fill:#e8f5e8
    style FetchAPI fill:#ffe1e1
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
