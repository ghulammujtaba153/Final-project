"use client";

import TestList from '@/components/dashboard/nurse/TestList';
import API_BASE_URL from '@/utils/apiConfig';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Page = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios(`${API_BASE_URL}/tests/all`);
                const testsData = res.data.tests;
                console.log(testsData);
                setData(testsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleEdit = (id: string) => {
        console.log('Edit test with ID:', id);
        // Implement edit functionality here
    };

    const handleDelete = async (id: string) => {
        try {
          const res = await axios.delete(`${API_BASE_URL}/tests/${id}`);
          setData(data.filter((test) => test._id !== id));
          console.log(res.data)
        } catch (error) {
          console.error('Error deleting test:', error);
        }
      };

    if (loading) {
        return (
            <Box 
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div className="h-screen">
            <TestList data={data} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default Page;
