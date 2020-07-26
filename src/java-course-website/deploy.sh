docker build --tag teavm-course-website-build:1.0 .

rm -rf "$(pwd)/../../dist/java-course-website"

docker run -it -v "$(pwd)/../../dist/java-course-website:/built" -v "$(pwd):/code" teavm-course-website-build:1.0
