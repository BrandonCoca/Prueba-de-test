import { test, expect } from '../fixtures'
import { generarUsuario } from '../utilidades/generador-usuario'

test('register a new user', async ({ page, paginaRegistro }) => {
    const usuario = generarUsuario()

    await test.step('open the register page', async () => {
        await paginaRegistro.abrir()
        await expect(paginaRegistro.formulario).toBeVisible()
    })

    await test.step('fill personal data', async () => {
        await paginaRegistro.llenarDatosPersonales(usuario)
    })

    await test.step('street, city and state are filled from the postal code', async () => {
        await paginaRegistro.llenarDireccion(usuario.direccion)
        await expect(paginaRegistro.calle).not.toBeEmpty()
        await expect(paginaRegistro.ciudad).not.toBeEmpty()
        await expect(paginaRegistro.estado).not.toBeEmpty()
    })

    await test.step('fill contact data and password', async () => {
        await paginaRegistro.llenarContactoYCredenciales(usuario)
    })

    await test.step('submit and redirect to login', async () => {
        await paginaRegistro.registrar()
        await expect(page).toHaveURL('/auth/login')
    })
})
