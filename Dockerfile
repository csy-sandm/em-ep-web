FROM nginx:stable
MAINTAINER zhyl 15189830819@163.com

COPY target/ugi_regulations-1.0-SNAPSHOT.jar /regulations.jar

ENTRYPOINT ["java", "-jar", "/regulations.jar"]
