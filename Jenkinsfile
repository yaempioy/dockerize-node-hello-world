node {
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
        sh 'echo ${env.VARIABLE_NAME.RANCHER_URL}'
        sh 'echo ${env.VARIABLE_NAME.RANCHER_ACCESS_KEY}'
        sh 'echo ${env.VARIABLE_NAME.RANCHER_SECRET_KEY}'
    }
}


