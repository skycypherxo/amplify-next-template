import { NextResponse } from 'next/server';

// In-memory cache for reserved stalls
const reservedStalls = new Map();

// POST to reserve stalls
export async function POST(request) {
  try {
    const { stall_id, duration } = await request.json();

    if (!stall_id) {
      return NextResponse.json(
        { error: 'Stall ID is required' },
        { status: 400 }
      );
    }

    // Check if the stall is already reserved
    if (reservedStalls.has(stall_id)) {
      console.log(`Stall ${stall_id} is already reserved`);
      return NextResponse.json(
        { error: 'Stall is already reserved' },
        { status: 400 }
      );
    }

    // Reserve stall and set expiration
    const expiryTime = Date.now() + (duration || 30000); // Default 30 seconds
    reservedStalls.set(stall_id, expiryTime);
    console.log(`Stall ${stall_id} reserved until ${new Date(expiryTime)}`);

    setTimeout(() => {
      // Automatically remove stall after expiry
      if (reservedStalls.get(stall_id) === expiryTime) {
        reservedStalls.delete(stall_id);
        console.log(`Stall ${stall_id} reservation expired`);
      }
    }, duration || 30000);

    return NextResponse.json({ message: 'Stall reserved successfully' });
  } catch (err) {
    console.error('Error reserving stall:', err);
    return NextResponse.json(
      { error: 'Failed to reserve stall' },
      { status: 500 }
    );
  }
}

// GET to fetch reserved stalls
export async function GET() {
  try {
    const now = Date.now();
    const activeReservations = Array.from(reservedStalls.entries())
      .filter(([, expiry]) => expiry > now)
      .map(([stall_id]) => stall_id);

    console.log('Active Reservations:', activeReservations);
    return NextResponse.json(activeReservations);
  } catch (err) {
    console.error('Error fetching reserved stalls:', err);
    return NextResponse.json(
      { error: 'Failed to fetch reserved stalls' },
      { status: 500 }
    );
  }
}
