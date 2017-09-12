node('node') {
    try {
       stage('Test'){

         env.NODE_ENV = "test"

         print "Environment will be : ${env.NODE_ENV}"

         sh 'node -v'
         sh 'npm install'
         sh 'npm test'

       }
    }
    catch (err) {
        throw err
    }

}