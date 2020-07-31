# Exploring Web Assembly applications with TeaVM
In this third tutorial, we will be exploring a new technology and creating a similar application to the one we have
 been creating previously, but this time, using Java. At the end of this tutorial, you will have explored the basis
 of Web Assembly (WASM), explored TeaVM, and created a small application using these technologies.

this tutorial assumes you are very familiar with Java as a programming language and that you are able to use maven to
 build Java projects and manage dependencies. Having read the previous tutorials is not necessary to understand this
 one, but they will add some context into what we will be building today.

## Prerequisites
To be able to complete this tutorial, you will need an installation of the 1.8 version of the Java SDK. Make sure to
 have this version selected in your IDE or command line terminal as TeaVM might not behave properly with a different
  version.

You will also need [maven](https://maven.apache.org/install.html) installed on your machine. Make sure it is working
 by running the `mvn --version` command. This command should tell you it is using the 1.8 version and a version of
 maven higher than 3.6.0.

Building with maven can be very finicky due to this version requirement, so I recommend using repl.it with a fixed
 Java version. In fact, you can see this entire tutorial completed on [repl.it](https://repl.it/@Minivera/TeaVM-demo
 ), make sure to not use the "Run" button and instead call `mvn clean package && cp target/teavm-demo-1.0.war tomcat/webapps/ROOT.war && tomcat/bin/catalina.sh start` directly.

## Web Assembly and TeaVM
Before we start, let's roughly define what Web Assembly is. Web Assembly is a standardized language that browsers are
 able to execute alongside JavaScript. It differs from JS by being far more sandboxed and performant, it runs in a
 separate virtual machine that has less access to your resources than JavaScript. It's also short-lived, programs are
 meant to execute and then terminate, returning their output.

The Web Assembly language can either be written in a Lisp-like text format or a binary format. This binary format is
 what we are after. Having another language to execute programs in is fun and all, but what we really want to do is
 write Java, C++, C#, <insert your favorite language here> and have it executes in the browser. By making the compiler
 for that language able to compile to the Web Assembly binary format rather than the usual desktop binaries enables
 us to use virtually any language in the browser, as long as the compiler is updated. WASM started with only support
 for C++ and Rust, but it has since received a massive amount of support from languages creators, giving us access
 to a [massive amount of languages](https://github.com/appcypher/awesome-wasm-langs).

In our case, TeaVM is a special compiler that can read Java bytecode and compile it to either JavaScript or Web
 Assembly binary. It also provides a good amount of other libraries to help us build our browser applications, like a
 Web framework (Flavour), or a REST client (powered by `javax.ws.rs`).

## Preparing the project
Let's get started by creating a project with maven. By using the maven generate command, we can have all the base
 files from the TeaVM base project. We also want to use Flavour to build a Single Page web application, so let's tell
 maven to download that as well. Open your terminal and run this command in an empty folder where you want to run you
 Java project.

```bash
mvn archetype:generate \
  -DarchetypeGroupId=org.teavm.flavour \
  -DarchetypeArtifactId=teavm-flavour-application \
  -DarchetypeVersion=0.2.1
```

This will ask you a few questions. For the purposes of this tutorial, we assume you used `edu.teavm.demo` as the
 group id, `teavm-demo` as the artifact id and `1.0` as the version.

This will have generated a set of files which should look like this:
```
src:
| main:
  | java:
    | edu:
      | teavm:
        | demo:
          | Client.java
  | resources:
    | templates:
      | client.html
  | webapp:
    | WEB-INF:
      | web.xml
    | css:
      | app.css
    | index.html
pom.xml
```

Now that this is generated, let's open the `pom.xml` file. In the `dependencies` section, add the following two
 dependencies that we'll need later.
 
```xml
<dependencies>
  ... Other dependencies

  <dependency>
    <groupId>org.glassfish.jersey.core</groupId>
    <artifactId>jersey-client</artifactId>
    <version>2.31</version>
  </dependency>

  <dependency>
    <groupId>org.glassfish.jersey.media</groupId>
    <artifactId>jersey-media-json-jackson</artifactId>
    <version>2.31</version>
  </dependency>
</dependencies>
```

Try running the command to start the application in repl.it. If you are not using repl.it, package the application
 using `mvn clean package` and find the `.war` file under `target`. You will either have to extract the content of
 this archive and open the `index.html` file in a browser, or deploy that war to a server like tomcat or glassfish
 . Our repl.it uses tomcat, installed in the project folder.

### TeaVM file structure
For our need, there are two folders that are the most important for our project. The `src/main/java/edu/teavm/demo
` folder is your traditional Java application structure. It contains the main code for your application's packages
. The `Client.java` file is your main file, configured inside of the `pom.xml` in the teaVM goal. Let's look at it:

```java
package edu.teavm.demo;

import org.teavm.flavour.templates.BindTemplate;
import org.teavm.flavour.widgets.ApplicationTemplate;

@BindTemplate("templates/client.html")
public class Client extends ApplicationTemplate {
    private String userName = "";

    public static void main(String[] args) {
        Client client = new Client();
        client.bind("application-content");
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
```

This class exposes a main method, which will create an instance of the class and bind it to the `#application-content
` element in the web page (Which can be found in `src/webapp/index.html`). It also exposes a user name attribute with
 a getter and setter. The most important part is the `BindTemplate` annotation, it tells TeaVM that this class is
 linked to an HTML template file called `client.html` located at `src/main/resources/templates`. Let's look at this
 file.

```html
<div>
  <label>Please, enter your name</label>:
  <input type="text" html:value="userName" html:change="userName"/>
</div>

<div>
  Hello, <i><html:text value="userName"/></i>
</div>
```

Flavour provides a sort of templating engine for its views. By using their [special components](http://teavm.org/docs
/flavour/standard-components.html) - or even custom components, as we'll see later - we can inject data in our views
 and make our pages dynamic.

The first thing to notice here are the `html` attributes on the input. They link us back to the `userName` private
 attribute on the `Client` class. But wait, didn't we just say the attribute is private? How does that work? Flavour
 makes use of an [expression language](http://teavm.org/docs/flavour/expression-language.html) inspired by JSP or
 Spring, which is a simplified subset of Java. While still typed, it allows us to access getters and setters by their
 underlying attribute name. As long as the setter/getter is named `get/set<capitalized attribute name>` (like
 `getUserName` for our `userName` attribute), it can find it.

Similarly, if we want to inject text from an object in Java, we need to use a special tag. The `<html:text value
="userName"/>` is used for that purpose. This will be replaced by the content of the `userName` attribute when the
 view renders. It is important to note that all those special attributes - including the `attr` [attributes](http://teavm.org/docs/flavour/component-packages/attr.html) - from
 Flavour act on variables. This means that, if you want to pass a string, you have to use the single quotes
 `'` character. For example, if we wanted to have the value `"bob"` in the input rather than the value of `userName
 `, we'd have to write the attribute like this: `html:value="'bob'"`.

## Fetching data from an API
Like with our previous examples, we would like to be able to fetch some data from an [API](https://jsonplaceholder.typicode.com/), namely a user and some
 posts. TeaVM gives us access to and older version of jackson, a JSON processing library, which will be more than
 enough for our need. Jackson is partially embedded in the TeaVM classes and used almost everywhere. It is
 recommended to stick to their version.

Let's create our two models to store user and posts data. In the `src/main/java/edu/demo`, create a new folder called
 `models` and add two files there, `User.java` and `Post.java`. Copy the following content in `User.java`:

```java
package edu.teavm.demo.models;

import org.teavm.flavour.json.JsonPersistable;

@JsonPersistable
public class User {
  public int id;
  public String name;
  public String username;
  public String email;
}
```

Jackson is very strict with data types, so if your JSON exposes an integer type for example, do not try to put it
 inside of a String. Those errors can be very hard to debug, so make sure to use the right types when developing
 your applications.

Our model makes the shortcut of using public variables and only needing the `@JsonPersistable` from Flavour. The
 framework will be able to read this class and assign the JSON attributes on an object based on the attribute's names
 . However, this is not very OOP friendly, and we would likely want to use private variables, different names from
 the JSON attributes and getters/setters. Let's see that version by copying the following code in `Post.java`:

```java
package edu.teavm.demo.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.teavm.flavour.json.JsonPersistable;

@JsonPersistable
public class Post {
  private int id;
  private int userId;
  private String title;
  private String body;

  @JsonCreator
  public Post(
    @JsonProperty("id") int id,
    @JsonProperty("userId") int userId,
    @JsonProperty("title") String title,
    @JsonProperty("body") String body
  ) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.body = body;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public int getUserId() {
    return userId;
  }

  public void setUserId(int userId) {
    this.userId = userId;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getBody() {
    return body;
  }

  public void setBody(String body) {
    this.body = body;
  }
}
```

Similar story here. Note again that we specify the id and userId field to be integers, since they are integers in the
 JSON payload from jsonplaceholder. The big difference for this class is all the getters/setters, and the
 `JsonCreator` and `JsonProperty` annotations added ot the constructor and its parameters. Those are not mandatory
 , but they would allow us to change the names of the JSON fields associated to the class variables with ease.

Now that we have classes to map to the API results, let's write the service that will be tasked with fetching the
 JSON data from jsonplaceholder. Flavour requires that we use a class with annotations from the `javax.ws.rs` package
 . Unfortunately, those classes are locked behind the Java EE paywall and thus, we have to use an equivalent. The
 dependencies for Jersey we added earlier will do the trick. Jersey provides us the REST client that Flavour will use
 to fetch data for our pages, and we can access those directly using the `javax.ws.rs` package. Let's build that
 interface now. Create a file under `src/main/java/edu/teavm/demo` called `JsonPlaceholderService.java` and copy this
 code into it.

```java
package edu.teavm.demo;

import org.teavm.flavour.rest.Resource;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import edu.teavm.demo.models.User;
import edu.teavm.demo.models.Post;

import java.util.List;

@Resource
@Path("")
public interface JsonPlaceholderService {
  @GET
  @Path("users/{userId}")
  @Produces("application/json")
  User user(@PathParam("userId") int userId);

  @GET
  @Path("posts")
  @Produces("application/json")
  List<Post> posts();

  @GET
  @Path("posts/{postId}")
  @Produces("application/json")
  Post post(@PathParam("postId") int upostIderId);
}
```

We first need to tell Flavor that this interface is a Resource using the given annotation. Flavor will read this and
 use some reflection magic to inject the methods in an implemented class, we only have to provide the interface. Next
 , we use the `javax.ws.rs` annotations do document our service client. We define three methods, one that will fetch
 the `/user/{userId}` endpoint to fetch the user identified by the id, one that will fetch all posts under `/posts
 `, and one that will fetch a specific post under `/posts/{postId}` with the provided id.

Let's go back to our `Client.java` file and make use of our service. Replace the content of that file with this content:

```java
package edu.teavm.demo;

import org.teavm.flavour.templates.BindTemplate;
import org.teavm.flavour.widgets.ApplicationTemplate;
import org.teavm.flavour.rest.RESTClient;
import org.teavm.flavour.widgets.BackgroundWorker;

import edu.teavm.demo.models.User;

@BindTemplate("templates/client.html")
public class Client extends ApplicationTemplate {
  private JsonPlaceholderService service;
  private User user;
  private BackgroundWorker background = new BackgroundWorker();

  public static void main(String[] args) {
    Client client = new Client();

    client.bind("application-content");
  }

  public Client() {
    service = RESTClient.factory(JsonPlaceholderService.class).createResource("https://jsonplaceholder.typicode.com");
    this.fetch();
  }

  private void fetch() {
    background.run(() -> {
      user = service.user(1);
    });
  }

  public User getUser() {
    return user;
  }
}
```

We first added a few member variables. The first two are our service instance, and the user we will be fetching in the
 Client. Our service, in particular, is created with the "resource" for jsonplacholder, it's URL. The second is what
 is called a background worker. This worker is a special widget provided by Flavour that gives us the ability to run
 things in the background. Since we do not want to lock the UI while we fetch the user, we'll instead fetch it in
 a worker and show a loader while it loads. Finally, we call a fetch method where we execute the background task and
 fetch our user.

Let's modify our `client.html` file as well to show the user once fetched.

```html
<div>
  <std:choose>
    <std:option when="user == null">
      Loading...
    </std:option>
    <std:otherwise>
      <h1>Welcome <html:text value="user.name"/></h1>
    </std:otherwise>
  </std:choose>
</div>
```

What are those `std:choose` and `std:option` tags? With Flavour, we cannot use Java expressions directly in the
 templates to do things like showing elements conditionally. As such, the framework provides custom tags to allow us
 to do so. The `std:choose` tag acts like a `switch` with the `std:option` tags being the cases. If will display the
 content of the first option that resolves to true, displaying the `std:otherwise` tag if none did.

In this case, if you package and deploy the application, you should see a loading message, then the username should
 be shown on screen in a big heading.

## Routing
Flavour handles routing in the same way it handles REST. You create an interface that describes your routes through
 annotations and then use that interface with their reflection magic. Let's start making that router. Create a file
 named `Router.java` in the `src/main/java/edu/teavm/demo` folder and copy this content into it.

```java
package edu.teavm.demo;

import org.teavm.flavour.routing.Route;
import org.teavm.flavour.routing.PathSet;
import org.teavm.flavour.routing.Path;
import org.teavm.flavour.routing.PathParameter;

@PathSet
public interface Router extends Route {
    @Path("/")
    void index();

    @Path("/post/{id}")
    void post(@PathParameter("id") int id);
}
```

The `PathSet` is the base annotation that tells Flavour this interface will describe the possible paths we want to
 provide to our users. For each of those paths, the `Path` annotation describe the URL path needed to access that
 page and any parameters we might need. To be able to manage what is shown when any of these routes match, we need to
 implement this interface in our `Client` class. Let's do that, replace the content of `Client.java` with the
 following code.

```java
package edu.teavm.demo;

import org.teavm.flavour.templates.BindTemplate;
import org.teavm.flavour.widgets.ApplicationTemplate;
import org.teavm.flavour.rest.RESTClient;
import org.teavm.flavour.widgets.BackgroundWorker;
import org.teavm.flavour.widgets.RouteBinder;

import edu.teavm.demo.models.User;

@BindTemplate("templates/client.html")
public class Client extends ApplicationTemplate implements Router {
  private JsonPlaceholderService service;
  private User user;
  private BackgroundWorker background = new BackgroundWorker();

  public static void main(String[] args) {
    Client client = new Client();

    new RouteBinder()
      .withDefault(Router.class, Router::index)
      .add(client)
      .update();

    client.bind("application-content");
  }

  public Client() {
    service = RESTClient.factory(JsonPlaceholderService.class).createResource("https://jsonplaceholder.typicode.com");
    this.fetch();
  }

  private void fetch() {
    background.run(() -> {
      user = service.user(1);
    });
  }

  public void index() {
  }

  public void post(int id) {
  }

  public User getUser() {
    return user;
  }
}
```

We added a few things. First, in the `main` method, we bind our router with our client class using the `RouteBinder
` class. This tells Flavor that Client will be the main manager for routing this specific path set and that, whenever
 it detects a matching route, it should call the corresponding method on the `Client` class. We also tell it, through
 the `withDefault` method, to always show the index by default. If you try this in your application, you will notice
 that the `#/` hash gets appended automatically to the URL of the page, this is that default in action.

However, you will have noticed that we have not added any code to the two new methods we added. We need to create
 specific views that will show different content based on the route. A class extending the `ApplicationTemplate
 ` class has access to a method to manage a variable called the "view". A view is the content that should be
 displayed in a special tag in the associated template. There can only be one view active at a time, and we can change
 which view is displayed with the `setView` method.

Let's add the tag to display the view by modifying our code in `client.html` to look like this:

```html
<div>
  <std:choose>
    <std:option when="user == null">
      Loading...
    </std:option>
    <std:otherwise>
      <std:insert fragment="content" />
    </std:otherwise>
  </std:choose>
</div>
```

The `<std:insert fragment="content" />` is where the view will be added, with this changed, Flavour will do its magic
 and change the content of the page whenever we change the URL.

## Components
We know from experience that we'll want a post component to display a specific post's content, so let's create this
 component before we add our views. Start by creating a new folder called `components` under `src/main/java/edu/teavm
 /demo`. Add a file called `PostComponent.java` in that folder and copy this code into it:

```java
package edu.teavm.demo.components;

import edu.teavm.demo.Router;
import edu.teavm.demo.models.Post;

import org.teavm.flavour.routing.Routing;
import org.teavm.flavour.templates.BindAttribute;
import org.teavm.flavour.templates.OptionalBinding;
import org.teavm.flavour.templates.BindTemplate;
import org.teavm.flavour.templates.BindElement;
import org.teavm.flavour.templates.Slot;
import org.teavm.flavour.widgets.AbstractWidget;

import java.util.function.Supplier;
import java.util.function.Consumer;

@BindTemplate("templates/components/post.html")
@BindElement(name = "post")
public class PostComponent extends AbstractWidget {
  private Supplier<Post> postSupplier;
  private Supplier<Boolean> shouldRouteSupplier;

  public PostComponent(Slot slot) {
    super(slot);
  }

  public Router route(Consumer<String> consumer) {
    return Routing.build(Router.class, consumer);
  }

  @BindAttribute(name = "post")
  public void setPostSupplier(Supplier<Post> postSupplier) {
    this.postSupplier = postSupplier;
  }

  public Post getPost() {
    return postSupplier.get();
  }

  @BindAttribute(name = "should-route")
  @OptionalBinding
  public void setShouldRouteSupplier(Supplier<Boolean> shouldRouteSupplier) {
    this.shouldRouteSupplier = shouldRouteSupplier;
  }

  public Boolean getShouldRoute() {
    return shouldRouteSupplier != null ? shouldRouteSupplier.get() : false;
  }
}
```

There is a lot to unpack here, so let's go in order. First, we bind, through annotations, the template we'll be
 creating shortly to this component. This tells it to use the HTML inside that template file when it will be rendered
 . The next annotation binds the component to a special tag. We will be using that name when we'll use the component
 in other templates.

Next, we have the class extend the `AbstractWidget` class. This tells Flavor that our component is indeed a component
 (called widgets in Flavour) and allows it to do its magic. We then create two member variables of type `Supplier
 `. Those variables are attributes, when we assign a value to those attributes in the HTML templates, those suppliers
 are assigned, and we can access the data with `get`. In this specific case, we want to have a post, and a boolean to
 know if the component should render the title as a link or a simple title.

The next step is the constructor. It takes one parameter called a `Slot`. This parameter is a parameter that flavour
 uses to position the component in the UI, and we can safely ignore it. We then create a `route` method, which takes a
 consumer and return our Router. This a special method that enables this component to create links to other pages in
 the application. This code is provided in [Flavour's docs](http://teavm.org/docs/flavour/routing.html) and can be
 copied as-is throughout the application.

Finally, we create getters and setters for our attributes. The `BindAttribute` annotations binds the setter to the
 attribute name on the component, so when we do `<post post="post">`, Flavour knows to use that setter. The `should
 -route` attribute is special since we want to allow our users to omit it. To do so, we tell the setter that that
 attribute may be omitted with the `OptionalBinding` annotation. By default, Flavour will throw exceptions if you do
 not add an attribute. This annotation changes that behavior and Flavor will allow null suppliers, which we must
 take into account in the getter.

That was quite a lot of information! Let's take all this and create the template. Create a folder in `src/main/resources
/templates` called `components` and add a `post.html` file in there. Copy the following code into that file.

```html
<li>
  <std:choose>
    <std:option when="shouldRoute">
      <a html:link="route(it).post(post.id)">
        <h1><html:text value="post.title"/></h1>
      </a>
    </std:option>
    <std:otherwise>
      <h1><html:text value="post.title"/></h1>
    </std:otherwise>
  </std:choose>
  <p><html:text value="post.body"/></p>  
</li>
```

We again use the `std:choose` element, though it is used to display a link, or a title depending on the value of
 `shouldRoute`. The link in question has a new attribute called `html:link`. This attribute will dynamically create
 the `href` attribute of the `a` tag using the paths we gave in the router. That way, if we ever change our paths, we
 do not have to go into all our templates and replace all broken paths! To use this amazing functionality, we call
 the `route` method we created earlier with the `a` tag as the parameter (In Flavour, `it` is the element where the
 attribute is called). We then call the `post` method of our router with the post's id as the parameter. Flavour will
 do its magic behind the scenes and generate the `href` based on our specific post.

There is one last thing we need to do to be able to use this component, we need to register it inside of Flavour. To
 do so, create a new folder structure inside the `src/main/resources` so you end up with this path :`src/main
 /resources/META-INF/flavour/component-packages`. Create a `edu.teavm.demo.components` in there and copy the
 following content into it.

```
PostComponent
```

And that's it. Our component is now registered, and we will be able to import it later. If we ever added a new
 component in the `edu.teavm.demo.components` package, all we have to do is copy the name of the class to that file
 like we did for the post component. Similarly, adding other packages is done by creating a file with the package's
 path and adding the class names in there.

## Creating views
We can finally start creating our views. Let's start by creating the index view that will be shown when the index
 route is matching in our router. To do so, create a `views` folder in `src/main/java/edu/teavm/demo` folder and
 create a `IndexView.java` file in there, copying the following content into it:

```java
package edu.teavm.demo.views;

import org.teavm.flavour.routing.Routing;
import org.teavm.flavour.widgets.BackgroundWorker;
import org.teavm.flavour.templates.BindTemplate;

import edu.teavm.demo.JsonPlaceholderService;
import edu.teavm.demo.Router;
import edu.teavm.demo.models.Post;
import edu.teavm.demo.models.User;

import java.util.List;
import java.util.function.Consumer;

@BindTemplate("templates/views/index.html")
public class IndexView {
  private JsonPlaceholderService service;
  private User user;
  private List<Post> posts;
  private BackgroundWorker background = new BackgroundWorker();

  public IndexView(JsonPlaceholderService service, User user) {
    this.user = user;
    this.service = service;
    this.fetch();
  }

  public Router route(Consumer<String> consumer) {
    return Routing.build(Router.class, consumer);
  }

  private void fetch() {
    background.run(() -> posts = service.posts());
  }

  public User getUser() {
    return user;
  }

  public List<Post> getPosts() {
    return posts;
  }
}
```

That's a pretty big class, but there should be nothing new in there. This class extends no other classes and is
 bound to a template we will be creating shortly. The view will show the user, and a list of posts. Since we know our
 main application in `Client.java` already has access to the user, we get it in the constructor alongside the service
 instance. We then use a fetch method to fetch all the posts. Let's look at how we use those in the template. Create
 a `views` folder in the `src/main/resource/templates` folder and add a `index.html` file in there, copying the
 following code into it.

```html
<?use components:edu.teavm.demo.components?>
<div>
  <std:choose>
    <std:option when="user == null || posts == null">
      Loading...
    </std:option>
    <std:otherwise>
      <h1>Welcome <html:text value="user.name"/></h1>
      <std:foreach in="posts" var="post">
        <components:post post="post" should-route="1 == 1" />
      </std:foreach>
    </std:otherwise>
  </std:choose>
</div>
```

The first thing of note here is the `<?use components:edu.teavm.demo.components?>` tag. This imports our component
 registration file we created at the end of the previous section and add all the classes we identified in that file
 under the namespace `components`. Using our post component is as easy as using that namespace, colon, the component
 name we bound using the annotations: `components:post`.

We then use the `std:choose` component again to show a loader when our user or posts are loading (remember that the
 index is our default route, user might still be loading in the background when we display this route).`std:foreach
 ` act as a for loop, with the `in` attribute being the collection and the `var` attribute being the name of the
 created variable that contains the element being iterated over. We can then assign that post variable to our
 component using the `post` attribute. Since we want to be able to click on the titles of the posts and be routed to
 the specific post pages, we also tell the component to do so using the `should-route` attribute. Since `shouldRoute
 ` is a Supplier, we have to give it an expression that resolves to `true` (Flavour won't let us pass pure booleans
 ), we do so with the very ugly `1 == 1` expression.

Let's now create our post view. Create a `PostView.java` file in the `src/main/java/edu/teavm/demo/views` folder and
 copy the following code in there.

```java
package edu.teavm.demo.views;

import org.teavm.flavour.routing.Routing;
import org.teavm.flavour.widgets.BackgroundWorker;
import org.teavm.flavour.templates.BindTemplate;

import edu.teavm.demo.JsonPlaceholderService;
import edu.teavm.demo.Router;
import edu.teavm.demo.models.Post;

import java.util.function.Consumer;

@BindTemplate("templates/views/post.html")
public class PostView {
  private JsonPlaceholderService service;
  private Post post;
  private BackgroundWorker background = new BackgroundWorker();

  public PostView(JsonPlaceholderService service, int postId) {
    this.service = service;
    this.fetch(postId);
  }

  public Router route(Consumer<String> consumer) {
    return Routing.build(Router.class, consumer);
  }

  private void fetch(int postId) {
    background.run(() -> post = service.post(postId));
  }

  public Post getPost() {
    return post;
  }
}
```

Nothing new there. The only difference with the index view being that we get the id of the post we'd like to display
 in the constructor, and we fetch that post in the fetch method rather than fetch all the posts. Let's review the
 template, create a `post.html` file in the `src/main/resource/templates/views` folder and copy this content in it.

```html
<?use components:edu.teavm.demo.components?>
<std:choose>
  <std:option when="post == null">
    Loading...
  </std:option>
  <std:otherwise>
    <components:post post="post" />
  </std:otherwise>
</std:choose>
```

We reuse our post component here to save code, but we let that component know that it should not route by omitting
 the `should-route` attribute.

Finally, we need to hook our views to our main application to make sure it will display them when we route in our
 application. Let's change the code in `Client.java` a last time by adding the following content in it.

```java
package edu.teavm.demo;

import org.teavm.flavour.templates.BindTemplate;
import org.teavm.flavour.widgets.ApplicationTemplate;
import org.teavm.flavour.rest.RESTClient;
import org.teavm.flavour.widgets.BackgroundWorker;
import org.teavm.flavour.widgets.RouteBinder;

import edu.teavm.demo.models.User;
import edu.teavm.demo.views.IndexView;
import edu.teavm.demo.views.PostView;

@BindTemplate("templates/client.html")
public class Client extends ApplicationTemplate implements Router {
  private JsonPlaceholderService service;
  private User user;
  private BackgroundWorker background = new BackgroundWorker();

  public static void main(String[] args) {
    Client client = new Client();

    new RouteBinder()
      .withDefault(Router.class, Router::index)
      .add(client)
      .update();

    client.bind("application-content");
  }

  public Client() {
    service = RESTClient.factory(JsonPlaceholderService.class).createResource("https://jsonplaceholder.typicode.com");
    this.fetch();
  }

  private void fetch() {
    background.run(() -> {
      user = service.user(1);
      setView(new IndexView(service, user)); // Added this line
    });
  }

  public void index() {
    setView(new IndexView(service, user)); // Added this line
  }

  public void post(int id) {
    setView(new PostView(service, id)); // Added this line
  }

  public User getUser() {
    return user;
  }
}
```

We added three lines, identified with comments in the above code. In our route methods, we added the `setView` call
 that creates a new instance of the view with the required parameters. Notice how we pass the id to the `PostView
 ` class. When the route matches, this id will be the id in the path, and we know from the earlier code that the post
 will be fetched based on this id. Finally, we also added a `setView` call in the background task. This is because our
 index view is the default view. When the background task resolves, Flavour will not recreate the view, meaning it still
 has the previous user (`null` in this case) in its variables. There are various methods to set the user on a view
 , but in our case, it was easier to simply recreate the view since it's very light and does not hold any state.

Try building and deploying the application again, you will se we display some loading indicators before showing a
 list of posts with clickable titles. Try clicking on one of those titles, you should be routed to a new page with
 the post shown. Note that the instance of tomcat on the repl.it has not been configured to handle hashes in routes, so
 refreshing the page will lead to a 404 error. If you want to go back to the index, remove the hash part of the URL
 and let Flavour sent you to the default page.

## Conclusion
In this last tutorial, we explored TeaVM and Web Assembly as a way to create client-side web applications in Java
 with all the tools we've come to expect from modern JavaScript frameworks. By creating a very simple application, we
 've explored most of Flavour's features, and you have all the tools to build more complex applications. Web assembly is
 still a new technology, but it has seen early adoption by many communities. For example, if you're interested in WASM
 applications, the C++ community has access to [asm-dom](https://mbasso.github.io/asm-dom/), a virtual DOM
 implementation in C++. In the same vein, Microsoft has fully committed to Web Assembly and has released [blazor
 ](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor), which embeds directly into the modern .NET stack and
 gives you the ability to build both your backend and frontend in C#.

You can explore more awesome web assembly libraries here: https://github.com/mbasso/awesome-wasm. Happy hacking.
