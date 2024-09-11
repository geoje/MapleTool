FROM openjdk:21-jdk-slim

WORKDIR /opt
COPY build/libs/*.jar /opt/app.jar
CMD ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
