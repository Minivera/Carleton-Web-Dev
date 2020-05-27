import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, useParams, useHistory } from 'react-router-dom';

import { Activities } from '../components/activities';
import { addForumTopic, removeForumTopic } from '../data/courseContent';
import { getUser } from '../data/users';
import { CourseContentType, UserType } from '../types/proptypes';

/**
 * Page for displaying a forum category, hosted under the route `/forums/:id`.
 *
 * The _:id_ parameter in the route should be a number and will make the application fetch the given
 * element inside the course content.
 *
 * If none of those parameters are valid, it will redirect to the home page.
 *
 * Will display the page as two tiles, one with the forum categories and one with the activities sub menu.
 *
 * See also: [Bulma Tiles](https://bulma.io/documentation/layout/tiles/)<br />
 * See also: <a data-sb-kind="Components/Activities menu">Activities sub menu</a>
 */
export const ForumPage = ({ content, user, dispatch }) => {
  const { id } = useParams();
  const history = useHistory();
  // These states hook will give us the ability to create new forum topics
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const forum = content.forums.find(el => `${el.id}` === id);

  if (!forum) {
    return <Redirect to="/" />;
  }

  const handleAddTopic = () => {
    dispatch({
      type: addForumTopic,
      id: forum.id,
      username: user.name,
      title,
      description,
    });
    // Redirect to the newly added forum element.
    history.push(`/forums/${forum.id}/topics/${forum.topics.length}`);
  };

  const handleRemoveTopic = topicId => {
    dispatch({
      type: removeForumTopic,
      id: forum.id,
      topicId,
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
                <li className="is-active"><a>{forum.title}</a></li>
              </ul>
            </nav>
            {forum.topics.length ? forum.topics.map(topic => {
              const firstComment = topic.comments[0];
              const author = getUser(firstComment.user);

              return (
                <article className="media" key={topic.id}>
                  <figure className="media-left">
                    <p className="image is-64x64">
                      <img alt={author.name} src={author.avatar} />
                    </p>
                  </figure>
                  <div className="media-content">
                    <h3 className="title is-4">
                      <Link to={`/forums/${forum.id}/topics/${topic.id}`}>
                        {topic.title}
                      </Link>
                    </h3>
                    <div className="content has-text-justified">
                      <p>
                        <strong>{author.name}</strong> <small>{author.email}</small>
                        <br />
                        {firstComment.content.split('\n').map((item, i) => <p key={i}>{item}</p>)}
                        <hr />
                        {topic.comments.length - 1} comment{topic.comments.length > 2 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  {author.email === user.email && (
                    <div className="media-right">
                      <button className="delete" onClick={() => handleRemoveTopic(topic.id)} />
                    </div>
                  )}
                </article>
              );
            }) : (
              <div className="notification is-info" style={{ marginTop: 20 }}>
                No topics created in this discussion board
              </div>
            )}
            {(forum.id !== 0 || user.role === 'admin') && (
              <article className="media">
                <div className="media-content">
                  <h3 className="title is-4">Create a new topic</h3>
                  <div className="field">
                    <p className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="What do you want to discuss about?"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                      />
                    </p>
                  </div>
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
                  <button className="button is-info" onClick={handleAddTopic}>
                    Submit
                  </button>
                </div>
              </article>
            )}
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

ForumPage.propTypes = {
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
