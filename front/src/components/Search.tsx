import { useEffect, useState, useRef } from 'react';
import { Grid, TextField, Autocomplete, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import KitService from '../services/KitService';
import KitTable from './KitTable';
import Kit from '../models/Kit'
import constants from '../helper/constants';

const Search = () => {
  const [kitId, setKitId] = useState<string>('')
  const [suggestions, setSuggestions] = useState<Array<Kit>>([])
  const [searchedKits, setSearchedKits] = useState<Array<Kit>>([])

  useEffect(() => {
    const controller = new AbortController();
    const suggestionEffect = async () => {
      if (kitId !== '') {
        setSuggestions((await KitService.getKits({ searchTerm: kitId, controller })) ?? [])
      }
    }

    suggestionEffect()
    return () => controller.abort();
  }, [kitId])

  return <Grid container justifyContent="center">
    <Grid item xs={10}>
      <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: '5px' }}>
        <Autocomplete
          value={kitId}
          onChange={(event, newValue) => {
            console.log('got here')
            if (typeof newValue === 'string') {
              setKitId(newValue);
            } else if (newValue) {
              setKitId(newValue.label_id);
            }
          }}
          options={suggestions}
          getOptionLabel={(option) => (typeof option === 'string') ? option : option.label_id}
          freeSolo
          autoComplete
          renderInput={(params) => (<TextField {...params} label="Kit ID" onChange={(e) => setKitId(e.target.value)} />)}
          sx={{ width: '98%' }}
        />
        <IconButton disabled={!kitId} onClick={(async () => setSearchedKits((await KitService.getKits({ searchTerm: kitId, exactMatch: false, count: constants.pageSize })) ?? []))}>
          <SearchIcon />
        </IconButton>
      </div>
    </Grid>
    <Grid xs={10}>
      <KitTable kitId={kitId} initialKits={searchedKits} />

    </Grid>
  </Grid>
}

export default Search