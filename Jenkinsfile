pipeline {
    agent any

    environment {
        DOCKER_USER = "sammanhabib2224"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/samanhabib2224-cmd/secure-notes-devsecops.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                bat '''
wsl docker build -t sammanhabib2224/secure-notes-backend:latest /mnt/c/Users/saman/OneDrive/Desktop/secure-notes-devsecops/backend
wsl docker build -t sammanhabib2224/secure-notes-frontend:latest /mnt/c/Users/saman/OneDrive/Desktop/secure-notes-devsecops/frontend
'''
            }
        }

        stage('Push Docker Images') {
            steps {
                bat '''
wsl docker push sammanhabib2224/secure-notes-backend:latest
wsl docker push sammanhabib2224/secure-notes-frontend:latest
'''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat '''
wsl kubectl apply -f /mnt/c/Users/saman/OneDrive/Desktop/secure-notes-devsecops/kubernetes/postgres-deployment.yaml
wsl kubectl apply -f /mnt/c/Users/saman/OneDrive/Desktop/secure-notes-devsecops/kubernetes/postgres-service.yaml
wsl kubectl apply -f /mnt/c/Users/saman/OneDrive/Desktop/secure-notes-devsecops/kubernetes/backend-deployment.yaml
wsl kubectl apply -f /mnt/c/Users/saman/OneDrive/Desktop/secure-notes-devsecops/kubernetes/backend-service.yaml
wsl kubectl apply -f /mnt/c/Users/saman/OneDrive/Desktop/secure-notes-devsecops/kubernetes/frontend-deployment.yaml
wsl kubectl apply -f /mnt/c/Users/saman/OneDrive/Desktop/secure-notes-devsecops/kubernetes/frontend-service.yaml
'''
            }
        }

        stage('Verify Deployment') {
            steps {
                bat '''
wsl kubectl get pods
wsl kubectl get svc
'''
            }
        }
    }

    post {
        success {
            emailext (
                to: 'sammanhabib22004@gmail.com',
                subject: "SUCCESS: Secure Notes Deployed",
                body: "Pipeline successful 🚀 Kubernetes updated"
            )
        }

        failure {
            emailext (
                to: 'sammanhabib22004@gmail.com',
                subject: "FAILED: Pipeline Failed",
                body: "Check Jenkins logs ❌"
            )
        }
    }
}