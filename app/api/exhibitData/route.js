import { NextResponse } from 'next/server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';

const client = new DynamoDBClient({
    region: process.env.NEXT_PUBLIC_AWS_REGION || 'ap-south-1',
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
    }
});

const docClient = DynamoDBDocumentClient.from(client);

// GET method to fetch all items
export async function GET() {
    try {
        const command = new ScanCommand({
            TableName: 'Test'
        });

        const data = await docClient.send(command);
        return NextResponse.json(data.Items);
    } catch (err) {
        console.error("Detailed error fetching data:", err);
        return NextResponse.json(
            { error: 'Failed to fetch DynamoDB data' },
            { status: 500 }
        );
    }
}

// POST method to add new item
export async function POST(request) {
    try {
        const body = await request.json();
        
        // Updated validation
        if (!body.name || !body.organization_name) {
            return NextResponse.json(
                { error: 'Name and organization name are required' },
                { status: 400 }
            );
        }

        const params = {
            TableName: 'Exhibits',
            Item: {
                exhibit_id: uuidv4(),
                name: body.name,
                organization_name: body.organization_name,
                designation: body.designation || '',
                contact: body.contact || '',
                email: body.email || '',
                website: body.website || '',
                stall_number: body.stall_number || ''
            }
        };

        await docClient.send(new PutCommand(params));
        
        return NextResponse.json({ message: 'Item added successfully' });
    } catch (err) {
        console.error("Detailed error adding item:", err);
        return NextResponse.json(
            { 
                error: 'Failed to add item to DynamoDB',
                details: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
            },
            { status: 500 }
        );
    }
} 