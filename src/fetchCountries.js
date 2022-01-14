export default function fetchCountries(name) {
    const baseUrl = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages;`;
    return fetch(baseUrl).then(responce => {
        if (responce.ok) {
            return responce.json();
        }
        throw new Error(responce.status);
    });
}