"use client";

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TestEditModal from './TestEditModal'; // Import the modal component
import { TestData, TestListProps } from '@/utils/types'; // Import the types
import axios from 'axios';
import API_BASE_URL from '@/utils/apiConfig';

const columns = [
  { id: 'testName', label: 'Test Name', minWidth: 170 },
  { id: 'picture', label: 'Picture', minWidth: 100 },
  { id: 'price', label: 'Price', minWidth: 100 },
  { id: 'description', label: 'Description', minWidth: 170 },
  { id: 'createdAt', label: 'Created At', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 150 },
];

export default function TestList({ data, onEdit, onDelete }: TestListProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedTest, setSelectedTest] = React.useState<TestData | null>(null);
  const [openEditModal, setOpenEditModal] = React.useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (test: TestData) => {
    setSelectedTest(test);
    setOpenEditModal(true);
  };

  

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedTest(null);
  };

  return (
    <>
      <Paper style={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer style={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth, fontWeight: 'bold' }} // Bold label titles
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    <TableCell>{row.testName}</TableCell>
                    <TableCell>
                      <img src={row.picture} alt={row.testName} style={{ width: 50, height: 50 }} />
                    </TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(row)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => onDelete(row._id)} color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
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
      </Paper>
      {selectedTest && (
        <TestEditModal
          test={selectedTest}
          open={openEditModal}
          onClose={handleCloseEditModal}
          onEdit={onEdit}
        />
      )}
    </>
  );
}
