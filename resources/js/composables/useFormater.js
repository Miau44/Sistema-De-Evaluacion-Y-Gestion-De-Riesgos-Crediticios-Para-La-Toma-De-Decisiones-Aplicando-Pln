export const useFormater = () => {
    const getFormatoMoneda = (valor) => {
        return new Intl.NumberFormat("es-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(valor);
    };

    return {
        getFormatoMoneda,
    };
};
