pipeline {
    agent any

    tools {
        nodejs 'node20'
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

        stage('Run Cypress API Tests') {
            steps {
                sh 'npx cypress run --browser none --record=false'
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
