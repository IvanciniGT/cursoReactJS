
export const incremento = () => {
    return {
      type: 'INCREMENTO'
    }
}
export const actualizacionTexto = (nuevoTexto) => {
    return {
      type: 'ACTUALIZACION_TEXTO',
      texto: nuevoTexto
    }
}
