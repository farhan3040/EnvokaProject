import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function App() {
 
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const getUserList = () => {
    setUsers([]);
    axios.get(`https://newsapi.org/v2/everything?q=apple&from=2021-03-26&to=2021-03-26&sortBy=popularity&pageSize=${rowsPerPage}&page=${page+1}&apiKey=11efb08bf45a4e18919c4be246693a22`).then(res => {
      setUsers(res.data.articles);
     
    }).catch(err => {
      console.log("Error", err)
      setUsers([]);
    });
  }
 
  useEffect(() => {
    console.log("Fomr Effedct",rowsPerPage)
     getUserList();
  },[page]);
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const showTable = () =>{
    if(users.length >0){
      const ded = page*5
      const takeup = users.map((item, index)=>(
        <StyledTableRow key={item.publishedAt}>
          <StyledTableCell align="right">
            {(index+ded)+1}
          </StyledTableCell>
          <StyledTableCell align="right">{item.source.id == null ? "Nothing":item.source.id}</StyledTableCell>
          <StyledTableCell align="right">{item.source.name}</StyledTableCell>
          <StyledTableCell align="right">{item.author}</StyledTableCell>
          <StyledTableCell align="right">{item.publishedAt}</StyledTableCell>
        </StyledTableRow>
      ))
      return takeup
    }
    else{
      console.log("Nothing")
    } 
  }
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
    });

  const classes = useStyles();
  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
            <TableRow>
              <StyledTableCell align="right">Sn No.</StyledTableCell>
              <StyledTableCell align="right">Source Id</StyledTableCell>
              <StyledTableCell align="right">Source Name</StyledTableCell>
              <StyledTableCell align="right">Author</StyledTableCell>
              <StyledTableCell align="right">PublishedAt</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showTable()}
        </TableBody>
      </Table>
     
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={30}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
 
export default App;