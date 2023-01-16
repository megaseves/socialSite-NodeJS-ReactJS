export function hasUsername() {
    // return true if localStorage has a (username) value
    return localStorage.getItem("username");
}

export function getUsername() {
    return localStorage.getItem("username");
}
