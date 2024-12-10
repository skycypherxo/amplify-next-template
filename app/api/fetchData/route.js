import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

// Configure AWS with explicit region
AWS.config.update({
    region: process.env.NEXT_PUBLIC_AWS_REGION || 'ap-south-1',
    credentials: new AWS.Credentials({
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
    })
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// GET method to fetch all items
export async function GET() {
    try {
        // Add logging for debugging
        console.log('Attempting to fetch data from DynamoDB');
        
        const params = {
            TableName: 'Test'
        };

        const data = await dynamoDB.scan(params).promise();
        
        // Log successful response
        console.log('Successfully fetched data:', data);
        
        return NextResponse.json(data.Items);
    } catch (err) {
        // Enhanced error logging
        console.error("Detailed error fetching data:", {
            message: err.message,
            code: err.code,
            statusCode: err.statusCode,
            requestId: err.requestId,
            stack: err.stack
        });

        return NextResponse.json(
            { 
                error: 'Failed to fetch DynamoDB data',
                details: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
            },
            { status: 500 }
        );
    }
}

// POST method to add new item
export async function POST(request) {
    try {
        const body = await request.json();
        
        // Validate input
        if (!body.name || !body.age) {
            return NextResponse.json(
                { error: 'Name and age are required' },
                { status: 400 }
            );
        }

        const params = {
            TableName: 'Test',
            Item: {
                test_id: uuidv4(),
                name: body.name,
                age: Number(body.age)
            }
        };

        await dynamoDB.put(params).promise();
        
        return NextResponse.json({ message: 'Item added successfully' });
    } catch (err) {
        console.error("Detailed error adding item:", {
            message: err.message,
            code: err.code,
            statusCode: err.statusCode,
            requestId: err.requestId,
            stack: err.stack
        });

        return NextResponse.json(
            { 
                error: 'Failed to add item to DynamoDB',
                details: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
            },
            { status: 500 }
        );
    }
} 