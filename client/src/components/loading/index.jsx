import React from 'react'
import { Box, Typography, useTheme} from '@mui/material';

const Loading = () => {
  const theme = useTheme();

  return (
    <Box mt="10px">
        <Typography color={theme.palette.primary.main}>
            Carregando suas informações... Aguarde um momento, por favor!
        </Typography>
    </Box>
  )
}

export default Loading