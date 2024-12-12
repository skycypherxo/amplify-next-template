import { NextResponse } from 'next/server';

// In-memory cache for reserved stalls
const reservedStalls = new Map();

// POST to reserve stalls in batch
export async function POST(request) {
  try {
    const { stall_ids, duration } = await request.json();

    // Validate input
    if (!stall_ids || !Array.isArray(stall_ids) || stall_ids.length === 0) {
      return NextResponse.json(
        { error: 'Stall IDs are required and must be a non-empty array' },
        { status: 400 }
      );
    }

    // Check for already reserved stalls
    const conflictingStalls = stall_ids.filter(stall_id => 
      reservedStalls.has(stall_id)
    );

    if (conflictingStalls.length > 0) {
      console.log(`Stalls already reserved: ${conflictingStalls.join(', ')}`);
      return NextResponse.json(
        { 
          error: 'Some stalls are already reserved', 
          conflictingStalls 
        },
        { status: 400 }
      );
    }

    // Reserve stalls and set expiration
    const expiryTime = Date.now() + (duration || 30000); // Default 30 seconds
    
    stall_ids.forEach(stall_id => {
      reservedStalls.set(stall_id, expiryTime);
      console.log(`Stall ${stall_id} reserved until ${new Date(expiryTime)}`);
    });

    // Set up expiration for each reserved stall
    stall_ids.forEach(stall_id => {
      setTimeout(() => {
        // Automatically remove stall after expiry if it hasn't been modified
        if (reservedStalls.get(stall_id) === expiryTime) {
          reservedStalls.delete(stall_id);
          console.log(`Stall ${stall_id} reservation expired`);
        }
      }, duration || 30000);
    });

    return NextResponse.json({ 
      message: 'Stalls reserved successfully',
      reservedStalls: stall_ids 
    });
  } catch (err) {
    console.error('Error reserving stalls:', err);
    return NextResponse.json(
      { error: 'Failed to reserve stalls' },
      { status: 500 }
    );
  }
}

// GET to fetch reserved stalls remains the same
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

// Client-side reservation function
async function reserveStalls(selectedStalls, duration = 30000) {
  // Convert stall IDs to numbers and remove any non-digit characters
  const stallNumbers = selectedStalls.map(stallId => 
    parseInt(stallId.replace(/[^\d]/g, ""), 10)
  );

  try {
    const response = await fetch("/api/reservedStall", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        stall_ids: stallNumbers, 
        duration 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to reserve stalls');
    }

    return await response.json();
  } catch (error) {
    console.error('Stall reservation error:', error);
    throw error;
  }
}