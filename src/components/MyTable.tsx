import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Paper,
  } from "@mui/material";

const MyTable = () => {

  interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
  }
  
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);//start loading
    axios
      .get<Product[]>("https://fakestoreapi.com/products")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <>
     {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
    <TableContainer component={Paper} >
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell align="left">Title</TableCell>
          <TableCell align="center">Price</TableCell>
          <TableCell align="center">Category</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((d) => (
          <TableRow
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            key={d.id}
          >
            <TableCell component="th" scope="row">
              {d.id}
            </TableCell>
            <TableCell align="left">{d.title}</TableCell>
            <TableCell align="center">{d.price}</TableCell>
            <TableCell align="center">{d.category}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
      )}
  </>
  );
};

export default MyTable;
