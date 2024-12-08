import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';

interface Column {
  id: 'profile' | 'fullName' | 'email' | 'contact' | 'dateOfBirth';
  label: string;
  minWidth?: number;
  align?: 'center' | 'left' | 'right';
  format?: (value: any) => string;
}

const columns: readonly Column[] = [
  { id: 'profile', label: 'Profile', minWidth: 100, align: 'center' },
  { id: 'fullName', label: 'Full Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 200 },
  { id: 'contact', label: 'Contact', minWidth: 170 },
  { id: 'dateOfBirth', label: 'Date of Birth', minWidth: 170, format: (value: string) => new Date(value).toLocaleDateString() },
];

interface PatientTableProps {
  data: {
    profile: string;
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    dateOfBirth: string;
  }[];
}

export default function PatientTable({ data }: PatientTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const rows = data.map((patient) =>
    ({
      profile: patient.profile,
      fullName: `${patient.firstName} ${patient.lastName}`,
      email: patient.email,
      contact: patient.contactNumber,
      dateOfBirth: patient.dateOfBirth
    })
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
                  style={{ minWidth: column.minWidth, fontWeight: 'bold' }}  // Bold the label
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'profile' ? (
                            <Avatar alt={row.fullName} src={value} />
                          ) : (
                            column.format && typeof value === 'string'
                              ? column.format(value)
                              : value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
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
