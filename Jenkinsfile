pipeline {
    agent any

    tools {
        nodejs 'Node20'
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/bayarmaa01/int_project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install --prefix todo-app/backend'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t todo-app ./todo-app'
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
                bat 'docker run -d -p 8080:3000 todo-app'
            }
        }
    }

    post {
        failure {
            echo '❌ Build failed. Check logs for details.'
        }
    }
}
