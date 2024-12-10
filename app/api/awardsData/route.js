import { NextResponse } from 'next/server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

// Configure AWS
const client = new DynamoDBClient({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
    }
});

const docClient = DynamoDBDocumentClient.from(client);

// GET method to fetch all items
export async function GET() {
    const command = new ScanCommand({
        TableName: 'Awards'
    });

    try {
        const data = await docClient.send(command);
        return NextResponse.json(data.Items);
    } catch (err) {
        console.error("Error fetching data:", err);
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
        
        // Validate required fields
        const requiredFields = [
            'email_id',
            'name',
            'organization_name',
            'designation',
            'award_category'
        ];

        const missingFields = requiredFields.filter(field => !body[field]);
        if (missingFields.length > 0) {
            return NextResponse.json(
                { 
                    error: `Missing required fields: ${missingFields.join(', ')}` 
                },
                { status: 400 }
            );
        }

        // Validate and convert contact number if present
        let contactNumber = null;
        if (body.contact) {
            contactNumber = parseInt(body.contact);
            if (isNaN(contactNumber)) {
                return NextResponse.json(
                    { error: 'Invalid contact number' },
                    { status: 400 }
                );
            }
        }

        const command = new PutCommand({
            TableName: 'Awards',
            Item: {
                email_id: body.email_id,
                name: body.name,
                organization_name: body.organization_name,
                designation: body.designation,
                contact: contactNumber,
                social_link: body.social_link || null,
                award_category: body.award_category,
                project_details: body.project_details || null,
                reason: body.reason || null
            }
        });

        await docClient.send(command);
        
        return NextResponse.json({ 
            message: 'Item added successfully',
            data: command.input.Item
        });
    } catch (err) {
        console.error("Error adding item:", err);
        return NextResponse.json(
            { error: 'Failed to add item to DynamoDB' },
            { status: 500 }
        );
    }
} 