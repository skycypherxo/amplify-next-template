import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';

// Configure AWS
AWS.config.update({
    region: 'ap-south-1',
    credentials: new AWS.Credentials({
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
    })
});

// Create SES service object
const ses = new AWS.SES({ apiVersion: '2010-12-01' });

export async function POST(req) {
    try {
        const data = await req.json();

        // Create email parameters
        const params = {
            Destination: {
                ToAddresses: [data.email] // Recipient's email
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
                    },
                    Text: {
                        Data: `Invoice Details\n\nOrganization: ${data.orgName}\nContact Person: ${data.contactPerson}\nStall Number: ${data.stallNumber}\nAmount Paid: ${data.amountPaid}\nTransaction ID: ${data.transactionId}`
                    }
                },
                Subject: {
                    Data: 'Your Invoice'
                }
            },
            Source: process.env.AWS_SES_SENDER_EMAIL // Your verified email in SES
        };

        // Send email
        const result = await ses.sendEmail(params).promise();
        
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