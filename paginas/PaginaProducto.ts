import { Page, Locator } from '@playwright/test'

export class PaginaProducto {
    readonly page: Page
    readonly nombre: Locator
    readonly precioUnitario: Locator
    readonly cantidad: Locator
    readonly botonAgregarCarrito: Locator

    constructor(page: Page) {
        this.page = page
        this.nombre = page.getByTestId('product-name')
        this.precioUnitario = page.getByTestId('unit-price')
        this.cantidad = page.getByTestId('quantity')
        this.botonAgregarCarrito = page.getByTestId('add-to-cart')
    }

    async agregarAlCarrito(cantidad: number) {
        await this.cantidad.fill(String(cantidad))
        await this.botonAgregarCarrito.click()
    }
}
