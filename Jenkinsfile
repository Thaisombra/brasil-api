pipeline {
    agent any

    tools {
        nodejs 'node20'
    }

    environment {
        QASE_API_TOKEN = credentials('QASE_API_TOKEN')
    }

    stages {
        stage('Install System Dependencies') {
            steps {
                sh '''
                    apt-get update && apt-get install -y \
                    xvfb \
                    libgtk2.0-0 \
                    libgtk-3-0 \
                    libgbm-dev \
                    libnotify-dev \
                    libgconf-2-4 \
                    libnss3 \
                    libxss1 \
                    libasound2 \
                    libxtst6 \
                    libatk-bridge2.0-0 \
                    libatk1.0-0 \
                    libcups2 \
                    libxcomposite1 \
                    libxdamage1 \
                    libxrandr2 \
                    libgbm1 \
                    libpango-1.0-0 \
                    libcairo2 \
                    libgdk-pixbuf2.0-0
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npm install -D cypress-qase-reporter @shelex/cypress-allure-plugin allure-commandline'
            }
        }

        stage('Run Cypress API Tests') {
            steps {
                sh 'QASE_MODE=testops npx cypress run --headless'
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh 'npx allure generate allure-results --clean -o allure-report'
            }
        }

        stage('Publish Allure Report') {
            steps {
                // Publica o relatório no Jenkins
                publishHTML([allowMissing: true,
                             alwaysLinkToLastBuild: true,
                             keepAll: true,
                             reportDir: 'allure-report',
                             reportFiles: 'index.html',
                             reportName: 'Allure Report'])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/screenshots/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
        }
    }
}
