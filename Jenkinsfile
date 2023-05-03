/* Requires the Docker Pipeline plugin */
pipeline {
    agent { docker { image 'node:16.19.0-alpine' } }
    stages {
        stage('build') {
            steps {
                sh 'node --version'
            }
        }
    }
}