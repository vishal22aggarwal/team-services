pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "your-docker-repo/your-angular-app:${env.BUILD_NUMBER}"
        KUBE_CONTEXT = "your-kube-context"
        KUBE_NAMESPACE = "your-kube-namespace"
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the source code from Git
                git url: 'https://github.com/your-repo/your-angular-project.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install npm dependencies
                sh 'npm install'
            }
        }

        stage('Build Angular App') {
            steps {
                // Build the Angular application
                sh 'npm run build --prod'
            }
        }

        stage('Docker Build & Push') {
            steps {
                // Build the Docker image
                sh """
                docker build -t ${DOCKER_IMAGE} .
                docker push ${DOCKER_IMAGE}
                """
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Use kubectl to deploy the application
                    sh """
                    kubectl --context=${KUBE_CONTEXT} --namespace=${KUBE_NAMESPACE} apply -f k8s/deployment.yaml
                    kubectl --context=${KUBE_CONTEXT} --namespace=${KUBE_NAMESPACE} set image deployment/your-angular-deployment your-angular-container=${DOCKER_IMAGE}
                    """
                }
            }
        }
    }

    post {
        always {
            // Clean up workspace
            cleanWs()
        }

        success {
            // Notify success (e.g., send a message to Slack)
            echo 'Deployment succeeded!'
        }

        failure {
            // Notify failure (e.g., send a message to Slack)
            echo 'Deployment failed!'
        }
    }
}
