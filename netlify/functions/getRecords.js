const { REACT_APP_AIRTABLE_API_TOKEN, REACT_APP_BASE } = process.env;

export async function handler(req, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      apiKey: REACT_APP_AIRTABLE_API_TOKEN,
      base: REACT_APP_BASE,
    }),
  };
}
