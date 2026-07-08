import { environments } from '../../environments';

const password = environments.qa.accountPassword;

export const users = [
    {
        username: 'swift_tester',
        password,
        acceptedUser: true
    },
    {
        username: 'vault_locked',
        password,
        acceptedUser: false
    },
    {
        username: 'buggy_agent',
        password,
        acceptedUser: true
    },
    {
        username: 'mirage_user',
        password,
        acceptedUser: true
    },
    {
        username: 'invalid_user',
        password: '123456',
        acceptedUser: false
    }
];

export function getUser(username: string) {
    const user = users.find(user => user.username === username);

    if (!user) {
        throw new Error(`Test user not found: ${username}`);
    }

    return user;
}