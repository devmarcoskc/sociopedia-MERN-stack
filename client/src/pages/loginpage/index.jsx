import React from 'react'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Form from './form';

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-with: 1000px)");

  alert('Devido o site estar hospedado em uma plataforma gratuita, o loading das funcionalidades pode demorar um pouco! Por favor, seja paciente')

  return (
    <Box>
      <Box 
        width="100%" 
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
        >
          Sociopedia
        </Typography>
        <Box 
          width={isNonMobileScreens ? "50%" : "93"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography fontWeight="500" variant="h5" sx={{mb:"1.5rem"}}>
            Seja bem-vindo a Sociopedia, sua rede social!
          </Typography>
          <Form/>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignContent="center" textAlign="center" width="100%" gap="5px">
        <Typography mt="10px">
          Como o projeto está em fase de testes! Pode-se 
          usar um email fake que segue os padrões! O mesmo
          vale para a senha!
        </Typography>
        <Typography>
          Exemplo para login: fake@gmail.com
        </Typography>
        <Typography>
          Exemplo para senha: fakesenha
        </Typography>
      </Box>
    </Box>
  )
}

export default LoginPage;