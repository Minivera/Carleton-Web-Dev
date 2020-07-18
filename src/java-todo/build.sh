rm -rf ./src
cp /code .

mvn package

cp ./target/java-todo-example-1.0.war /built/app.war
cd /built
jar xvf app.war