import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
    const faunaGraphqlUrl = process.env.FAUNA_GRAPHQL_URL ?? '';
    const faunaServerKey = process.env.FAUNA_SERVER_KEY ?? '';

    if (!faunaGraphqlUrl || !faunaServerKey) {
        return { bookmarks: [] };
    }

    try {
        const response = await fetch(faunaGraphqlUrl, {
            headers: {
                authorization: `bearer ${faunaServerKey}`,
            },
            method: 'POST',
            body: JSON.stringify({
                query: `
                    query getAllBookmarks {
                        allBookmarks(_size: 10) {
                            data {
                                _id
                                title
                                description
                                link
                            }
                        }
                    }
                `,
            }),
        });

        const data = await response.json();
        return {
            bookmarks: data?.data?.allBookmarks?.data ?? [],
        };
    } catch {
        return { bookmarks: [] };
    }
};
