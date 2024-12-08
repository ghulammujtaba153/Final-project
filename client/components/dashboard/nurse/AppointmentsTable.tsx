'use client';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Define the types for the data you expect to receive
interface Column {
  id: 'avatar' | 'fullName' | 'email' | 'contactNumber' | 'testName' | 'appointmentDate' | 'appointmentTime' | 'status';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'avatar', label: 'Profile', minWidth: 60 },
  { id: 'fullName', label: 'Full Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'contactNumber', label: 'Contact Number', minWidth: 150 },
  { id: 'testName', label: 'Test Name', minWidth: 150 },
  { id: 'appointmentDate', label: 'Appointment Date', minWidth: 150 },
  { id: 'appointmentTime', label: 'Appointment Time', minWidth: 150 },
  { id: 'status', label: 'Status', minWidth: 120 }, // New status column
];

interface Data {
  avatar: string;
  fullName: string;
  email: string;
  contactNumber: string;
  testName: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  _id: string; // Add _id for row navigation
}

interface TestAppointmentTableProps {
  data: Data[];
}

const TestAppointmentTable: React.FC<TestAppointmentTableProps> = ({ data }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading]= React.useState(false);
  const router = useRouter(); // Use Next.js router for navigation

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Function to format date and time
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString: string) => {
    const [hour, minute] = timeString.split(':');
    const formattedTime = new Date();
    formattedTime.setHours(Number(hour), Number(minute));
    return formattedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleRowClick = (id: string) => {
    setLoading(true);
    router.push(`/nurse/appointments/${id}`); // Navigate to appointment details page
    setLoading(false)
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold' }} // Make label bold
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row._id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleRowClick(row._id)} // Handle row click with router.push
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'avatar' ? (
                          <img src={value} alt="Profile Avatar" style={{ width: 50, height: 50, borderRadius: '50%' }} />
                        ) : column.id === 'appointmentDate' ? (
                          formatDate(value) // Format date
                        ) : column.id === 'appointmentTime' ? (
                          formatTime(value) // Format time
                        ) : (
                          value // Display other column values directly
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {loading && <div className="loading-spinner">Loading...</div>}
    </Paper>
  );
};

export default TestAppointmentTable;
