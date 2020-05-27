// I would likely use TypeScript in a real world context, but for the purposes of this demo, prop-types it will be
import PropTypes from 'prop-types';

export const UserType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  role: PropTypes.oneOf(['student', 'admin']).isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
});

export const ContentShapeType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
});

export const LectureType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  slides: PropTypes.arrayOf(ContentShapeType),
  recordings: PropTypes.arrayOf(ContentShapeType),
  code: PropTypes.arrayOf(ContentShapeType),
});
export const LecturesType = PropTypes.arrayOf(LectureType);

export const TutorialType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  term: PropTypes.string,
  specfile: ContentShapeType.isRequired,
  resources: PropTypes.arrayOf(ContentShapeType),
});
export const TutorialsType = PropTypes.arrayOf(TutorialType);

export const AssignmentType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  term: PropTypes.string,
  specfile: ContentShapeType.isRequired,
  resources: PropTypes.arrayOf(ContentShapeType),
});
export const AssignmentsType = PropTypes.arrayOf(AssignmentType);

export const CommentType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
});
export const CommentsType = PropTypes.arrayOf(CommentType);

export const TopicType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  comments: CommentsType.isRequired,
});
export const TopicsType = PropTypes.arrayOf(TopicType);

export const ForumType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  topics: TopicsType.isRequired,
});
export const ForumsType = PropTypes.arrayOf(ForumType);

export const CourseContentType = PropTypes.shape({
  lectures: LecturesType.isRequired,
  tutorials: TutorialsType.isRequired,
  assignments: AssignmentsType.isRequired,
  forums: ForumsType.isRequired,
});
