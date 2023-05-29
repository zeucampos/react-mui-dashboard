const themeConfig = {
  palette: {
    primary: {
      main: "#92c045",
      dark: "#668630",
    },
    secondary: {
      main: "#668630",
    },
    dark: {
      main: "#3F3F3F",
    },
    light: "white",
    bg: "#d9dde1",
    error: {
      main: "#d9273f",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
              color: "#fff",
              fontFamily: "Montserrat",
              fontWeight: "bold",
            }),
        }),
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
              backgroundColor: "#202020",
              color: "#fff",
            }),
        }),
      },
    },
    MuiTypography: {
      defaultProps: {
        fontFamily: "Montserrat",
        fontWeight: 400,
      },
    },
  },
};

export default themeConfig;
