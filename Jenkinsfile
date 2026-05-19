pipeline {
agent any
stages {

    stage('Checkout Code') {
        steps {
            git branch: 'main',
            url: 'https://github.com/samanhabib2224-cmd/secure-notes-devsecops.git'
        }
    }

    stage('Build Docker Images') {
        steps {
            bat 'wsl.exe -e bash -ic "cd /mnt/c/Users/saman/OneDrive/Desktop/secure-notes-devsecops && docker compose build"'
        }
    }

    stage('Stop Old Containers') {
        steps {
            bat 'wsl.exe -e bash -ic "cd /mnt/c/Users/saman/OneDrive/Desktop/secure-notes-devsecops && docker compose down || true"'
        }
    }

    stage('Run Containers') {
        steps {
            bat 'wsl.exe -e bash -ic "cd /mnt/c/Users/saman/OneDrive/Desktop/secure-notes-devsecops && docker compose up -d"'
        }
    }

    stage('Verify Running Containers') {
        steps {
            bat 'wsl.exe -e bash -ic "docker ps"'
        }
    }
}

post {

    success {
        emailext (
            to: 'sammanhabib22004@gmail.com',
            subject: "SUCCESS: Secure Notes Pipeline Passed",
            body: "Docker containers built and deployed successfully 🚀"
        )
    }

    failure {
        emailext (
            to: 'sammanhabib22004@gmail.com',
            subject: "FAILED: Secure Notes Pipeline Failed",
            body: "Check Jenkins console output ❌"
        )
    }
}

}
