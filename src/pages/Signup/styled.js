import LinearProgress, {
  linearProgressClasses
} from "@mui/material/LinearProgress";
import styled from "styled-components";
import themeConfig from "theme";

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: themeConfig.palette.bg
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: themeConfig.palette.primary.main
  }
}));
