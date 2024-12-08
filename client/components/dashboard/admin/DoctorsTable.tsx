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
import Button from '@mui/material/Button';
import EditDoctorModal from './EditDoctorModal';
import API_BASE_URL from '@/utils/apiConfig';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteDoctor } from '@/redux/slices/doctorsSlice';

const columns = [
  { id: 'profile', label: 'Profile', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 150 },
  { id: 'contact', label: 'Contact', minWidth: 100 },
  { id: 'timing', label: 'Timing', minWidth: 100 },
  { id: 'specialization', label: 'Specialization', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 170, align: 'right' },
];

export default function DoctorsTable({ doctors }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch=useDispatch();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async (doctor: any) => {
    const userId = doctor.userId._id;
    const doctorId = doctor._id;

    try {
      // await axios.delete(`${API_BASE_URL}/doctors/delete/${userId}/${doctorId}`);
      await dispatch(deleteDoctor({ userId, doctorId })).unwrap();
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };


  return (
    <Paper className="shadow-lg rounded-md">
      <TableContainer className="overflow-x-auto">
        {/* Add a responsive container */}
        <Table aria-label="doctors table" className="min-w-[150px] md:min-w-[750px]">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className="bg-gray-200 text-gray-700"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((doctor) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={doctor?.userId?._id}>
                  <TableCell>
                    <img
                      src={doctor?.userId?.profile}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell>{doctor?.userId?.firstName} {doctor?.userId?.lastName}</TableCell>
                  <TableCell>{doctor?.userId?.email}</TableCell>
                  <TableCell>{doctor?.userId?.contactNumber}</TableCell>
                  <TableCell>{doctor?.availability?.startTime} - {doctor?.availability?.endTime}</TableCell>
                  <TableCell>{doctor?.specialization}</TableCell>
                  <TableCell align="right">
                    <div className="flex gap-2 justify-end">
                      <EditDoctorModal
                        doctorId={doctor}
                        
                      />
                      <Button
                        onClick={() => handleDelete(doctor)}
                        variant="contained"
                        color="error"
                        className="bg-red-500 text-white"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={doctors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
