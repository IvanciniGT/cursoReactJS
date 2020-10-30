// REDUCER
const estadoInicial={
    filtro: "*"
};

const miReducer = (state = estadoInicial, action) => {
    switch (action.type) {
        case 'FILTRO':
            return { ...state, filtro: action.texto };
        default:
            return state;
    }
}

export default miReducer