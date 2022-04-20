import CustomTheme from '@type/CustomTheme';
import 'styled-components';

declare module 'styled-components' {

    export interface DefaultTheme extends CustomTheme {}
}