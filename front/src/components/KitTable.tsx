import { useEffect, useState } from 'react';
import { Grid, Button, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody } from '@mui/material';
import KitService from '../services/KitService';
import Kit from '../models/Kit'
import constants from '../helper/constants'

interface KitTableProps {
  kitId: string,
  initialKits: Array<Kit>,
}

const KitTable = (props: KitTableProps) => {
  const { kitId, initialKits } = props;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [retrievedKits, setRetrievedKits] = useState<Array<Kit>>([]);
  const [disableNext, setDisableNext] = useState<boolean>(false);

  useEffect(() => {
    setCurrentPage(0);
    setRetrievedKits([]);
  }, [initialKits])

  useEffect(() => {
    const controller = new AbortController();
    const pageEffect = async () => {
      if (currentPage === 0) {
        setRetrievedKits([]);
        return;
      }
      const nextPageKits = await KitService.getKits({ searchTerm: kitId, controller, exactMatch: false, count: constants.pageSize, pageNumber: currentPage })
      if (nextPageKits.length > 0) {
        setRetrievedKits(nextPageKits);
        setDisableNext(false);
        return;
      }

      setDisableNext(true);
    }

    pageEffect();
    return () => controller.abort();
  }, [currentPage]);


  return <Grid container>
    <Grid item xs={12}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Label Id</TableCell>
              <TableCell align="right">DB Id</TableCell>
              <TableCell align="right">Tracking</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(retrievedKits.length > 0 ? retrievedKits : initialKits).map((kit) => (
              <TableRow
                key={kit.id}
              >
                <TableCell >{kit.label_id}</TableCell>
                <TableCell align="right">{kit.id}</TableCell>
                <TableCell align="right">{kit.shipping_tracking_code}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
    <Grid item justifyContent="space-between">
      <Button
        disabled={currentPage === 0}
        onClick={() => setCurrentPage((previous) => (previous - 1) >= 0 ? (previous - 1) : 0)}
      >
        Previous
      </Button>
      {/* Normally I would handle the pagination controls by getting the needed information from the db.
          In teh itnerest of time I'm jsut going to do it here. */}
      <Button
        disabled={disableNext}
        onClick={() => setCurrentPage((previous) => previous + 1)}
      >
        Next
      </Button>
    </Grid>
  </Grid>
}

export default KitTable;