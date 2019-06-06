
pipeline{
    agent any
    stages {
        stage('Source') {
            steps {
                git branch: 'develop', url: 'https://github.com/ohmyohmer/cashew'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test - Run the linter (tslint)') {
            steps {
                sh 'npm run lint'
            }
        }
        stage('Sonarqube Analysis') {
            steps {
                withCredentials([string(credentialsId: 'SONARQUBE_APIKEY', variable: 'SONARQUBE_APIKEY')]) {
                    withSonarQubeEnv('SonarqubeServer_GROUP2') {
                        sh '/usr/local/bin/sonar-scanner -Dsonar.login=$SONARQUBE_APIKEY -Dsonar.projectVersion=$BUILD_NUMBER'
                    }
                }
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                } 
        }
        stage('Build') {
            steps {
                sh 'npm run build:prod:en'
            }
        }
        stage('Upload') {
            steps {
                sh 'tar -cj dist/* > artifact.$BUILD_NUMBER.tar.bz2'
                sh 'cp artifact.$BUILD_NUMBER.tar.bz2 /var/lib/jenkins/files/artifact.$BUILD_NUMBER.tar.bz2'
            }
        }
    }
}