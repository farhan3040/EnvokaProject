import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'name', label: 'Source Id', minWidth: 170 ,},
  { id: 'code', label: 'Source Name', minWidth: 100 },
  {
    id: 'population',
    label: 'Author',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'PublishedAt',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  
];

function createData(name, code, population, size) {
  return { name, code, population, size };
}

const rows = [
  createData(`{srcN}`, '{srcN}', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 800,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [datas, setdatas] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const [srcI, setSrcId] = useState();
  const [srcN, setName] = useState();
  const [Aut, setAuthor] = useState();
  const [pAt, setPublish] = useState();


  useEffect(() => {
    
    getData();
  },[datas]);

  async function getData(){
    const res = await axios.get(
      `https://newsapi.org/v2/everything?q=tesla&from=2021-02-26&sortBy=publishedAt&apiKey=11efb08bf45a4e18919c4be246693a22`
      );
      console.log("working",res.data)
      setdatas(res.data)
      // console.log(res.data.articles[1].source.id);
      // console.log(res.data.articles[1].source.name);
      // console.log(res.data.articles[1].author);
      // console.log(res.data.articles[1].publishedAt);

      setSrcId(res.data.articles[1].source.id);
      setName(res.data.articles[1].source.name);
      setAuthor(res.data.articles[1].author);
      setPublish(res.data.articles[1].publishedAt);

  }

  const showhere = () => {
    if(datas.length > 0){
     return(<p>Farhan</p>)
    }else{
      getData()
      return(<p>Akhil</p>)
      //console.log(datas.length)
    }
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
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
          <TableBody><p>kjhasdk</p>
            {showhere()}
            {/* {datas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })} */}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <h5>SourceId : {srcI}</h5>
      <h5>SourceName : {srcN}</h5>
      <h5>Author : {Aut}</h5>
      <h5>publishedAt : {pAt}</h5>
    </Paper>
  );
}
