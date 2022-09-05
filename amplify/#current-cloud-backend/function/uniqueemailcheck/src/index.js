/* Amplify Params - DO NOT EDIT
	API_PADELPROMANAGER_GRAPHQLAPIIDOUTPUT
	API_PADELPROMANAGER_USERTABLE_ARN
	API_PADELPROMANAGER_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const aws = require('aws-sdk');
const ddb = new aws.DynamoDB();

exports.handler = async event => {
  const {input} = event.arguments;

  // Adding this IF condition only to ensure that we run the check if the username was being set
  if (input.email) {
    const params = {
      TableName: process.env.API_PADELPROMANAGER_USERTABLE_NAME,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': input.email,
      },
    };

    // We queried the database associated with the `User` model directly, but feel free to use the `getUserByUsername` query too
    const record = await ddb.query(params).promise();

    if (record.Count > 0 && record.Items[0].id !== event.identity.sub) {
      throw new Error(`${input.email} has been taken. Use another email`);
    }
  }

  // All is well
  return {};
};
