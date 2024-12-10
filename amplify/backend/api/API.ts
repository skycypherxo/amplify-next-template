import { defineData } from '@aws-amplify/backend';

const data = defineData({
  schema: `
    type Test @model {
      test_id: ID!
      name: String!
      age: Int!
    }
  `,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    // Add IAM if you're using AWS credentials
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    }
  }
});

export const handler = data.handler; 