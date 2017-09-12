pipeline {
    agent { docker 'node:6.9.4' }
    stages {
        stage('Test') {
            sh 'node --version'
            sh 'npm install'
            sh 'npm test'
        }
    }
}