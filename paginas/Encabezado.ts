import { Page, Locator } from '@playwright/test'

// Barra de navegacion comun a todas las paginas
export class Encabezado {
    readonly page: Page
    readonly menuCuenta: Locator
    readonly enlaceIniciarSesion: Locator
    readonly carrito: Locator
    readonly cantidadCarrito: Locator

    constructor(page: Page) {
        this.page = page
        this.menuCuenta = page.getByTestId('nav-menu')
        this.enlaceIniciarSesion = page.getByTestId('nav-sign-in')
        this.carrito = page.getByTestId('nav-cart')
        this.cantidadCarrito = page.getByTestId('cart-quantity')
    }

    async abrirCarrito() {
        await this.carrito.click()
    }
}
