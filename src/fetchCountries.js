const ENDPOINT = 'https://restcountries.com/v3.1/name';
const OPTIONS = '?fields=name,capital,population,flags,languages';

export function fetchCountries(name) { 
    return fetch(`${ENDPOINT}/${name}${OPTIONS}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .catch(error => {
    alert(error)  });
}


// Оставила второй вариант с просто стокой параметров запроса

// export default function fetchCountry(name) { 
//     return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   })
//   .catch(error => {
//     alert(error)  });
// }

