// pipeline {
// agent any
// stages {

//     stage('Checkout Code') {
//         steps {
//             git branch: 'main',
//             url: 'https://github.com/samanhabib2224-cmd/secure-notes-devsecops.git'
//         }
//     }

//     stage('Build Docker Images') {
//         steps {
//             bat 'wsl.exe -e bash -ic "cd /mnt/c/Users/saman/OneDrive/Desktop/secure-notes-devsecops && docker compose build"'
//         }
//     }

//     stage('Stop Old Containers') {
//         steps {
//             bat 'wsl.exe -e bash -ic "cd /mnt/c/Users/saman/OneDrive/Desktop/secure-notes-devsecops && docker compose down || true"'
//         }
//     }

//     stage('Run Containers') {
//         steps {
//             bat 'wsl.exe -e bash -ic "cd /mnt/c/Users/saman/OneDrive/Desktop/secure-notes-devsecops && docker compose up -d"'
//         }
//     }

//     stage('Verify Running Containers') {
//         steps {
//             bat 'wsl.exe -e bash -ic "docker ps"'
//         }
//     }
// }

// post {

//     success {
//         emailext (
//             to: 'sammanhabib22004@gmail.com',
//             subject: "SUCCESS: Secure Notes Pipeline Passed",
//             body: "Docker containers built and deployed successfully 🚀"
//         )
//     }

//     failure {
//         emailext (
//             to: 'sammanhabib22004@gmail.com',
//             subject: "FAILED: Secure Notes Pipeline Failed",
//             body: "Check Jenkins console output ❌"
//         )
//     }
// }

// }

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
                wsl.exe -e bash -ic "
                cd /mnt/c/Users/saman/OneDrive/Desktop/secure-notes-devsecops &&
                docker build -t $DOCKER_USER/secure-notes-backend:latest ./backend &&
                docker build -t $DOCKER_USER/secure-notes-frontend:latest ./frontend
                "
                '''
            }
        }

        stage('Push Docker Images') {
            steps {
                bat '''
                wsl.exe -e bash -ic "
                docker push $DOCKER_USER/secure-notes-backend:latest &&
                docker push $DOCKER_USER/secure-notes-frontend:latest
                "
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat '''
                wsl.exe -e bash -ic "
                cd /mnt/c/Users/saman/OneDrive/Desktop/secure-notes-devsecops/kubernetes &&
                kubectl apply -f postgres-deployment.yaml &&
                kubectl apply -f postgres-service.yaml &&
                kubectl apply -f backend-deployment.yaml &&
                kubectl apply -f backend-service.yaml &&
                kubectl apply -f frontend-deployment.yaml &&
                kubectl apply -f frontend-service.yaml
                "
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                bat 'wsl.exe -e bash -ic "kubectl get pods && kubectl get svc"'
            }
        }
    }

    post {
        success {
            emailext (
                to: 'sammanhabib22004@gmail.com',
                subject: "SUCCESS: Secure Notes Deployed",
                body: "Kubernetes deployment successful 🚀"
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