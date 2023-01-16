export function hasUsername() {
    // return true if localStorage has a (username) value
    return localStorage.getItem("username");
}

export function getUsername() {
    return JSON.parse(localStorage.getItem("username"));
}

export function setUsername(username) {
    localStorage.setItem("username", JSON.stringify(username));
}