
pipeline {
    agent any

    options {
        timestamps()
    }

    environment {
        IMAGE_NAME = 'aws-3-tier-app'
        CONTAINER_NAME = 'aws-3-tier-container'
    }

    stages {
        stage('1. Checkout') {
            steps {
                checkout scm
            }
        }

        stage('2. Install Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('3. Automated Tests') {
            steps {
                dir('frontend') {
                    sh 'npm test --if-present'
                }
            }
        }

        stage('4. Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$BUILD_NUMBER -t $IMAGE_NAME:latest ./frontend'
            }
        }

        stage('5. Deploy Application') {
    steps {
        sh '''
            set -eu

            test -f "$WORKSPACE/frontend/.env" || {
                echo "ERROR: frontend/.env is missing from the Jenkins workspace."
                exit 1
            }

            docker rm -f "$CONTAINER_NAME" || true

            docker run -d \
              --name "$CONTAINER_NAME" \
              --restart unless-stopped \
              --env-file "$WORKSPACE/frontend/.env" \
              -p 127.0.0.1:3000:3000 \
              "$IMAGE_NAME:latest"
        '''
          }
        }
    }
}
