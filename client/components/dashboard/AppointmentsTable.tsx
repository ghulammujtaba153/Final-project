import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation'; // Use useRouter from Next.js

function AppointmentsTable({ appointments }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const router = useRouter(); // Initialize useRouter

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (id) => {
    router.push(`/doctordashboard/appointments/${id}`); // Navigate to the appointment details page
  };

  const columns = [
    { id: 'profile', label: 'Profile', minWidth: 170 },
    { id: 'fullName', label: 'Patient Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 100 },
    { id: 'appointmentTiming', label: 'Appointment Timing', minWidth: 170, align: 'right' }
  ];

  const rows = appointments.map((appointment) => ({
    id: appointment._id, // Add the appointment ID for linking
    profile: (
      <Avatar
        alt={appointment.patientId.firstName}
        src={appointment.patientId.profile}
        sx={{ width: 56, height: 56 }}
      />
    ),
    fullName: `${appointment.patientId.firstName} ${appointment.patientId.lastName}`,
    email: appointment.patientId.email,
    status: appointment.status,
    appointmentTiming: new Date(appointment.parsedTiming).toLocaleString(), // Format for date and time
  }));

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
                  style={{ minWidth: column.minWidth, fontWeight: 'bold', backgroundColor: '#f5f5f5' }}
                >
                  <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  onClick={() => handleRowClick(row.id)} // Navigate on row click
                  style={{ cursor: 'pointer' }}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} style={{ padding: '16px' }}>
                        {value}
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default AppointmentsTable;
