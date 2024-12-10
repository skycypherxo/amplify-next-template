import { NextResponse } from 'next/server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

// POST method to add/update stall status
export async function POST(request) {
    try {
      const body = await request.json();
  
      // Validate input - check if Stall_Number exists (based on the error message)
      if (!body.stall_id) {
        return NextResponse.json(
          { error: 'Stall ID is required' },
          { status: 400 }
        );
      }
  
      // Ensure you're using the correct field name for the key, which is "Stall_Number" (as per the error)
      const command = new PutCommand({
        TableName: 'Stalls',
        Item: {
          Stall_Number: body.stall_id,  // Change "stall_id" to "Stall_Number"
          booking_status: true,
        },
      });
  
      await docClient.send(command);
  
      return NextResponse.json({ message: 'Stall status updated successfully' });
    } catch (err) {
      console.error("Detailed error updating stall:", err);
      return NextResponse.json(
        { error: 'Failed to update stall status' },
        { status: 500 }
      );
    }
  }
  

// GET method to fetch booked stalls
export async function GET() {
  try {
    const command = new ScanCommand({
      TableName: 'Stalls',
      FilterExpression: 'booking_status = :status',
      ExpressionAttributeValues: {
        ':status': true,
      },
    });

    const data = await docClient.send(command);
    return NextResponse.json(data.Items);
  } catch (err) {
    console.error('Detailed error fetching stalls:', err);
    return NextResponse.json(
      { error: 'Failed to fetch stalls' },
      { status: 500 }
    );
  }
}
