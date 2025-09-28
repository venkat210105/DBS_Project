# Stage 1: Build the application
FROM maven:3.9.8-eclipse-temurin-21 AS build
WORKDIR /app

# Copy pom.xml and download dependencies first (better caching)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app

# Copy only the built jar from previous stage
COPY --from=build /app/target/feedback-backend-*.jar app.jar

# Expose backend port
EXPOSE 8085

# Run the jar
ENTRYPOINT ["java", "-jar", "app.jar"]
