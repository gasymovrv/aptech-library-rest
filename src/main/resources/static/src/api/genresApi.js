export function findAllGenres(fn) {
    return fetch('/genres/findAll')
        .then(r => r.json())
        .then(genresResponse => fn(genresResponse));
}


