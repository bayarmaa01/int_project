pipeline {
    agent any

    tools {
        nodejs 'Node20' // Ensure this Node.js version is configured in Jenkins tools
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/bayarmaa01/int_project.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('todo-app/backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t todo-app ./todo-app'
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    docker.withRegistry('', 'dockerhub-creds') {
                        bat 'docker tag todo-app bayarmaa/todo-app'
                        bat 'docker push bayarmaa/todo-app'
                    }
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                bat 'docker run -d -p 8080:3000 todo-app'
            }
        }
    }

    post {
        failure {
            echo '❌ Build failed. Check logs for details.'
        }
        success {
            echo '✅ Build and deployment successful!'
        }
    }
}
