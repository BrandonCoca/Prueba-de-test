import { test as setup, expect, ESTADO_SESION } from '../fixtures'

// Se ejecuta una vez antes de los projects, los tests que necesitan sesion reutilizan este storageState
setup('authenticate a new user', async ({ page, usuarioNuevo, paginaLogin, encabezado }) => {
    await paginaLogin.abrir()
    await paginaLogin.iniciarSesion(usuarioNuevo.correo, usuarioNuevo.contrasena)
    await expect(encabezado.menuCuenta).toHaveText(`${usuarioNuevo.nombre} ${usuarioNuevo.apellido}`)
    await page.context().storageState({ path: ESTADO_SESION })
})
