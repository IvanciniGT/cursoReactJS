// REDUCER
const estadoInicial={
    Texto: "",
    Numero: 10
};

const miReducer = (state = estadoInicial, action) => {
    switch (action.type) {
        case 'INCREMENTO':
            return { ...state, Numero: state.Numero+1 };
        case 'ACTUALIZACION_TEXTO':
            return { ...state, Texto: action.texto };
        default:
            return state;
    }
}

export default miReducer