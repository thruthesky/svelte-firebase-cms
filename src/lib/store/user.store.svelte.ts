
let loggedIn = $state(false);

export function userStore() {
    return {
        get loggedIn() {
            return loggedIn;
        },
        setLogin: () => (loggedIn = true),
        setLogout: () => (loggedIn = false),
    };
}