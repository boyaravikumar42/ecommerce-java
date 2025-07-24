#  Stage 1: Build the Spring Boot app with Maven + JDK 22
FROM maven:3.9-eclipse-temurin-22 AS build
WORKDIR /app

# Copy only the backend subfolder
COPY ecommerce-backend/pom.xml ecommerce-backend/pom.xml
COPY ecommerce-backend/src ecommerce-backend/src

# Set working directory for build
WORKDIR /app/ecommerce-backend

# Build the project and skip tests
RUN mvn clean package -DskipTests

#  Stage 2: Run the built JAR with JDK 22
FROM eclipse-temurin:22-jdk
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/ecommerce-backend/target/*.jar app.jar

# Expose Spring Boot default port
EXPOSE 8080

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]



