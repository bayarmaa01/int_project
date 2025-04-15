pipeline {
    agent any

    tools {
        nodejs 'Node18' // Must match exactly the name you set in Jenkins tools config
    }

    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/bayarmaa01/int_project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t todo-app .'
            }
        }

        stage('Push to DockerHub') {
            steps {
                withDockerRegistry([credentialsId: 'dockerhub-creds', url: '']) {
                    sh 'docker tag todo-app bayarmaa/todo-app'
                    sh 'docker push bayarmaa/todo-app'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker run -d -p 8080:3000 todo-app'
            }
        }
    }
}
