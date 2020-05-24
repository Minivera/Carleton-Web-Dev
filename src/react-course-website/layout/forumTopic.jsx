import React, { useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';

import { Activities } from '../components/activities';
import { addForumTopicComment, removeForumTopicComment } from '../data/courseContent';
import { getUser } from '../data/users';

export const ForumTopicPage = ({ content, user, dispatch }) => {
  const { id, topicId } = useParams();
  const [description, setDescription] = useState('');

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
