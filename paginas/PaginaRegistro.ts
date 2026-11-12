import { Page, Locator } from '@playwright/test'
import { Usuario } from '../utilidades/generador-usuario'

export class PaginaRegistro {
    readonly page: Page
    readonly formulario: Locator
    readonly nombre: Locator
    readonly apellido: Locator
    readonly fechaNacimiento: Locator
    readonly pais: Locator
    readonly codigoPostal: Locator
    readonly numeroCasa: Locator
    readonly calle: Locator
    readonly ciudad: Locator
    readonly estado: Locator
    readonly telefono: Locator
    readonly correo: Locator
    readonly contrasena: Locator
    readonly botonRegistrar: Locator

    constructor(page: Page) {
        this.page = page
        this.formulario = page.getByTestId('register-form')
        this.nombre = page.getByTestId('first-name')
        this.apellido = page.getByTestId('last-name')
        this.fechaNacimiento = page.getByTestId('dob')
        this.pais = page.getByTestId('country')
        this.codigoPostal = page.getByTestId('postal_code')
        this.numeroCasa = page.getByTestId('house_number')
        this.calle = page.getByTestId('street')
        this.ciudad = page.getByTestId('city')
        this.estado = page.getByTestId('state')
        this.telefono = page.getByTestId('phone')
        this.correo = page.getByTestId('email')
        this.contrasena = page.getByTestId('password')
        this.botonRegistrar = page.getByTestId('register-submit')
    }

    async abrir() {
        await this.page.goto('/auth/register')
    }

    async llenarDatosPersonales(usuario: Usuario) {
        await this.nombre.fill(usuario.nombre)
        await this.apellido.fill(usuario.apellido)
        await this.fechaNacimiento.fill(usuario.fechaNacimiento)
    }

    // Calle, Ciudad y Estado no se llenan aqui, los completa el lookup del codigo postal
    async llenarDireccion(direccion: Usuario['direccion']) {
        await this.pais.selectOption(direccion.pais)
        await this.codigoPostal.fill(direccion.codigoPostal)
        await this.numeroCasa.fill(direccion.numeroCasa)
    }

    async llenarContactoYCredenciales(usuario: Usuario) {
        await this.telefono.fill(usuario.telefono)
        await this.correo.fill(usuario.correo)
        await this.contrasena.fill(usuario.contrasena)
    }

    async registrar() {
        await this.botonRegistrar.click()
    }
}
