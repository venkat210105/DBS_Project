# Dockerfile (docker/Dockerfile)

FROM openjdk:21-jdk-slim
WORKDIR /app
COPY ../DBS-Feedback-System/backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
