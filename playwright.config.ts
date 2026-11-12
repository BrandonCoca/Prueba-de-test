import { defineConfig, devices } from '@playwright/test'
import fs from 'fs'
import path from 'path'

/* Si no hay .env se usa .env.example, asi `npx playwright test` corre sin pasos extra */
const archivoEnv = path.join(__dirname, '.env')
process.loadEnvFile(fs.existsSync(archivoEnv) ? archivoEnv : path.join(__dirname, '.env.example'))

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './pruebas',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter HTML (sin abrirse solo) + list para ver el avance en consola */
    reporter: [['html', { open: 'never' }], ['list']],
    use: {
        baseURL: process.env.URL_BASE,
        /* El sitio expone data-test en casi todos los elementos */
        testIdAttribute: 'data-test',
        /* El sitio traduce la UI segun el idioma del navegador, se fija en ingles para que los textos esperados no cambien */
        locale: 'en-US',
        /* Evidencias solo cuando un test falla */
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },

    projects: [
        /* Crea un usuario por API, inicia sesion y guarda el storageState */
        {
            name: 'setup',
            testMatch: /.*\.setup\.ts/,
        },
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
            dependencies: ['setup'],
        },
        /* Ojo: en Windows con --headed los click() de Firefox se cuelgan (problema del driver), usar headless */
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
            dependencies: ['setup'],
        },
    ],
})
