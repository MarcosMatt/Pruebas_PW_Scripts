import { test, expect } from "@playwright/test";

(async () => {
test.describe('Navegación a SandBox', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('');
    })
    
    // test.skip es para saltar un test, por ejemplo, si el test está en desarrollo o si hay un bug que impide que el test pase y queremos evitar que falle el suite de tests completo
    // test.only es para ejecutar únicamente ese test específico, lo que es útil durante el desarrollo o la depuración de un test en particular, ya que permite enfocarse solo en ese test sin ejecutar los demás
    // Despues del nombre del test, se puede agregar un tag ya sea entre corchetes o un arroba, ejemplo @smoke, para luego poder ejecutar solo los tests que tengan ese tag utilizando el comando "npx playwright test --grep @smoke"
    // test.skip(browserName === 'chromium', 'Este test no se ejecuta en Chromium'); // Ejemplo de uso de test.skip para saltar un test específico en el navegador Chromium, con una razón personalizada para explicar por qué se está saltando ese test en ese navegador
    // Validar el funcionamiento de un botón dinámico que muestra un elemento oculto después de hacer clic en él
    test('El Botón responde de forma correcta', async ({ page }) => {

        // test.info().anotation().push() es para agregar anotaciones personalizadas a los reportes de los tests, lo que puede ser útil para proporcionar información adicional sobre el test, como pasos específicos, resultados esperados o cualquier otra información relevante que pueda ayudar a entender mejor el contexto del test y su resultado. En este caso, se utiliza para agregar anotaciones dentro de cada paso del test para describir lo que se está validando en cada uno de ellos, lo que mejora la claridad y la documentación del test en los reportes generados por Playwright
        // ejemplo: test.info().annotation().push({ type: 'step', description: 'Ir a la pagina Principal' }); // Agrega una anotación personalizada al reporte del test con el tipo "step" y una descripción que indica que se está validando la navegación a la página principal. Esta anotación aparecerá en los reportes generados por Playwright, proporcionando información adicional sobre el paso específico que se está ejecutando en el test
        // test.fixme(); es para marcar un test como "fixme", lo que indica que el test tiene un problema conocido o un bug que debe ser solucionado. Esto es útil para identificar rápidamente los tests que necesitan atención y evitar que se ejecuten hasta que se resuelva el problema. Al marcar un test como "fixme", Playwright lo reportará de manera destacada en los resultados de los tests, lo que facilita su seguimiento y resolución
          
        await test.step('Ir a la pagina Principal', async () => {
            await expect(page).toHaveTitle('Automation Sandbox');
        })

        await test.step('Darle click al botón dinamico', async () => {
            const botonDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID dinámico y mostrar el elemento oculto' }); // Localizar el botón dinámico utilizando su rol y nombre exacto
            await botonDinamico.click({ force: true }); // Hacer clic en el botón utilizando la opción "force: true" para forzar el clic incluso si el botón no es interactivo en ese momento, lo que puede ser necesario debido a la naturaleza dinámica del botón
            await expect(page.getByText('OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻.')).toBeVisible(); // Verificar que el texto oculto se vuelva visible después de hacer clic en el botón, lo que indica que el botón respondió correctamente a la acción del usuario
        })

        // test.info().attach() es para adjuntar información adicional a los reportes de los tests, como capturas de pantalla, videos o cualquier otro tipo de archivo que pueda ser relevante para entender mejor el contexto del test y su resultado. En este caso, se utiliza para adjuntar una captura de pantalla después de hacer clic en el botón dinámico, lo que puede ser útil para visualizar el estado de la página en ese momento específico del test y proporcionar evidencia visual del comportamiento del botón dinámico en los reportes generados por Playwright
            const screenshot = await page.screenshot(); // Tomar una captura de pantalla de la página después de hacer clic en el botón dinámico
            await test.info().attach('Evidencia del botón dinámico', { body: screenshot, contentType: 'image/png' }); // Adjuntar la captura de pantalla al reporte del test con un nombre descriptivo y el tipo de contenido adecuado para que se muestre correctamente en los reportes generados por Playwright
            
    })

    // Validar el funcionamiento de un campo de texto, llenándolo con una cadena y verificando que el valor se haya ingresado correctamente
    test('Llenar el campo de texto', async ({ page }) => {
        await test.step('Ingresar texto', async () => {

            const campoTexto = page.getByPlaceholder('Ingresá texto'); // Localizar el campo de texto utilizando su atributo placeholder, lo que permite identificarlo de manera única en la página

            await campoTexto.fill('Hola mundo'); // Llenar el campo de texto con la cadena "Hola mundo" utilizando el método fill, que simula la acción de un usuario escribiendo en el campo
            await expect(campoTexto, 'El campo de texto no se llenó correctamente').toHaveValue('Hola mundo'); // Verificar que el campo de texto tenga el valor "Hola mundo" después de llenarlo, lo que confirma que la acción de llenar el campo fue exitosa. Si el valor no coincide, se mostrará un mensaje de error personalizado indicando que el campo no se llenó correctamente
        })
        
    })

    // Validar el funcionamiento de un CheckBox
    test('Dar click a un CheckBox', async ({ page }) => {
        await test.step('Seleccionar una comida', async () => {
            await page.getByLabel('Pasta 🍝').check(); // Seleccionar el checkbox "Pasta 🍝" utilizando su etiqueta asociada, lo que simula la acción de un usuario marcando la casilla
            await expect(page.getByLabel('Pasta 🍝'), 'El check si estaba seleccionando').toBeChecked(); // Verificar que el checkbox "Pasta 🍝" esté seleccionado después de marcarlo, lo que confirma que la acción de seleccionar el checkbox fue exitosa. Si el checkbox no está seleccionado, se mostrará un mensaje de error personalizado indicando que el check no estaba seleccionando
        })
        
        await test.step('Deseleccionar una comida', async () => {
            await page.getByLabel('Pasta 🍝').uncheck(); 
            await expect(page.getByLabel('Pasta 🍝'), 'El check no estaba seleccionando').not.toBeChecked();
        })
        
    })
    
    // Validar el funcionamiento de un Radio Button
    test('Dar click a un Radio Button', async ({ page }) => {
        await page.getByLabel('No').check(); // Seleccionar el radio button "No"
        await expect(page.getByLabel('No'), 'El boton no se seleccionó').toBeChecked(); // Verificar que el radio button "No" esté seleccionado
    })

    // Validar el dropdown y seleccionar un item del mismo
    test('Seleccionar un item del dropdown', async ({ page }) => {
        await test.step('Seleccionar un deporte', async () => {
            
            const deportesItem = ['Fútbol', 'Basketball', 'Tennis']; // Array con los items que deberían estar en el dropdown

            const OpcionesDropdown = (await page.locator('select#formBasicSelect option').allTextContents()).map(texto => texto.trim()); // Obtener los textos de las opciones del dropdown y eliminar espacios en blanco

            expect(OpcionesDropdown).toEqual(expect.arrayContaining(deportesItem)); // Verificar que las opciones del dropdown contengan los items esperados
            
        })

        await test.step('Seleccionar el segundo Select', async () => {
            await page.getByRole('button', { name: 'Día de la semana'}).click(); // Hacer clic en el botón para abrir el dropdown de días de la semana
            await page.getByRole('link', { name: 'Miércoles' }).click(); // Hacer clic en la opción "Miércoles" del dropdown para seleccionarla
        })
        
    })

    // Validar la columna de una tabla estatica
    test('Validar la columna de la tabla estatica', async ({ page }) => {
        await test.step('Validar los elementos', async () => {

            const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe']; // Array con los nombres esperados en la columna de la tabla

            const tabla = page.locator('table').filter({ hasText: 'Messi'}); // Localizar la tabla que contiene el texto 'Messi' para asegurarnos de seleccionar la tabla correcta

            const valoresColumna = (await tabla.locator('tbody tr td:nth-child(2)').allTextContents()).map(v => v.trim()); // Obtener los textos de la segunda columna de la tabla, eliminar espacios en blanco y almacenarlos en un array

            expect(valoresColumna, 'La lista de jugadores no coincide con lo esperado').toEqual(nombresEsperados); // Verificar que los valores de la columna coincidan exactamente con los nombres esperados, en el mismo orden
        })
        
    })
    
    // Validar la columna de una tabla dinamica
    test('Validar la columna de una tabla dinamica', async ({ page }) => {
        await test.step('Validar la columna', async () => {
            
            const tabla = page.locator('h2:has-text("Tabla dinámica") ~ table'); // Localizar la tabla que está después del encabezado "Tabla dinámica" para asegurarnos de seleccionar la tabla correcta

            const todasCeldas = (await tabla.locator('td').allTextContents()).map(c => c.trim()); // Obtener los textos de todas las celdas de la tabla, eliminar espacios en blanco y almacenarlos en un array

            expect(todasCeldas.length, 'Las celdas no tienen el tamaño esperado (5x5)').toBe(25); // Verificar que la cantidad total de celdas sea 25, lo que corresponde a una tabla de 5 filas por 5 columnas

            const todosCumplen = todasCeldas.filter(codigo => !/^[A-Z]\d$/.test(codigo)); // Filtrar los códigos que no cumplen con el formato de una letra mayúscula seguida de un número, utilizando una expresión regular. El resultado es un array con los códigos que no cumplen el formato esperado

            expect(todosCumplen, `Se encontraron códigos con formato invalido: ${todosCumplen.join(', ')} `).toEqual([]); // Verificar que no se encontraron códigos con formato inválido, es decir, que el array de códigos que no cumplen esté vacío
        })
        
    })

    test('Validar el funcionamiento de un pop-up', async ({ page }) => {

        await test.step('Click en el botón Pop-up', async () => {
            const popup = page.getByRole('button', { name: 'Mostrar popup' }); // Localizar el botón que abre el pop-up utilizando su rol y nombre exacto

            await popup.click(); // Hacer clic en el botón para abrir el pop-up
        })

        await test.step('Validar un elemento dentro del popup', async () => {

            const popupcerrar = page.getByRole('button', { name: 'Cerrar' }); // Localizar el botón "Cerrar" dentro del pop-up utilizando su rol y nombre exacto
            
            await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!'); // Verificar que el texto "¿Viste? ¡Apareció un Pop-up!" esté presente dentro del pop-up, lo que confirma que el pop-up se abrió correctamente y muestra el contenido esperado

            await popupcerrar.click(); // Hacer clic en el botón "Cerrar" para cerrar el pop-up después de validar su contenido
        })
        
        
    })
    
    
        
})

})();