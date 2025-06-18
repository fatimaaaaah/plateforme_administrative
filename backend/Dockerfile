# Étape 1 : build de l'application avec Gradle
FROM gradle:7.6-jdk17 AS builder

WORKDIR /app

COPY . .

RUN gradle build --no-daemon -x test

# Étape 2 : image légère pour exécution
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
