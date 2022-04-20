interface IImportanceLevel {
    primary: string,
    secondary: string,
}

interface IState {
    success?: string,
    warning?: string,
    danger?: string,
    disabled: string,
}

interface IContrast {
    dark: string,
    light: string,
}

type SizeOptions = 'xs' | 'sm' | 'md' | 'lg' | 'xl' 

interface ISize {
    xs: number,
    sm: number,
    md: number,
    lg: number,
    xl: number,
}

interface IWeight {
    light: number,
    regular: number,
    bold: number,
}

interface ITypography {
    fonts: IImportanceLevel,
    weights: IWeight
    sizes: ISize,
}

interface IColor extends IContrast, IImportanceLevel, IState { }

interface IShape {
    borderRadius: ISize
}

interface ISpacing extends ISize { }

interface CustomTheme {
    typography: ITypography,
    colors: IColor,
    backgrounds: IImportanceLevel & IState,
    shapes: IShape,
    spacings: ISpacing
}

export default CustomTheme
export type { ISize, SizeOptions, IWeight, ITypography, IColor, IShape, IState }