# Prueba técnica: QA Automation con Playwright

Automatización del flujo de compra de [Practice Software Testing](https://practicesoftwaretesting.com) utilizando Playwright Test y TypeScript.

## Requisitos

- Node.js 20.12 o superior.
- npm.

## Instalación

Instalar las dependencias del proyecto:

npm ci

Instalar los navegadores necesarios:

npx playwright install chromium firefox

### Variables de entorno

El proyecto utiliza el archivo `.env.example` como configuración predeterminada. Opcionalmente, se puede copiar a `.env` y modificar los valores.

| Variable             | Descripción                                        |
| -------------------- | -------------------------------------------------- |
| `URL_BASE`           | Dirección base del sitio web.                      |
| `URL_API`            | Dirección de la API utilizada para crear usuarios. |
| `CORREO_CANDIDATO`   | Correo electrónico del candidato.                  |
| `CONTRASENA_USUARIO` | Contraseña de los usuarios generados.              |

## Ejecución

Ejecutar todas las pruebas:

npx playwright test

Abrir el reporte HTML:

npm run report

## Comportamientos inesperados del sitio

Durante la automatización se identificaron los siguientes comportamientos:

1. **Autocompletado del código postal:** el valor `0000` no funciona con todos los países. Se configuró Bolivia (`BO`) porque permite ejecutar el autocompletado de los campos de dirección.
2. **Datos del autocompletado:** la información devuelta por el sitio puede no corresponder al país seleccionado. Por ejemplo, al utilizar Bolivia, el campo State puede mostrar South Dakota.
3. **Idioma de la interfaz:** los textos dependen del idioma del navegador. Se configuró `en-US` para mantener estables las validaciones.
4. **Nombre del producto:** algunos productos incluyen la insignia `ECO` dentro del encabezado, por lo que la validación del nombre contempla texto adicional.
5. **Expiración de sesión:** el token JWT tiene una duración aproximada de cinco minutos. Por ello, el `storageState` debe utilizarse dentro de ese periodo.
6. **Firefox en modo visible:** en el entorno local de Windows se identificó un problema de bloqueo durante algunos clics de envío. Las pruebas funcionan correctamente en modo headless. Para la ejecución en modo visible se utiliza Chromium.

## Supuestos y limitaciones

- **Correo del candidato:** como el sitio no permite registrar dos veces la misma dirección, se utiliza un alias con `+id` para generar direcciones únicas asociadas al correo del candidato.
- **Precios de productos:** los precios esperados se encuentran definidos en el archivo JSON de datos de prueba. Si el sitio modifica sus productos o precios, será necesario actualizar esos valores.
- **Usuarios de prueba:** cada ejecución genera nuevos usuarios en el sitio. Actualmente no se realiza una limpieza automática de estos registros.

## Mejoras futuras

- Obtener los precios esperados directamente desde la API para evitar depender de valores almacenados.
- Optimizar la preparación de sesión mediante autenticación por API.
- Incorporar pruebas en WebKit y diferentes tamaños de pantalla.
- Ampliar las validaciones negativas del registro de usuarios.
- Incorporar ESLint para mejorar el control de calidad del código.
