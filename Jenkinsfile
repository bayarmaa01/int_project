pipeline {
    agent any

    tools {
        nodejs 'Node18' // Make sure this matches the name in Jenkins Global Tool Configuration
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/bayarmaa01/int_project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
                dir('frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t todo-app .'
            }
        }

        stage('Push to DockerHub') {
            steps {
                withDockerRegistry([credentialsId: 'dockerhub-creds', url: '']) {
                    bat 'docker tag todo-app bayarmaa/todo-app'
                    bat 'docker push bayarmaa/todo-app'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                // Stop and remove any existing container to prevent port conflict
                bat 'docker rm -f todo-app || exit 0'
                bat 'docker run -d --name todo-app -p 8080:3000 todo-app'
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished.'
        }
        failure {
            echo '❌ Build failed. Check logs for details.'
        }
        success {
            echo '✅ Build and deployment successful!'
        }
    }
}
