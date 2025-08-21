pipeline {
    agent any

    tools {
        nodejs 'node18'  
    }

    environment {
        QASE_API_TOKEN = credentials('QASE_API_TOKEN') 
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                sh 'npx cypress run'
            }
        }

       stage('Publish Reports') {
            steps {
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/screenshots/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: true
            junit 'cypress/results/*.xml'
        }
    }
}
