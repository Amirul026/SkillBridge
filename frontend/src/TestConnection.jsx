import React, { useEffect, useState } from 'react';
import api from './services/api';





console.log("TestConnection component loaded");


const TestConnection = () => {
    const [message, setMessage] = useState('Thamvai-connection-lagaitesi...');

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await api.get('/test');
                setMessage(response.data.message);
            } catch (error) {
                console.error('Error connecting to backend:', error);
                setMessage('Failed to connect to backend.');
            }
        };

        fetchMessage();
    }, []);

    return (
        <div>
            <h1>Bismillah,Laravel-App Connection Test</h1>
            <p>{message}</p>
        </div>
    );
};

export default TestConnection;