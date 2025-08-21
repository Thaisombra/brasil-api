pipeline {
    agent any

    tools {
        nodejs 'node20'
    }

    environment {
        QASE_API_TOKEN = credentials('QASE_API_TOKEN')
        DISPLAY = ':99'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                sh 'Xvfb :99 -screen 0 1920x1080x24 &'
                sh 'npx cypress run --record=false'
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
