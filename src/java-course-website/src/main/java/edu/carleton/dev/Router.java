package edu.carleton.dev;

import org.teavm.flavour.routing.Route;
import org.teavm.flavour.routing.PathSet;
import org.teavm.flavour.routing.Path;
import org.teavm.flavour.routing.PathParameter;

@PathSet
public interface Router extends Route {
    @Path("/")
    void index();

    @Path("/lectures/single/{id}")
    void singleLecture(@PathParameter("id") String id);

    @Path("/lectures")
    void lectures();

    @Path("/lectures/add")
    void addLecture();

    @Path("/tutorials/single/{id}")
    void singleTutorial(@PathParameter("id") String id);

    @Path("/tutorials")
    void tutorials();

    @Path("/tutorials/add")
    void addTutorial();

    @Path("/assignments/single/{id}")
    void singleAssignment(@PathParameter("id") String id);

    @Path("/assignments")
    void assignments();

    @Path("/assignments/add")
    void addAssignment();

    @Path("/forums/{forum_id}/{topic_id}")
    void forumTopic(@PathParameter("forum_id") String forumId, @PathParameter("topic_id") String topic_id);

    @Path("/forums/{id}")
    void singleForum(@PathParameter("id") String id);

    @Path("/forums")
    void forums();
}
