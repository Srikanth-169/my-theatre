pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "srikanth169/my-theatre:latest"
        APP_NAME = "my-theatre"
        SERVER = "13.234.116.159"
        SERVER_USER = "srikanth"
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Srikanth-169/my-theatre.git', branch: 'main'
            }
        }

        stage('Build WAR') {
            steps {
                sh 'mvn clean package -DskipTests'
            }
        }

        stage('Docker Build & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        docker build -t ${DOCKER_IMAGE} .
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push ${DOCKER_IMAGE}
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['ssh-key-id']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER} '
                            docker pull ${DOCKER_IMAGE}
                            docker stop ${APP_NAME} || true
                            docker rm ${APP_NAME} || true
                            docker run -d --name ${APP_NAME} -p 9090:8080 ${DOCKER_IMAGE}
                        '
                    """
                }
            }
        }
    }
}
