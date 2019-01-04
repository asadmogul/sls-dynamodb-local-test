'use strict';

const dynamodb = require('../dynamodb');

module.exports.query = (event, context, callback) => {
  const params = {
    ExpressionAttributeValues: {
      ':c' : {BOOL: false}
    },
   FilterExpression: "contains (checked, :c)",
   TableName: process.env.DYNAMODB_TABLE
  };
  // fetch all todos from the database
  dynamodb.query(params, (error, result) => {
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

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};