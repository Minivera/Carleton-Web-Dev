docker build --tag teavm-todo-build:1.0 .

rm -rf $(pwd)/../../dist/java-todo

docker run -it -v "$(pwd)/../../dist/java-todo:/built" -v "$(pwd):/code" teavm-todo-build:1.0
