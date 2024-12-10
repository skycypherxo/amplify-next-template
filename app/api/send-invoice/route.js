import { NextResponse } from 'next/server';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
    }
});

export async function POST(req) {
    try {
        const data = await req.json();

        const command = new SendEmailCommand({
            Destination: {
                ToAddresses: [data.email]
            },
            Message: {
                Body: {
                    Html: {
                        Data: `
                            <h1>Invoice Details</h1>
                            <p>Organization: ${data.orgName}</p>
                            <p>Contact Person: ${data.contactPerson}</p>
                            <p>Stall Number: ${data.stallNumber}</p>
                            <p>Amount Paid: ${data.amountPaid}</p>
                            <p>Transaction ID: ${data.transactionId}</p>
                        `
                    }
                },
                Subject: {
                    Data: 'Your Invoice'
                }
            },
            Source: process.env.AWS_SES_SENDER_EMAIL
        });

        const result = await sesClient.send(command);
        
        return NextResponse.json({ 
            message: 'Email sent successfully',
            messageId: result.MessageId 
        });

    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to send email' },
            { status: 500 }
        );
    }
} 