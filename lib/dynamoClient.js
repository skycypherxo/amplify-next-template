import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const config = {
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'ap-south-1'
};

const client = new DynamoDBClient(config);
const docClient = DynamoDBDocumentClient.from(client);

export { client, docClient };