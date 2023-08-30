import React, { useState } from 'react'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Form from './form';
import Loading from '../../components/loading';

const LoginPage = () => {
  const [loadingSettings, setLoadingSettings] = useState({
    isRegister: false,
    isLoading: false
  });
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-with: 1000px)");

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
          mt="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography fontWeight="500" variant="h5" sx={{mb:"1.5rem"}}>
            Seja bem-vindo a Sociopedia, sua rede social!
          </Typography>
          {!loadingSettings.isLoading &&
            <Form loadingSettings={loadingSettings} setLoadingSettings={setLoadingSettings}/>
          }
          {loadingSettings.isLoading && 
            <Loading isRegister={loadingSettings.isRegister}/>
          }
        </Box>
      </Box>
      
      {!loadingSettings.isLoading &&
        <Box display="flex" flexDirection="column" alignContent="center" textAlign="center" width="100%" gap="5px">
          <Typography mt="10px">
            Devido o sistema de hospedagem ser gratuito, as funcionalidades podem demorar alguns
            segundos pela primeira vez!
          </Typography>
          <Typography mt="10px">
            Como o projeto está em fase inicial! Pode-se 
            usar um email fake para testar! O mesmo
            vale para a senha!
          </Typography>
          <Typography>
            Exemplo para login: fake@gmail.com
          </Typography>
          <Typography>
            Exemplo para senha: fakesenha
          </Typography>
        </Box>
      }
    </Box>
  )
}

export default LoginPage;