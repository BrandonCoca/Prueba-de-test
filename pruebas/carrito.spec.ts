import { test, expect, ESTADO_SESION } from '../fixtures'
import datosPrueba from '../datos/datos-prueba.json'

// Sesion guardada por auth.setup.ts, no se repite el login
test.use({ storageState: ESTADO_SESION })

const formatearPrecio = (precio: number) => `$${precio.toFixed(2)}`

test('add products to the cart', async ({ page, encabezado, paginaInicio, paginaProducto, paginaCarrito }) => {
    const productos = datosPrueba.productos
    let cantidadEsperadaCarrito = 0

    for (const producto of productos) {
        await test.step(`search ${producto.nombre}`, async () => {
            await paginaInicio.abrir()
            // La sesion viene del storageState, no hubo login en este test
            await expect(encabezado.menuCuenta).toBeVisible()
            await paginaInicio.buscar(producto.nombre)
            await expect(paginaInicio.nombresProductos).toHaveText([producto.nombre])
        })

        await test.step(`check ${producto.nombre} detail`, async () => {
            await paginaInicio.abrirProducto(producto.nombre)
            await expect(page).toHaveURL(/\/product\//)
            // El h1 incluye la insignia ECO en productos eco-friendly, por eso toContainText
            await expect(paginaProducto.nombre).toContainText(producto.nombre)
            await expect(paginaProducto.precioUnitario).toHaveText(producto.precio.toFixed(2))
        })

        await test.step(`add ${producto.cantidad} x ${producto.nombre} to the cart`, async () => {
            await paginaProducto.agregarAlCarrito(producto.cantidad)
            cantidadEsperadaCarrito += producto.cantidad
            await expect(encabezado.cantidadCarrito).toHaveText(String(cantidadEsperadaCarrito))
        })
    }

    await test.step('cart has the right products, quantities and prices', async () => {
        await encabezado.abrirCarrito()
        await expect(page).toHaveURL('/checkout')
        await expect(paginaCarrito.filas).toHaveCount(productos.length)

        for (const producto of productos) {
            const fila = paginaCarrito.fila(producto.nombre)
            await expect(fila.nombre).toHaveText(producto.nombre)
            await expect(fila.cantidad).toHaveValue(String(producto.cantidad))
            await expect(fila.precio).toHaveText(formatearPrecio(producto.precio))
            await expect(fila.subtotal).toHaveText(formatearPrecio(producto.precio*producto.cantidad))
        }

        const totalEsperado = productos.reduce((suma, producto) => suma + producto.precio*producto.cantidad, 0)
        await expect(paginaCarrito.total).toHaveText(formatearPrecio(totalEsperado))
    })
})
