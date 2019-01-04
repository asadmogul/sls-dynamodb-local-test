'use strict';
const dynamodb = require('../dynamodb');

module.exports.get = (event, context, callback) => {

  console.log("\nEvent\n",event);
  console.log("\nContext\n",context);
  
  let title = event.pathParameters.title.replace(/%20/g," ");
  let year = parseInt(event.pathParameters.year);
  console.log("Title: " + title + "\nYear: " + year);
  console.log(event.queryStringParameters);
  
  // if (typeof event.pathParameters.title !== 'string' || typeof event.pathParameters.year !== 'number') {
  //   console.error('Validation Failed');
  //   callback(null, {
  //     statusCode: 400,
  //     headers: { 'Content-Type': 'text/plain' },
  //     body: 'Couldn\'t create the todo item.',
  //   });
  //   return;
  // }
  const params = {
    TableName: process.env.DYNAMODB_TABLE2,
    Key: {
      year: year,
      title: title
    },
  };

  // fetch todo from the database
  dynamodb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todo item.',
      });
      return;
    }

    console.log(result.Item);
    
        // create a response
    if (result.Item == ""){
      const response = {
        statusCode: 400,
        body: "Bad Request",
      };
      callback(null, response);
    }
    else{
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    }
    
  });
};