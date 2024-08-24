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
                sh '''
                    cd team-services-ui
                    ls -l
                    npm install --legacy-peer-deps
                '''
            }
        }
        stage('Build') {
            steps {
                echo 'Building the application'
                sh '''
                    cd team-services-ui
                    npm run build --prod
                   ''' 
                
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests'
            }
        }
        stage('FE Image') {
            steps {
                echo 'Creating image'
                sh '''
                    cd team-services-ui
                    docker build -t vishkumar/team-service-ui:1.0.0 .
                    docker login -u vishkumar -p Work@2211
                    docker push vishkumar/team-service-ui:1.0.0
                   '''
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                // Use withCredentials to set KUBECONFIG to the actual file path
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh '''
                        cd team-services-ui/deploy
                        kubectl apply -f deployment.yaml
                    '''
                }
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
