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
                    // Usamos "${WORKSPACE}" para asegurar que Docker encuentre la carpeta correcta
                    sh """
                    docker run --rm \
                      -v "${WORKSPACE}":/app \
                      -w /app \
                      mcr.microsoft.com/playwright:v1.58.2-jammy \
                      /bin/sh -c "npm install && npx playwright test test-2.spec.ts"
                    """
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
