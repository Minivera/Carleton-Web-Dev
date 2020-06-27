import { databaseManager } from '../../database';

class Activities extends window.HTMLElement {
  constructor() {
    super();

    this.activitiesTemplateId = '#activities';

    this.unsuscriber = null;
    this.render();
  }

  connectedCallback() {
    if (this.isConnected) {
      this.unsuscriber = databaseManager.subscribe(this.render.bind(this));
    }
  }

  disconnectedCallback() {
    if (this.unsuscriber) {
      this.unsuscriber();
    }
  }

  render() {
    if (!databaseManager.ready) {
      return;
    }

    const lectures = databaseManager.getLectures();
    const assignments = databaseManager.getTutorials();
    const tutorials = databaseManager.getTutorials();
    const forums = databaseManager.getForums();

    const activitiesTemplate = document.querySelector(this.activitiesTemplateId).content;
    const activitiesNode = activitiesTemplate.cloneNode(true);

    const lectureTemplate = activitiesNode.querySelector('[data-element="single-lecture"]').content;
    lectures.forEach(lecture => {
      const node = lectureTemplate.cloneNode(true);
      const anchor = node.querySelector('[data-element="title"]');
      anchor.href = `/wc-course-website/lecture/index.html?lecture=${lecture.$loki}`;
      anchor.innerText = lecture.unit;
      activitiesNode.querySelector('[data-list="lectures"]').appendChild(node);
    });

    const tutorialTemplate = activitiesNode.querySelector('[data-element="single-tutorial"]').content;
    tutorials.forEach(tutorial => {
      const node = tutorialTemplate.cloneNode(true);
      const anchor = node.querySelector('[data-element="title"]');
      anchor.href = `/wc-course-website/tutorial/index.html?tutorial=${tutorial.$loki}`;
      anchor.innerText = tutorial.name;
      activitiesNode.querySelector('[data-list="tutorials"]').appendChild(node);
    });

    const assignmentTemplate = activitiesNode.querySelector('[data-element="single-assignment"]').content;
    assignments.forEach(assignment => {
      const node = assignmentTemplate.cloneNode(true);
      const anchor = node.querySelector('[data-element="title"]');
      anchor.href = `/wc-course-website/assignment/index.html?assignment=${assignment.$loki}`;
      anchor.innerText = assignment.name;
      activitiesNode.querySelector('[data-list="assignments"]').appendChild(node);
    });

    const forumsTemplate = activitiesNode.querySelector('[data-element="single-forum"]').content;
    forums.forEach(forum => {
      const node = forumsTemplate.cloneNode(true);
      const anchor = node.querySelector('[data-element="title"]');
      anchor.href = `/wc-course-website/forum/index.html?forum=${forum.$loki}`;
      anchor.innerText = forum.title;
      node.querySelector('[data-element="topic-count"]').innerText = forum.topics.length;
      activitiesNode.querySelector('[data-list="forums"]').appendChild(node);
    });

    this.innerHTML = '';
    this.appendChild(activitiesNode);
  }
}

window.customElements.define('activities-aside', Activities);
