/**
 * Server-side storage adapter for Tidal Auth SDK
 * Since localStorage is not available in Node.js, we implement a custom storage
 */

import type { StorageAdapter } from '@tidal-music/auth';

/**
 * In-memory storage implementation for server-side OAuth flow
 *
 * IMPORTANT: This is a simple implementation for development/testing.
 *
 * LIMITATIONS:
 * - Data is lost when server restarts
 * - Not suitable for multi-server deployments
 * - No encryption at rest
 *
 * For production use, consider implementing one of these alternatives:
 *
 * 1. Redis-based storage (recommended for multi-server):
 *    ```typescript
 *    import Redis from 'ioredis';
 *    const redis = new Redis();
 *
 *    class RedisStorage implements StorageAdapter {
 *      async load(key: string) {
 *        return await redis.get(key);
 *      }
 *      async save(key: string, value: string) {
 *        await redis.set(key, value);
 *      }
 *      async remove(key: string) {
 *        await redis.del(key);
 *      }
 *    }
 *    ```
 *
 * 2. Database storage (PostgreSQL, MongoDB, etc.):
 *    Store encrypted tokens in your database with user associations
 *
 * 3. Encrypted cookie storage:
 *    Use SvelteKit's cookie encryption to store tokens client-side
 *    (requires careful security implementation)
 */
class ServerStorage implements StorageAdapter {
	private store: Map<string, string> = new Map();

	async load(key: string): Promise<string | null> {
		return this.store.get(key) ?? null;
	}

	async save(key: string, value: string): Promise<void> {
		this.store.set(key, value);
	}

	async remove(key: string): Promise<void> {
		this.store.delete(key);
	}
}

/**
 * Singleton instance of server storage
 */
export const serverStorage = new ServerStorage();
