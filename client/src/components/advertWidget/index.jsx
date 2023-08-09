import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../flexbetween/index.jsx";
import WidgetWrapper from "../widgetwrapper/index.jsx";

const AdvertWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Patrocionio
                </Typography>
                <Typography color={medium}>Criar anúncio</Typography>
            </FlexBetween>
            <img
                width="100%"
                height="auto"
                alt="anuncio"
                src={`${import.meta.env.VITE_BASE_URL}/assets/info4.jpeg`}
                style={{borderRadius: "0.75rem", margin: "0.75rem 0"}}
            />
            <FlexBetween>
                <Typography color={main}>AlgumCosmético</Typography>
                <Typography color={medium}>AlgumAnúncio.com</Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
                Algum anúncio de alguma empresa pra caber aqui pra eu poder testar
                e ver se fica bonita assim.
            </Typography>
        </WidgetWrapper>
    )
}

export default AdvertWidget;