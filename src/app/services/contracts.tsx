export const getMongoData = (filter: any) => {
    return fetch('http://localhost:3000/api/contracts',
    {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(
          {
            model: 'contract',
            fields: [
              "Indicador",
              "Resultat",
              "Any",
              "Centre",
              "-_id"
            ],
            filter: filter
          }
        ),
    }).then(res => res.json());
}

export const getCentros = (filter: any) => {
  return fetch('http://localhost:3000/api/contracts',
  {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(
        {
          model: 'licencia',
          fields: [
            "Centros",
            "-_id"
          ],
          filter: filter
        }
      ),
  }).then(res => res.json());
}