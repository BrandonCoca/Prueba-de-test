import { Page, Locator } from '@playwright/test'

export class PaginaCarrito {
    readonly page: Page
    readonly filas: Locator
    readonly total: Locator

    constructor(page: Page) {
        this.page = page
        this.filas = page.locator('tbody tr')
        this.total = page.getByTestId('cart-total')
    }

    // Fila del carrito filtrada por el nombre del producto, para leer sus columnas
    fila(nombreProducto: string) {
        const fila = this.filas.filter({ has: this.page.getByTestId('product-title').filter({ hasText: nombreProducto }) })
        return {
            nombre: fila.getByTestId('product-title'),
            cantidad: fila.getByTestId('product-quantity'),
            precio: fila.getByTestId('product-price'),
            subtotal: fila.getByTestId('line-price'),
        }
    }
}
