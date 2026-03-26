/**
 * Service Layer Exports
 * Central export point for all services using Strategy Pattern
 */

// API Services - Core utilities
export { getHygraphClients, executeQuery, executeMutation, publishContent } from './api/hygraph';

// API Services - Strategy implementations
export { createHygraphBookmarkStrategy, bookmarkService } from './api/bookmarks';
export { createHygraphEspressoNoteStrategy, espressoNoteService } from './api/espresso';

// API Services - Interfaces
export type { IBookmarkService } from './api/bookmarks';
export type { IEspressoNoteService } from './api/espresso';

// Types
export type { CreateBookmarkInput, BookmarkResult } from './api/bookmarks';
export type { CreateEspressoNoteInput, EspressoNoteResult } from './api/espresso';

// Utilities
export * from './utils/slug';

// Validation
export * from './validation/url';
export * from './validation/form';
