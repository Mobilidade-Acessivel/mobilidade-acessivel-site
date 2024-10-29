import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import top100Locations from './top100Locations'; // Importando locais

export default function ComboBox({ onLocationSelect }) {
  return (
    <Autocomplete
      disablePortal
      options={top100Locations} // Usando os locais
      getOptionLabel={(option) => option.label} // Usando apenas o label
      onChange={(event, value) => {
        if (value) {
          onLocationSelect(value); // Chama a função com o local selecionado
        }
      }}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Pesquisar Local" />}
    />
  );
}
