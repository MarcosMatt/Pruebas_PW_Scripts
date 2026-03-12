import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true, // Esto es para configurar que los tests dentro de un mismo archivo se ejecuten en paralelo, lo que puede mejorar el rendimiento de la ejecución de los tests al aprovechar mejor los recursos disponibles. Al establecer "fullyParallel" en true, Playwright ejecutará los tests dentro de cada archivo de manera concurrente, lo que puede reducir el tiempo total de ejecución de los tests, especialmente si hay muchos tests en un mismo archivo. Sin embargo, es importante tener en cuenta que esto puede afectar la estabilidad de los tests si hay dependencias entre ellos o si comparten recursos, por lo que se recomienda utilizar esta opción con precaución y asegurarse de que los tests sean independientes entre sí para evitar problemas de concurrencia
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI, // Esto es para evitar que se ejecute un test marcado como "only" en un entorno de integración continua (CI), lo que podría causar que solo ese test se ejecute y se omitan los demás tests, lo que no es deseable en un entorno de CI donde se espera que se ejecuten todos los tests. Al establecer "forbidOnly" en true cuando se detecta que el entorno es CI, Playwright lanzará un error si encuentra un test marcado como "only", lo que ayuda a garantizar que todos los tests se ejecuten correctamente en el entorno de CI
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0, // Esto es para configurar el número de reintentos que se realizarán en caso de que un test falle, pero solo en un entorno de integración continua (CI). Al establecer "retries" en 2 cuando se detecta que el entorno es CI, Playwright intentará ejecutar nuevamente un test hasta 2 veces si falla, lo que puede ayudar a mitigar problemas intermitentes o inestables en el entorno de CI. En entornos locales, donde se espera que los tests sean más estables, no se realizarán reintentos al establecer "retries" en 0
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined, // Esto es para configurar el número de trabajadores que se utilizarán para ejecutar los tests, pero solo en un entorno de integración continua (CI). Al establecer "workers" en 1 cuando se detecta que el entorno es CI, Playwright ejecutará los tests de manera secuencial en lugar de en paralelo, lo que puede ser útil para evitar problemas de concurrencia o inestabilidad en el entorno de CI. En entornos locales, donde se espera que los tests sean más estables, se utilizará el número predeterminado de trabajadores (undefined), lo que permitirá la ejecución paralela de los tests para mejorar el rendimiento
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://thefreerangetester.github.io/sandbox-automation-testing/', // Esto es para configurar una URL base que se utilizará en las acciones de navegación dentro de los tests, como "page.goto()". Al establecer "baseURL" en una URL específica, como "https://thefreerangetester.github.io/sandbox-automation-testing/", se puede utilizar rutas relativas en lugar de URLs completas en las acciones de navegación dentro de los tests. Por ejemplo, en lugar de escribir "page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')" en cada test, se puede simplemente escribir "page.goto('/')", lo que hará que Playwright navegue a la URL base configurada. Esto puede mejorar la legibilidad y la mantenibilidad de los tests al evitar la repetición de la URL completa en cada acción de navegación

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry', // Esto es para configurar la recopilación de trazas (traces) en caso de que un test falle y se realicen reintentos. Al establecer "trace" en "on-first-retry", Playwright recopilará una traza detallada del test solo en el primer intento de reintento después de que un test falle. Esto puede ser útil para diagnosticar problemas intermitentes o inestables en los tests, ya que proporciona información detallada sobre lo que sucedió durante la ejecución del test que falló, lo que puede ayudar a identificar la causa raíz del problema. Al configurar esto, se evita la recopilación de trazas innecesarias en casos donde los tests son estables y no requieren reintentos, lo que puede mejorar el rendimiento general de la ejecución de los tests
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }, // ejemplo Iphone, iPad, Pixel, etc. Esto es para configurar un proyecto específico para el navegador Chromium utilizando las opciones predefinidas de dispositivos proporcionadas por Playwright. Al establecer "use" en "...devices['Desktop Chrome']", se está indicando que se utilicen las configuraciones específicas para el navegador Chrome en un entorno de escritorio, lo que puede incluir características como la resolución de pantalla, el agente de usuario y otras configuraciones específicas para ese navegador. Esto permite ejecutar los tests en un entorno que simula el comportamiento del navegador Chrome en un escritorio, lo que puede ser útil para validar la compatibilidad y el rendimiento de la aplicación web en ese navegador específico
      // testMatch: 'test-1.spec.ts', // Esto es para configurar que solo se ejecuten los tests que coincidan con un patrón específico, como "test-1.spec.ts", en un proyecto de Playwright. Al establecer "testMatch" en un patrón específico dentro de la configuración del proyecto, Playwright solo ejecutará los tests que coincidan con ese patrón, lo que puede ser útil para ejecutar un subconjunto específico de tests en lugar de todos los tests disponibles. En este caso, solo se ejecutarán los tests que estén definidos en el archivo "test-1.spec.ts" dentro del proyecto configurado para el navegador Chromium
      // retries: 2, // Esto es para configurar el número de reintentos que se realizarán en caso de que un test falle, pero solo para un proyecto específico en Playwright. Al establecer "retries" en 2 dentro de la configuración del proyecto, Playwright intentará ejecutar nuevamente un test hasta 2 veces si falla, pero solo para los tests que se ejecuten dentro de ese proyecto específico. Esto puede ser útil para mitigar problemas intermitentes o inestables que puedan ocurrir en ese proyecto en particular, sin afectar el comportamiento de reintentos en otros proyectos configurados en Playwright
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'API Testing',
      testMatch: 'APITesting/**/*', // Esto es para configurar un proyecto específico para pruebas de API en Playwright, donde solo se ejecutarán los tests que coincidan con el patrón "APITesting/**/*.spec.ts". Al establecer "testMatch" en este patrón dentro de la configuración del proyecto, Playwright solo ejecutará los tests que estén definidos en archivos con la extensión ".spec.ts" dentro de la carpeta "APITesting" y sus subcarpetas. Esto permite organizar y ejecutar específicamente los tests relacionados con la API, lo que puede ser útil para mantener una estructura clara y separada para las pruebas de API dentro del proyecto de Playwright
      use: {
        baseURL: 'https://api.github.com', // Esto es para configurar una URL base específica para las pruebas de API en Playwright, lo que permite utilizar rutas relativas en lugar de URLs completas en las acciones de navegación dentro de los tests de API. Al establecer "baseURL" en "https://api.github.com", se puede utilizar rutas relativas en las acciones de navegación dentro de los tests de API, como "page.goto('/users/octocat')", lo que hará que Playwright navegue a "https://api.github.com/users/octocat". Esto puede mejorar la legibilidad y la mantenibilidad de los tests de API al evitar la repetición de la URL completa en cada acción de navegación, y también facilita la configuración de diferentes entornos o endpoints para las pruebas de API sin tener que modificar cada test individualmente
        extraHTTPHeaders: {
          'Accept': 'application/vnd.github.v3+json', // Esto es para configurar encabezados HTTP adicionales específicos para las pruebas de API en Playwright, lo que permite incluir información adicional en las solicitudes HTTP realizadas durante los tests de API. Al establecer "extraHTTPHeaders" con un encabezado de autorización, como "Authorization: application/vnd.github.v3+json", se está indicando que todas las solicitudes HTTP realizadas durante los tests de API incluirán este encabezado específico, lo que puede ser necesario para autenticar o autorizar las solicitudes a la API de GitHub. Esto facilita la configuración de los encabezados necesarios para interactuar con la API y garantiza que las pruebas de API se ejecuten correctamente con la autenticación adecuada
          'Authorization': `token ${process.env.API_TOKEN}`, // Esto es para configurar un encabezado de autorización específico para las pruebas de API en Playwright, utilizando un token de autenticación almacenado en una variable de entorno. Al establecer "extraHTTPHeaders" con un encabezado de autorización que incluye un token, como "Authorization: token ${process.env.GITHUB_TOKEN}", se está indicando que todas las solicitudes HTTP realizadas durante los tests de API incluirán este encabezado de autorización con el token proporcionado. Esto es útil para autenticar las solicitudes a la API de GitHub utilizando un token de acceso personal (PAT) almacenado en una variable de entorno, lo que permite mantener la seguridad y la confidencialidad del token mientras se ejecutan las pruebas de API
        }, // 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
      }
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
