import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

// Configure AWS
AWS.config.update({
    region: 'ap-south-1',
    credentials: new AWS.Credentials({
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
    })
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// GET method to fetch all items
export async function GET() {
    const params = {
        TableName: 'Awards'
    };

    try {
        const data = await dynamoDB.scan(params).promise();
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
        
        const params = {
            TableName: 'Awards',
            Item: {
                email_id: body.email_id, 
                name: body.name,
                age: Number(body.age),
                organization_name : body.organization_name,
                designation : body.designation,
                contact : Number (body.contact),
                social_link : body.social_link,
                award_category : body.award_category,
                project_details : body.project_details,
                reason:body.reason
            }
        };

        await dynamoDB.put(params).promise();
        
        return NextResponse.json({ message: 'Item added successfully' });
    } catch (err) {
        console.error("Error adding item:", err);
        return NextResponse.json(
            { error: 'Failed to add item to DynamoDB' },
            { status: 500 }
        );
    }
} 