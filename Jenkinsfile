pipeline {
  agent any
  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub')
  }
  stages {
    stage("SonarQube Analysis") {
        steps {
          sh 'npm install --save-dev sonar-scanner -g'
          withSonarQubeEnv(installationName: 'sonarqube') {
            sh 'sonar-scanner'
          }
        }
      }

    stage("Quality Gate") {
        steps {
          timeout(time: 1, unit: 'HOURS') {
            waitForQualityGate abortPipeline: true
        }
      }
    }

    stage("Tests") {
      steps {
        sh 'npm i - save-dev jest @types/jest  jest-preset-angular'
        sh 'npm run test -- /src/app/common/book.spec.ts'
      }
    }

    stage('Push') {
      steps {
        sh 'docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}'
        sh 'docker build . -t frontend-prueba'
        sh "docker tag frontend-prueba  ${DOCKERHUB_CREDENTIALS_USR}/frontend-prueba:${env.BUILD_NUMBER}"
        sh "docker push  ${DOCKERHUB_CREDENTIALS_USR}/frontend-prueba:${env.BUILD_NUMBER}"
      }
    }

    stage('Deploy') {
      steps {
        sh "ssh rigibon@192.168.0.211 'kubectl delete deployment frontend-deployment'"
        sh "ssh rigibon@192.168.0.211 'kubectl delete service frontend-deployment'"
        sh "ssh rigibon@192.168.0.211 'kubectl create deployment frontend-deployment --image= ${DOCKERHUB_CREDENTIALS_USR}/frontend-prueba:${env.BUILD_NUMBER}'"
        sh 'ssh rigibon@192.168.0.211 "kubectl expose deployment frontend-deployment --port=4200 --target-port=4200 --type=LoadBalancer"'
      }
    }
  }
}
