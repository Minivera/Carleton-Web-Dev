rm -rf ./src
cp -a /code/. .

mvn package

cp ./target/java-todo-example-1.0.war /built/app.war
cd /built
jar xvf app.war
