// PersonCards.jsx
import React, { useEffect, useState } from 'react';
import './panelist.css'; // Ensure you import your CSS file for styling

const PersonCards = () => {
    const [people, setPeople] = useState([]); // State to hold the fetched people data
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to manage error status

    useEffect(() => {
        // Fetch the JSON data
        const fetchData = async () => {
            try {
                const response = await fetch('/path/to/your/data.json'); // Update with the correct path to your JSON file
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPeople(data.people); // Set the people state with the fetched data
            } catch (error) {
                setError(error.message); // Set error message if fetch fails
            } finally {
                setLoading(false); // Set loading to false after data is fetched or if there's an error
            }
        };

        fetchData(); // Call the fetch function
    }, []); // Empty dependency array means this effect runs once on mount

    if (loading) {
        return <div>Loading...</div>; // Show loading message while fetching data
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error message if fetch fails
    }

    return (
        <div className="container">
            {people.map((person) => (
                <div className="person-card" key={person.id}>
                    <img src={person.image} alt={person.name} />
                    <h2>{person.name}</h2>
                    <p>{person.info}</p>
                </div>
            ))}
        </div>
    );
};

export default PersonCards;