import { test, expect, Browser, Page } from "@playwright/test";

(async () => {

    let browser: Browser;
    let page: Page;

    test.describe('Navegación en Pagina', () => {

        const secciones = [
            { nombre: 'Cursos', url: '/cursos', tituloEsperado: 'Cursos' },
            { nombre: 'Acceder', url: '/login', tituloEsperado: 'Acceder a Free Range Testers' },
            { nombre: 'Recursos', url: '/recursos', tituloEsperado: 'Recursos' },
            { nombre: 'Blog', url: '/blog', tituloEsperado: 'Free Range Testers' },
        ];

        for (const seccion of secciones) {

            test(`Los links redirigen de forma correcta seccion "${seccion.nombre}"`, async ({ page }) => {
            
                await test.step('Estanto en la pagina principal', async () => {
                    page.goto('https://www.freerangetesters.com');
                    await expect(page).toHaveTitle('Free Range Testers');
                })

                await test.step(`Cuando hago click en "${seccion.nombre}"`, async () => {
                    page.locator('#page_header').getByRole('link', {name: seccion.nombre, exact: true}).click();
                    await page.waitForURL(`**${seccion.url}`);
                })

                await test.step(`Soy redirigido a la pagina de titulo "${seccion.tituloEsperado}"`, async () => {
                    await expect(page).toHaveTitle(seccion.tituloEsperado);
                })    
            })
        }
    })

})();

