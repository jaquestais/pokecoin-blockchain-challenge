import { DefaultTheme } from 'styled-components'
import palette from './palette'

const customTheme: DefaultTheme = {
    typography: {
        fonts: {
            primary: "'Open Sans', sans-serif",
            secondary: "'Courier Prime', monospace",
        },
        weights: {
            light: 200,
            regular: 400,
            bold: 700,
        },
        sizes: {
            xs: 13,
            sm: 14,
            md: 16,
            lg: 25,
            xl: 30,
        },        
    },
    colors: {
        dark: palette.black,
        light: palette.white,
        primary: palette.lilas,
        secondary: palette.green,
        disabled: palette.gray,
        success: palette.green,
        warning: palette.orange,
        danger: palette.red,
    },
    backgrounds: {
        primary: palette.gradienteAngularColorful,
        secondary: palette.white,
        disabled: palette.whiteOpaque,
    },
    shapes: {
        borderRadius: {
            xs: 2,
            sm: 5,
            md: 10,
            lg: 20,
            xl: 30,
        },
    },
    spacings: {
        xs: 13,
        sm: 17,
        md: 35,
        lg: 40,
        xl: 50,
    }
}

export default customTheme