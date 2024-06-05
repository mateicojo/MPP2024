import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useState} from 'react';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export default function BasicTable() {
  // quick intro see react hooks pt mai multe:
  // astea-s state variables:
  //       - clickedRow e un accessor a ultimei valori a state-ului
  //       - setClickedRow e un setter pentru valoare; nu poti set state var-ul folosind accesorul ci doar setterul
  //       - useState e un Hook care ia ca parametru un default val pt state var-ul tau; in cazul asta e un empty string
  // in general, de fiecare data cand o sa modifici state-ul componenta ta o sa se randeze din nou
  const [clickedRow, setClickedRow] = useState("");
  const [clickedCol, setClickedCol] = useState("");

  const onCellClicked = (i, j) => {
    setClickedRow(`${i}`);
    setClickedCol(`${j}`);
  }

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell onClick={() => onCellClicked(i, 0)} component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell onClick={() => onCellClicked(i, 1)} align="right">{row.calories}</TableCell>
              <TableCell onClick={() => onCellClicked(i, 2)} align="right">{row.fat}</TableCell>
              <TableCell onClick={() => onCellClicked(i, 3)} align="right">{row.carbs}</TableCell>
              <TableCell onClick={() => onCellClicked(i, 4)} align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br/>
    <div>
      <p><b>You clicked on row: {clickedRow} </b></p>
    </div>
    </>
  );
}