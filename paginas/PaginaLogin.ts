import { Page, Locator } from '@playwright/test'

export class PaginaLogin {
    readonly page: Page
    readonly correo: Locator
    readonly contrasena: Locator
    readonly botonLogin: Locator
    readonly mensajeError: Locator

    constructor(page: Page) {
        this.page = page
        this.correo = page.getByTestId('email')
        this.contrasena = page.getByTestId('password')
        this.botonLogin = page.getByTestId('login-submit')
        this.mensajeError = page.getByTestId('login-error')
    }

    async abrir() {
        await this.page.goto('/auth/login')
    }

    async iniciarSesion(correo: string, contrasena: string) {
        await this.correo.fill(correo)
        await this.contrasena.fill(contrasena)
        await this.botonLogin.click()
    }
}
