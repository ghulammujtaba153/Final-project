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
import Rating from '@mui/material/Rating';
import { useRouter } from 'next/navigation';

interface Feedback {
  _id: string;
  userId: {
    _id: string;
    profile: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  rating: number;
  liked: string;
  disliked: string;
  suggestion: string;
}

interface Column {
  id: 'avatar' | 'fullName' | 'email' | 'role' | 'rating';
  label: string;
  minWidth?: number;
  align?: 'center' | 'left';
}

const columns: readonly Column[] = [
  { id: 'avatar', label: 'Avatar', minWidth: 70, align: 'center' },
  { id: 'fullName', label: 'Full Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'role', label: 'Role', minWidth: 100 },
  { id: 'rating', label: 'Rating', minWidth: 100, align: 'center' },
];

export default function FeedbackTable({ feedbackData }: { feedbackData: Feedback[] }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const router=useRouter();

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
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbackData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((feedback) => {
                const fullName = `${feedback.userId.firstName} ${feedback.userId.lastName}`;
                return (
                  <TableRow hover role="checkbox" sx={{cursor: 'pointer'}} tabIndex={-1} key={feedback._id} onClick={() => router.push(`/admin/feedback/${feedback._id}`)}>
                    <TableCell align="center">
                      <Avatar alt={fullName} src={feedback.userId.profile} />
                    </TableCell>
                    <TableCell>{fullName}</TableCell>
                    <TableCell>{feedback.userId.email}</TableCell>
                    <TableCell>{feedback.userId.role}</TableCell>
                    <TableCell align="center">
                      <Rating value={feedback.rating} readOnly precision={0.5} />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={feedbackData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
