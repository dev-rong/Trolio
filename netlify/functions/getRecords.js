const { REACT_APP_AIRTABLE_API_KEY, REACT_APP_BASE } = process.env;

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      key: REACT_APP_AIRTABLE_API_KEY,
      base: REACT_APP_BASE,
    }),
  };
};
