export interface Theme {
    colors: {
        white: string;
        text2: string;
        hover: string;
        black: string;
        containerLine: string;
        inactiveBg: string;
        outline: string;
        dark: string;
        light: string;
        main: string;
        error: string;
    };
}

export const light: Theme = {
    colors: {
        white: "#FFFFFF",
        text2: "#566370",
        hover: "#E7E7E8",
        black: "#000000",
        containerLine: "#F0F3F4",
        inactiveBg: "#F0F3F4",
        outline: "#D1D9DD",
        dark: "#428AD2",
        light: "#A5CCF4",
        main: "#4A99E9",
        error: "#E03C39",
    },
};

export const dark: Theme = {
    colors: {
        white: "#1A1A1A",            // Fondo principal oscuro
        text2: "#C9D1D9",            // Texto secundario claro
        hover: "#2A2A2A",            // Fondo de hover más claro
        black: "#FFFFFF",            // Texto o detalles en blanco
        containerLine: "#2D2D2D",    // Bordes suaves
        inactiveBg: "#1F1F1F",       // Fondo de elementos inactivos
        outline: "#3A3A3A",          // Líneas y bordes
        dark: "#428AD2",             // Conservamos el azul oscuro como acento
        light: "#6BA6E5",            // Azul más suave para resaltar
        main: "#4A99E9",             // Color principal se mantiene
        error: "#E03C39",            // Error también se mantiene para consistencia
    },
};
