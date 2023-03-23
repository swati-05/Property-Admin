export function superNavigation(e, url, navigate) {
    let basePath = '/property'
    if (e.ctrlKey) {
        window.open(`${basePath}${url}`, "_blank");
    } else {
        navigate(url)
    }
}
export function changeUrl(url) {
    window.history.pushState({ prevUrl: url }, "", url);
}