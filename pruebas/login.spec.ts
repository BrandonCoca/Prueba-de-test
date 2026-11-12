import { test, expect } from '../fixtures'
import datosPrueba from '../datos/datos-prueba.json'

test.describe('login', () => {
    test.beforeEach(async ({ paginaLogin }) => {
        await paginaLogin.abrir()
    })

    test('login with the new user', async ({ page, usuarioNuevo, paginaLogin, encabezado }) => {
        const nombreEsperado = `${usuarioNuevo.nombre} ${usuarioNuevo.apellido}`

        await test.step('login with the user created by API', async () => {
            await paginaLogin.iniciarSesion(usuarioNuevo.correo, usuarioNuevo.contrasena)
            await expect(page).toHaveURL('/account')
        })

        await test.step('user name is shown in the account menu', async () => {
            await expect(encabezado.menuCuenta).toHaveText(nombreEsperado)
        })
    })

    test('login with invalid credentials shows an error', async ({ page, paginaLogin, encabezado }) => {
        const { correo, contrasena } = datosPrueba.credencialesInvalidas

        await test.step('login with wrong credentials', async () => {
            await paginaLogin.iniciarSesion(correo, contrasena)
        })

        await test.step('error is shown and the user stays logged out', async () => {
            await expect(paginaLogin.mensajeError).toHaveText(datosPrueba.mensajes.loginInvalido)
            await expect(page).toHaveURL('/auth/login')
            await expect(encabezado.menuCuenta).toBeHidden()
            await expect(encabezado.enlaceIniciarSesion).toBeVisible()
        })
    })
})
