import React from 'react'
import { Box, Typography, useTheme} from '@mui/material';

const Loading = ({isRegister}) => {
  const theme = useTheme();

  return (
    <Box mt="10px">
        <Typography color={theme.palette.primary.main}>
          {!isRegister ? 
            (
              <>
                Carregando suas informações... Aguarde um momento, por favor!
              </>
            ): (
              <>
                Fazendo seu registro, aguarde um momento...
              </>
          )}
        </Typography>
    </Box>
  )
}

export default Loading