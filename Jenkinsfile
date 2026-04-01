pipeline {
    agent any

    stages {
        stage('Descargar Pruebas') {
            steps {
                // Jenkins limpia la carpeta y descarga tu código de GitHub
                cleanWs()
                checkout scm
            }
        }

        stage('Ejecutar Pruebas en Playwright') {
            steps {
                script {
                    // 1. Levantamos el contenedor oficial de Playwright
                    // 2. Le montamos tu código descargado dentro de la carpeta /app del contenedor
                    // 3. Ejecutamos las pruebas
                    sh '''
                    docker run --rm \
                      -v $(pwd):/app \
                      -w /app \
                      mcr.microsoft.com/playwright:v1.58.2-jammy \
                      /bin/sh -c "npm install && npx playwright test test-2.spec.ts"
                    '''
                }
            }
        }
    }

    post {
        always {
            echo '¡El pipeline ha terminado de ejecutarse!'
        }
    }
}
