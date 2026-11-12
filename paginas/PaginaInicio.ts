import { Page, Locator } from '@playwright/test'

export class PaginaInicio {
    readonly page: Page
    readonly buscador: Locator
    readonly botonBuscar: Locator
    readonly nombresProductos: Locator

    constructor(page: Page) {
        this.page = page
        this.buscador = page.getByTestId('search-query')
        this.botonBuscar = page.getByTestId('search-submit')
        this.nombresProductos = page.getByTestId('product-name')
    }

    async abrir() {
        await this.page.goto('/')
    }

    async buscar(nombreProducto: string) {
        await this.buscador.fill(nombreProducto)
        await this.botonBuscar.click()
    }

    async abrirProducto(nombreProducto: string) {
        await this.nombresProductos.filter({ hasText: nombreProducto }).click()
    }
}
