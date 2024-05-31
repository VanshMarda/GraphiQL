export async function graphQLFetcher(graphQLParams) {
    const response = await fetch('https://countries.trevorblades.com/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphQLParams),
    });
    return response.json();
  }
