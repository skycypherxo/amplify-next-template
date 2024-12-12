import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Simulate a 30-second delay for payment processing
    await new Promise((resolve) => 
      setTimeout(() => {
        resolve(); // Resolve after 30 seconds
      }, 5000) // 30 seconds
    );

    // Return success message after delay
    return NextResponse.json({ message: 'Payment initialized successfully' });
  } catch (err) {
    console.error('Error initializing payment:', err);
    return NextResponse.json(
      { error: 'Failed to initialize payment: ' + err.message },
      { status: 500 }
    );
  }
}