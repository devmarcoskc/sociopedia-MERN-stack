import React from 'react'
import NavBar from '../../components/navbar/index.jsx';
import { Box, useMediaQuery, useTheme, TextField, Button, Typography } from '@mui/material';
import EditOutlinedIcon from "@mui/icons-material/EditOffOutlined";
import { useSelector } from 'react-redux';
import UserWidget from '../../components/widgets/userWidget.jsx';
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index.js";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/flexbetween/index.jsx";
import AdvertWidget from '../../components/advertWidget/index.jsx';

const EditProfilePage = () => {
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const {palette} = useTheme();
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editUserSchema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    location: yup.string(),
    occupation: yup.string(),
    pictureEdited: yup.string(),
});

  const initalValuesToEdit = {
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
    occupation: user.occupation,
    pictureEdited: "",
}

  const updateUser = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value])
        }
        formData.append('pictureEdited', values.pictureEdited.name);
    
        const savedUserResponse = await fetch(
            `${import.meta.env.VITE_BASE_URL}/${user._id}`,
            {
                method: "PATCH",
                headers: {"Authorization": `Bearer ${token}`,"Content-Type": "application/json"},
                body: JSON.stringify(values),
            }
        );        
        const UpdatedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();
        if(UpdatedUser) {
            dispatch(
                setLogin({
                    user: UpdatedUser,
                    token: token
                })
            );
            navigate("/home");
        }
  }

  const handleFormSubmit = (values, onSubmitProps) => {
        updateUser(values, onSubmitProps);
  };

  return (
    <Box>
       <NavBar/>
       <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={user._id} picturePath={user.picturePath}/>
        </Box>
        <Box 
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
            {/* */}
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initalValuesToEdit}
                validationSchema={editUserSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": {
                                    gridColumn: isNonMobileScreens ? undefined : "span 4"
                                },
                            }}
                        >
                            <TextField
                                label="Nome"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                                sx={{gridColumn: "span 2"}}
                            />
                            <TextField
                                label="Sobrenome"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                                sx={{gridColumn: "span 2"}}
                            />
                            <TextField
                                label="Cidade"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.location}
                                name="location"
                                error={Boolean(touched.location) && Boolean(errors.location)}
                                helperText={touched.location && errors.location}
                                sx={{gridColumn: "span 4"}}
                            />
                            <TextField
                                label="Profissão"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.occupation}
                                name="occupation"
                                error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                helperText={touched.occupation && errors.occupation}
                                sx={{gridColumn: "span 4"}}
                            />
                            <Box
                                gridColumn="span 4"
                                border={`1px solid ${palette.neutral.medium}`}
                                borderRadius="5px"
                                p="1rem"
                            >
                            
                            <Dropzone
                                acceptedFiles=".jpg,.jpeg,.png"
                                multiple={false}
                                onDrop={(acceptedFiles) => {
                                    setFieldValue("pictureEdited", acceptedFiles[0]);
                                }}
                            >
                                {({getRootProps, getInputProps}) => (
                                    <Box
                                        {...getRootProps()}
                                        border={`2px dashed ${palette.primary.main}`}
                                        p="1rem"
                                        sx={{"&:hover": {cursor: "pointer"} }}
                                    >
                                        <input {...getInputProps()}/>
                                        {!values.pictureEdited ? (
                                            <p>Adicionar uma foto</p>
                                            ): (
                                            <FlexBetween>
                                            <Typography>
                                                {values.pictureEdited.name}
                                            </Typography>
                                            <EditOutlinedIcon/>
                                            </FlexBetween>
                                        )}
                                    </Box>
                                )}
                            </Dropzone>
                        
                        </Box> 

                        </Box>
                        {/*BUTTONS*/}
                        <Box>
                            <Button
                                fullWidth
                                type="submit"
                                sx={{
                                    m:"2rem 0",
                                    p:"1rem",
                                    backgroundColor: palette.primary.main,
                                    color: palette.background.alt,
                                    "&:hover": {color: palette.primary.main}
                                }}
                            >
                                EDITAR
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box> 
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget/>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default EditProfilePage