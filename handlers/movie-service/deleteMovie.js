'use strict';

const dynamodb = require('../dynamodb');

module.exports.delete = (event, context, callback) => {
  let title = event.pathParameters.title.replace(/%20/g," ");
  let year = parseInt(event.pathParameters.year);
  console.log("Title: " + title + "\nYear: " + year);

  const params = {
    TableName: process.env.DYNAMODB_TABLE2,
    Key: {
      year: year,
      title: title
    },
  };

  // delete the todo from the database
  dynamodb.delete(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t remove the todo item.',
      });
      return;
    }

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
}