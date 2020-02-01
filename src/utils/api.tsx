export async function callApi() {
  const res = await fetch("https://front-test.beta.aviasales.ru/search")
    .then(r => {
      return r.json();
    })
    .then(r => {
      const { searchId } = r;
      return searchId;
    })
    .then(id => {
      return fetch(
        `https://front-test.beta.aviasales.ru/tickets?searchId=${id}`
      )
        .then(data => {
          return data.json();
        })
        .then(result => {
          return result;
        });
    });

  return res;
}
