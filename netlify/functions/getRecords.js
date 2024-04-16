const { AIRTABLE_API_KEY } = process.env;

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      endpointUrl: 'https://api.airtable.com',
      apiKey: AIRTABLE_API_KEY,
    }),
  };
};

// var Airtable = require('airtable');
// Airtable.configure({
//   endpointUrl: 'https://api.airtable.com',
//   apiKey: AIRTABLE_API_KEY,
// });
// var base = Airtable.base('app5FOsWcUdyn7EAx');
