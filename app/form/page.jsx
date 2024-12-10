'use client';
import { useEffect, useState } from 'react';

export default function DynamoDBTable() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [newItem, setNewItem] = useState({ name: '', age: '' });

    const fetchData = async () => {
        try {
            const response = await fetch('/api/fetchData');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setItems(data);
        } catch (err) {
            setError(err);
            console.error("Error fetching data:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/fetchData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });
            
            if (!response.ok) throw new Error('Failed to add item');
            
            // Refresh the data
            fetchData();
            // Clear the form
            setNewItem({ name: '', age: '' });
        } catch (err) {
            setError(err);
            console.error("Error adding item:", err);
        }
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">DynamoDB Data</h1>
            
            {/* Add New Item Form */}
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Age"
                        value={newItem.age}
                        onChange={(e) => setNewItem({...newItem, age: e.target.value})}
                        className="border p-2 rounded"
                        required
                    />
                    <button 
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Item
                    </button>
                </div>
            </form>

            {/* Display Table */}
            <table className="w-full border-collapse border">
                <thead>
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Age</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td className="border p-2">{item.name}</td>
                            <td className="border p-2">{item.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
