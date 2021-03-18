node {    
    image = "agrisin/node-app"
    latest = "latest"

    stage('checkout') {
        checkout scm
    }

    stage('build image') {
        app = docker.build(image)
    }
  
    stage('push image') {
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            app.push(latest)
        }
    }
}