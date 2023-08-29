import { useState } from "react";
import { 
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOffOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index.js";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/flexbetween/index.jsx";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("campo obrigatório"),
    lastName: yup.string().required("campo obrigatório"),
    email: yup.string().email("email inválido").required("required"),
    password: yup.string().required("campo obrigatório"),
    location: yup.string().required("campo obrigatório"),
    occupation: yup.string().required("campo obrigatório"),
    picturePath: yup.string().required("campo obrigatório"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("email inválido").required("required"),
    password: yup.string().required("campo obrigatório")
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picturePath: ""
}

const initialValuesLogin = {
    email: "",
    password: "",
}

const Form = ({isLoading, setIsLoading}) => {
    const [pageType, setPageType] = useState("login");
    const [userNotFoundMsg, setUserNotFoundMsg] = useState(false);
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value])
        }
        formData.append('picturePath', values.picturePath.name);
        
        const savedUserResponse = await fetch(
            `${import.meta.env.VITE_BASE_URL}/auth/register`,
            {
                method: "POST",
                body: formData
            }
        );

        if(savedUserResponse.status === 201) {
            const savedUser = await savedUserResponse.json();
            onSubmitProps.resetForm();

            if(savedUser) {
                setPageType("login");
            }
        } else {
            alert("Email já em uso");
        }

    };

    const login = async (values, onSubmitProps) => {
        setIsLoading(true);
        const loggedInResponse = await fetch(
            `${import.meta.env.VITE_BASE_URL}/auth/login`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values),
            }
        );

        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        setIsLoading(false);
        if(loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/home");
        }

    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if(isLogin) await login(values, onSubmitProps);
        if(isRegister) await register(values, onSubmitProps);
    };

return (
    <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
    >
        {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
        }) => (
            <form onSubmit={handleSubmit}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": {
                            gridColumn: isNonMobile ? undefined : "span 4"
                        },
                    }}
                >
                    {isRegister && (
                        <>
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
                                        setFieldValue("picturePath", acceptedFiles[0]);
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
                                            {!values.picturePath ? (
                                                <p>Adicionar uma foto</p>
                                            ): (
                                                <FlexBetween>
                                                    <Typography>
                                                        {values.picturePath.name}
                                                    </Typography>
                                                    <EditOutlinedIcon/>
                                                </FlexBetween>
                                            )}
                                        </Box>
                                    )}
                                </Dropzone>
                            </Box>
                        </>
                    )}

                    <TextField
                        label="Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        sx={{gridColumn: "span 4"}}
                    />
                    <TextField
                        label="Senha"
                        type="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        name="password"
                        error={Boolean(touched.password) && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        sx={{gridColumn: "span 4"}}
                    />
                    {userNotFoundMsg && (
                        <Typography>
                            Usuário não encontrado!
                        </Typography>
                    )}
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
                        {isLogin ? "LOGIN" : "REGISTRE-SE"}
                    </Button>
                    <Typography
                        onClick={() => {
                            setPageType(isLogin ? "register" : "login");
                            resetForm();
                        }}
                        sx={{
                            textDecoration: "underline",
                            color: palette.primary.main,
                            "&:hover": {
                                cursor: "pointer",
                                color: "#00aac8",
                            },
                        }}
                    >
                        {isLogin ? "Não tem uma conta ? Registre-se aqui" : "Faça o Login aqui"}
                    </Typography>
                </Box>
            </form>
        )}
    </Formik>
)};

export default Form;