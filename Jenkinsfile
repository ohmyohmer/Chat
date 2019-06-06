
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
                        sh 'echo "sonar.host.url=https://sonarqube.ibm-kapamilya-devops.com" > sonar-project.properties'
                        sh 'echo "sonar.login=$SONARQUBE_APIKEY" >> sonar-project.properties'
                        sh 'echo "sonar.projectKey=Group:2" >> sonar-project.properties'
                        sh 'echo "sonar.projectVersion=$BUILD_NUMBER" >> sonar-project.properties'
                        sh 'echo "sonar.sourceEncoding=UTF-8" >> sonar-project.properties'
                        sh 'echo "sonar.sources=src" >> sonar-project.properties'
                        sh 'echo "sonar.exclusions=**/node_modules/**,**/*.spec.ts" >> sonar-project.properties'
                        sh 'echo "sonar.tests=src" >> sonar-project.properties'
                        sh 'echo "sonar.test.inclusions=**/*.spec.ts" >> sonar-project.properties'
                        sh 'echo "sonar.typescript.lcov.reportPaths=coverage/lcov.info" >> sonar-project.properties'
                        sh '/usr/local/bin/sonar-scanner'
                    }
                }
            }
        }
        stage("Quality Gate") {
            steps {
                timeout(time: 1, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                } 
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