# Use Tomcat with Java 17 as base image
FROM tomcat:10.1.12-jdk17-temurin

# Remove default ROOT application
RUN rm -rf /usr/local/tomcat/webapps/ROOT

# Copy the WAR file built by Maven into Tomcat's webapps folder
COPY target/theatre.war /usr/local/tomcat/webapps/ROOT.war

# Expose port 8080 where Tomcat runs
EXPOSE 8080

# Start Tomcat server
CMD ["catalina.sh", "run"]

