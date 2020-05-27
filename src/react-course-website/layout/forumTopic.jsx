import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, useParams } from 'react-router-dom';

import { Activities } from '../components/activities';
import { addForumTopicComment, removeForumTopicComment } from '../data/courseContent';
import { getUser } from '../data/users';
import { CourseContentType, UserType } from '../types/proptypes';

/**
 * Page for displaying a forum's topic, hosted under the route `/forums/:id/topics/:topicId`.
 *
 * This page displays all the comments as nested media objects. The first comment will be displayed as the root media
 * and act as the topic's description. All subsequent comments are displayed as children of that root media.
 *
 * The _:id_ parameter in the route should be a number and will make the application fetch the given
 * forum inside the course content.
 *
 * The _:topicId_ parameter in the route should be a number and will make the application fetch the given
 * topic inside the forum.
 *
 * If none of those parameters are valid, it will redirect to the home page.
 *
 * Will display the page as two tiles, one with the content and one with the activities sub menu.
 *
 * See also: [Bulma Tiles](https://bulma.io/documentation/layout/tiles/)<br />
 * See also: [Bulma Media Object](https://bulma.io/documentation/layout/media-object/)<br />
 * See also: <a data-sb-kind="Components/Activities menu">Activities sub menu</a>
 */
export const ForumTopicPage = ({ content, user, dispatch }) => {
  const { id, topicId } = useParams();
  const [description, setDescription] = useState('');

  // Get the information from the course content.
  const forum = content.forums.find(el => `${el.id}` === id);
  const topic = forum.topics.find(el => `${el.id}` === topicId);

  if (!forum || !topic) {
    return <Redirect to="/" />;
  }

  const firstComment = topic.comments[0];
  const author = getUser(firstComment.user);

  const handleAddComment = () => {
    dispatch({
      type: addForumTopicComment,
      id: forum.id,
      topicId: topic.id,
      username: user.name,
      description,
    });
    setDescription('');
  };

  const handleRemoveComment = commentId => {
    dispatch({
      type: removeForumTopicComment,
      id: forum.id,
      topicId: topic.id,
      commentId,
    });
  };

  return (
    <div className="tile is-ancestor">
      <div className="tile is-vertical is-8">
        <div className="tile is-parent">
          <article className="tile is-child">
            <nav className="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li><a>Home</a></li>
                <li>
                  <Link to="/">COMP2406</Link>
                </li>
                <li>
                  <Link to="/forums">COMP2406</Link>
                </li>
                <li>
                  <Link to={`/forums/${forum.id}`}>{forum.title}</Link>
                </li>
                <li className="is-active"><a>{topic.title}</a></li>
              </ul>
            </nav>
            <article className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img alt={author.name} src={author.avatar} />
                </p>
              </figure>
              <div className="media-content">
                <h3 className="title is-4">
                  {topic.title}
                </h3>
                <div className="content has-text-justified">
                  <p>
                    <strong>{author.name}</strong> <small>{author.email}</small>
                    <br />
                    {firstComment.content.split('\n').map((item, i) => <p key={i}>{item}</p>)}
                  </p>
                </div>
                {topic.comments.slice(1).map((comment, index, list) => {
                  const commentAuthor = getUser(comment.user);

                  return (
                    <article className="media" key={comment.id}>
                      <figure className="media-left">
                        <p className="image is-64x64">
                          <img alt={commentAuthor.name} src={commentAuthor.avatar} />
                        </p>
                      </figure>
                      <div className="media-content">
                        <div className="content has-text-justified">
                          <p>
                            <strong>{commentAuthor.name}</strong> <small>{commentAuthor.email}</small>
                            <br />
                            {comment.content.split('\n').map((item, i) => <p key={i}>{item}</p>)}
                          </p>
                        </div>
                      </div>
                      {(commentAuthor.email === user.email && index === list.length - 1) && (
                        <div className="media-right">
                          <button className="delete" onClick={() => handleRemoveComment(comment.id)} />
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </article>
            <article className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img alt={user.name} src={user.avatar} />
                </p>
              </figure>
              <div className="media-content">
                <div className="field">
                  <p className="control">
                    <textarea
                      className="textarea"
                      placeholder="Add some content"
                      value={description}
                      onChange={event => setDescription(event.target.value)}
                    />
                  </p>
                </div>
                <button className="button is-info" onClick={handleAddComment}>
                  Add a comment
                </button>
              </div>
            </article>
          </article>
        </div>
      </div>
      <div className="tile is-parent">
        <article className="tile is-child box">
          <p className="title">Activities</p>
          <p className="subtitle">Quick access to class activities</p>
          <Activities user={user} content={content} />
        </article>
      </div>
    </div>
  );
};

ForumTopicPage.propTypes = {
  /**
   * The course content inside the application.
   *
   * See the <a data-sb-kind="Components/Complete application">App</a> component documentation for more details.
   */
  content: CourseContentType.isRequired,

  /**
   * The user currently logged into the application.
   *
   * See the <a data-sb-kind="Components/Complete application">App</a> component documentation for more details.
   */
  user: UserType.isRequired,

  /**
   * The dispatch function to send events to the state machine.
   *
   * See the course content documentation for more details.
   */
  dispatch: PropTypes.func.isRequired,
};
