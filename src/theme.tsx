import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

declare module '@mui/material/styles' {
    interface Palette {
        logout: Palette['primary'],
        white: Palette['primary']
    }
    interface PaletteOptions {
        logout?: PaletteOptions['primary']
        white?: PaletteOptions['primary']
    }
}

declare module '@mui/material/IconButton' {
    interface IconButtonPropsColorOverrides {
        logout: true;
        white: true;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        logout: true;
        white: true;
    }
}

declare module '@mui/material/Textfield' {
    interface TextfieldPropsColorOverrides {
        logout: true;
        white: true;
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#2b2b3d',
            dark: '#16161f',
            contrastText: '#fff'
        },
        secondary: {
            main: '#1A1A28',
            contrastText: '#fff'
        },
        logout: {
            main: red[900],
            light: '#fff',
            dark: "#7F000F",
            contrastText: "#fff"
        },
        white: {
            main: "#fff"
        }
    },

    components: {
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    "& .MuiInputBase-root": {
                        
                        
                        
                        color: "white", // Input text color
                        
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white", // Outline color
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: "white", // Label color
                        // height: '30px',
                        
                        

                    },
                    "& .MuiSvgIcon-root": {
                        color: "white", // Icon color (e.g., dropdown arrow)
                        fontSize: '1rem',
                        verticalAlign: 'middle', // Center icon vertically
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        height: '100%', // Ensures the border stays aligned
                    },
                    "& .MuiFormLabel-root": {
                        color: 'white'
                    },
                },
            },
        },
    }
})

export default theme