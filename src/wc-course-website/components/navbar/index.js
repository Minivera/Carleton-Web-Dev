import { databaseManager } from '../../database';

class NavBar extends window.HTMLElement {
  constructor() {
    super();

    this.navbarTemplateId = '#navbar';
    this.navbarItemTemplateId = '#navbar-item';
    this.navbarAddTemplateId = '#navbar-add';
    this.navbarDividerTemplateId = '#navbar-divider';

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
    const tutorials = databaseManager.getTutorials();
    const assignments = databaseManager.getAssignments();
    const forums = databaseManager.getForums();

    const navbarTemplate = document.querySelector(this.navbarTemplateId).content;
    const navbarItemTemplate = document.querySelector(this.navbarItemTemplateId).content;
    const navbarAddTemplate = document.querySelector(this.navbarAddTemplateId).content;
    const navbarDividerTemplate = document.querySelector(this.navbarDividerTemplateId).content;

    const templateNode = navbarTemplate.cloneNode(true);

    const lecturesNode = templateNode.querySelector('[data-list="lectures"]');
    lectures.forEach(lecture => {
      const node = navbarItemTemplate.cloneNode(true);
      const anchor = node.querySelector('a');
      anchor.href = `/wc-course-website/lecture/index.html?lecture=${lecture.$loki}`;
      anchor.innerText = lecture.unit;
      lecturesNode.appendChild(node);
    });

    lecturesNode.appendChild(navbarDividerTemplate.cloneNode(true));

    const addLecture = navbarAddTemplate.cloneNode(true);
    const addLectureAnchor = addLecture.querySelector('a');
    addLectureAnchor.href = '/wc-course-website/lectures/index.html?new';
    addLectureAnchor.querySelector('.text').innerText = 'Add a new lecture';
    lecturesNode.appendChild(addLecture);

    const assignmentsNode = templateNode.querySelector('[data-list="assignments"]');
    assignments.forEach(assignment => {
      const node = navbarItemTemplate.cloneNode(true);
      const anchor = node.querySelector('a');
      anchor.href = `/wc-course-website/assignment/index.html?assignment=${assignment.$loki}`;
      anchor.innerText = assignment.name;
      assignmentsNode.appendChild(node);
    });

    assignmentsNode.appendChild(navbarDividerTemplate.cloneNode(true));

    const addAssignment = navbarAddTemplate.cloneNode(true);
    const addAssignmentAnchor = addAssignment.querySelector('a');
    addAssignmentAnchor.href = '/wc-course-website/assignments/index.html?new';
    addAssignmentAnchor.querySelector('.text').innerText = 'Add a new assignment';
    assignmentsNode.appendChild(addAssignment);

    const tutorialsNode = templateNode.querySelector('[data-list="tutorials"]');
    tutorials.forEach(tutorial => {
      const node = navbarItemTemplate.cloneNode(true);
      const anchor = node.querySelector('a');
      anchor.href = `/wc-course-website/tutorial/index.html?tutorial=${tutorial.$loki}`;
      anchor.innerText = tutorial.name;
      tutorialsNode.appendChild(node);
    });

    tutorialsNode.appendChild(navbarDividerTemplate.cloneNode(true));

    const addTutorial = navbarAddTemplate.cloneNode(true);
    const addTutorialAnchor = addTutorial.querySelector('a');
    addTutorialAnchor.href = '/wc-course-website/tutorials/index.html?new';
    addTutorialAnchor.querySelector('.text').innerText = 'Add a new tutorial';
    tutorialsNode.appendChild(addTutorial);

    const forumsNode = templateNode.querySelector('[data-list="forums"]');
    forums.forEach(forum => {
      const node = navbarItemTemplate.cloneNode(true);
      const anchor = node.querySelector('a');
      anchor.href = `/wc-course-website/forum/index.html?forum=${forum.$loki}`;
      anchor.innerText = forum.title;
      forumsNode.appendChild(node);
    });

    this.innerHTML = '';
    this.appendChild(templateNode);
  }
}

window.customElements.define('nav-bar', NavBar);
