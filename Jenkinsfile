node {
    try {
        notifyBuild('STARTED')

        stage('Initialize') {
            echo 'Initializing...'
            def node = tool name: 'Node-7.4.0', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
            env.PATH = "${node}/bin:${env.PATH}"
        }
        stage('Checkout') {
            echo 'Getting source code...'
            checkout scm
        }
        stage('Build Docker Image') {
            echo 'Building dependencies...'
            sh 'npm i'
        }
        stage('Test') {
            echo 'Testing...'
            sh 'npm test'
        }
        stage('Build Image') {
            /* This builds the actual image; synonymous to
            * docker build on the command line */
            echo 'Build Docker Image...'
            app = docker.build('vedadev/hello-world')
        }
        stage('Test image') {
            /* Ideally, we would run a test framework against our image.
            * For this example, we're using a Volkswagen-type approach ;-) */

            app.inside {
                sh 'echo "Tests passed"'
            }
        }
        stage('Push image') {
            /* Finally, we'll push the image with two tags:
            * First, the incremental build number from Jenkins
            * Second, the 'latest' tag.
            * Pushing multiple tags is cheap, as all the layers are reused. */
            docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                app.push("build-${env.BUILD_ID}")
                app.push("latest")
            }
        }
        stage('Rancher Compose') {
            sh 'rancher-compose'        
            sh 'rancher-compose --url ${RANCHER_URL} --access-key ${RANCHER_ACCESS_KEY} --secret-key ${RANCHER_SECRET_KEY} -f docker-compose.yml -r rancher-compose.development.yml -p veda-network up hello-world --force-upgrade -c -d -p'                    
        }
    } catch (e) {
        currentBuild.result = "FAILED"
        throw e
    } finally {
        // Success or failure, always send notifications
        notifyBuild(currentBuild.result)
    }
}
def notifyBuild(String buildStatus = 'STARTED') {
  // build status of null means successful
  buildStatus =  buildStatus ?: 'SUCCESSFUL'

  // Default values
  def chennelName = '#deployment'
  def colorName = 'RED'
  def colorCode = '#FF0000'
  def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
  def summary = "${subject} (${env.BUILD_URL})"

  // Override default values based on build status
  if (buildStatus == 'STARTED') {
    color = 'YELLOW'
    colorCode = '#FFFF00'
  } else if (buildStatus == 'SUCCESSFUL') {
    color = 'GREEN'
    colorCode = '#00FF00'
  } else {
    color = 'RED'
    colorCode = '#FF0000'
  }

  // Send notifications
  slackSend (channel: chennelName, color: colorCode, message: summary)
  
}


