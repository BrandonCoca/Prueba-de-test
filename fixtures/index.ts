import { test as base, expect } from '@playwright/test'
import { PaginaRegistro } from '../paginas/PaginaRegistro'
import { PaginaLogin } from '../paginas/PaginaLogin'
import { Encabezado } from '../paginas/Encabezado'
import { PaginaInicio } from '../paginas/PaginaInicio'
import { PaginaProducto } from '../paginas/PaginaProducto'
import { PaginaCarrito } from '../paginas/PaginaCarrito'
import { generarUsuario, Usuario } from '../utilidades/generador-usuario'

export const ESTADO_SESION = 'playwright/.auth/usuario.json'

type Fixtures = {
    paginaRegistro: PaginaRegistro
    paginaLogin: PaginaLogin
    encabezado: Encabezado
    paginaInicio: PaginaInicio
    paginaProducto: PaginaProducto
    paginaCarrito: PaginaCarrito
    usuarioNuevo: Usuario
}

export const test = base.extend<Fixtures>({
    paginaRegistro: async ({ page }, use) => { await use(new PaginaRegistro(page)) },
    paginaLogin: async ({ page }, use) => { await use(new PaginaLogin(page)) },
    encabezado: async ({ page }, use) => { await use(new Encabezado(page)) },
    paginaInicio: async ({ page }, use) => { await use(new PaginaInicio(page)) },
    paginaProducto: async ({ page }, use) => { await use(new PaginaProducto(page)) },
    paginaCarrito: async ({ page }, use) => { await use(new PaginaCarrito(page)) },

    // Precondicion: usuario creado por API, cada test que lo pide recibe uno propio
    usuarioNuevo: async ({ request }, use) => {
        const usuario = generarUsuario()
        const { pais, codigoPostal, numeroCasa } = usuario.direccion
        const urlApi = process.env.URL_API

        // Mismo lookup que usa el formulario para completar Calle, Ciudad y Estado
        const respuestaLookup = await request.get(`${urlApi}/postcode-lookup`, {
            params: { country: pais, postcode: codigoPostal, house_number: numeroCasa },
        })
        await expect(respuestaLookup).toBeOK()
        const { street, city, state } = await respuestaLookup.json()

        // La API espera los nombres de campo en ingles
        const respuestaRegistro = await request.post(`${urlApi}/users/register`, {
            data: {
                first_name: usuario.nombre,
                last_name: usuario.apellido,
                dob: usuario.fechaNacimiento,
                phone: usuario.telefono,
                email: usuario.correo,
                password: usuario.contrasena,
                address: { street, house_number: numeroCasa, city, state, country: pais, postal_code: codigoPostal },
            },
        })
        await expect(respuestaRegistro).toBeOK()

        await use(usuario)
    },
})

export { expect }
