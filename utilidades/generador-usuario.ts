import datosPrueba from '../datos/datos-prueba.json'

const elementoAleatorio = <T>(lista: T[]) => lista[Math.floor(Math.random()*lista.length)]
const numeroAleatorio = (min: number, max: number) => Math.floor(Math.random()*(max - min + 1)) + min

// Usuario nuevo en cada llamada, el correo es el del candidato con un alias +id para que no se repita
export function generarUsuario() {
    const [parteLocal, dominio] = process.env.CORREO_CANDIDATO!.split('@')
    const idUnico = `${Date.now()}${numeroAleatorio(100, 999)}`
    const mes = String(numeroAleatorio(1, 12)).padStart(2, '0')

    return {
        nombre: elementoAleatorio(datosPrueba.usuario.nombres),
        apellido: elementoAleatorio(datosPrueba.usuario.apellidos),
        fechaNacimiento: `${numeroAleatorio(1970, 2000)}-${mes}-15`,
        telefono: `7${numeroAleatorio(1000000, 9999999)}`,
        correo: `${parteLocal}+${idUnico}@${dominio}`,
        contrasena: process.env.CONTRASENA_USUARIO!,
        direccion: { ...datosPrueba.usuario.direccion },
    }
}

export type Usuario = ReturnType<typeof generarUsuario>
