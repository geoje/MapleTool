FROM openjdk:17.0.2

WORKDIR /app
COPY build/libs/maple-0.0.1-SNAPSHOT.jar /app/app.jar
CMD ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
