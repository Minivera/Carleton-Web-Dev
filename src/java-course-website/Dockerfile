FROM maven:3.6.3-jdk-8

COPY . ./build
WORKDIR ./build

RUN mvn clean install -q
RUN chmod +x ./build.sh

ENTRYPOINT "./build.sh"
