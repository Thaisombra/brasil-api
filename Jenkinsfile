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
                sh 'apt-get update && apt-get install -y xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Cypress API Tests') {
            steps {
                sh 'npx cypress run --headed'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/screenshots/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: true
        }
    }
}