pipeline {
    agent any

    tools {
        nodejs 'my-nodejs'  // Replace with your Node.js name
    }

    stages {
        
        stage('Checkout') {
            steps {
                sh "ls -l"
                echo 'Checking out source code'
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Building the application'
                sh 'cd team-services-ui'
                sh 'ls -l'
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                echo 'Building the application'
                sh 'npm run build --prod'
                sh "ls -l"
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the application'
            }
        }
        stage('Post-Build') {
            steps {
                echo 'Post-build actions'
            }
        }
    }

    post {
        always {
            echo 'This will always run after all stages, regardless of success or failure'
        }
        success {
            echo 'This will run only if the pipeline succeeds'
        }
        failure {
            echo 'This will run only if the pipeline fails'
        }
        unstable {
            echo 'This will run only if the pipeline is marked as unstable'
        }
    }
}
