require('dotenv').config();
const faunadb = require('faunadb');

const { query } = faunadb;

const authClient = secret => new faunadb.Client({
    secret,
});

const createGuestClient = () => {
    // @TODO: Create GUEST role, replace KEY
    if (!process.env.FAUNA_GUEST_KEY) {
        throw new Error('FAUNA_ADMIN_KEY not found');
    }

    const client = new faunadb.Client({
        secret: process.env.FAUNA_GUEST_KEY,
    });

    return client;
};

const guestClient = createGuestClient();

export {
    guestClient,
    authClient,
    query,
};
