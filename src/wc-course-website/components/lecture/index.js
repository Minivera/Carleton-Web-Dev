import { databaseManager } from '../../database';

class Lecture extends window.HTMLDivElement {
  constructor() {
    super();

    this.lectureTemplateId = '#single-lecture';

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

  static get observedAttributes() {
    return ['lecture-id'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'lecture-id' && oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    if (!databaseManager.ready) {
      return;
    }

    this.classList.add('panel');
    this.classList.add('is-primary');

    let lectureId = null;
    const query = new window.URL(window.location.toString());
    if (this.hasAttribute('lecture-id')) {
      lectureId = this.getAttribute('lecture-id');
    } else if (query.searchParams.has('lecture')) {
      lectureId = query.searchParams.get('lecture');
    } else {
      return;
    }

    const lecture = databaseManager.getLecture(lectureId);
    if (!lecture) {
      return;
    }

    const lectureTemplate = document.querySelector(this.lectureTemplateId).content;
    const lectureNode = lectureTemplate.cloneNode(true);

    const title = lectureNode.querySelector('[data-element="title-link"]');
    title.href = `/wc-course-website/lecture/index.html?lecture=${lecture.$loki}`;
    title.innerText = lecture.unit;

    const deletePath = this.getAttribute('delete-path');
    const deleteButton = lectureNode.querySelector('[data-element="delete-button"]');
    deleteButton.onclick = () => {
      databaseManager.deleteLecture(lecture);
      if (deletePath) {
        window.location.href = deletePath;
      }
    };

    const slidesTemplate = lectureNode.querySelector('[data-list="slides"]').content;
    if (lecture.recordings) {
      lecture.slides.forEach(slide => {
        const node = slidesTemplate.cloneNode(true);
        const container = node.querySelector('div');
        container.appendChild(document.createTextNode(slide.title));
        lectureNode.appendChild(node);
      });
    }

    const recordingsTemplate = lectureNode.querySelector('[data-list="recordings"]').content;
    if (lecture.recordings) {
      lecture.recordings.forEach(recording => {
        const node = recordingsTemplate.cloneNode(true);
        const container = node.querySelector('div');
        container.appendChild(document.createTextNode(recording.title));
        lectureNode.appendChild(node);
      });
    }

    const codeTemplate = lectureNode.querySelector('[data-list="code"]').content;
    if (lecture.code) {
      lecture.code.forEach(code => {
        const node = codeTemplate.cloneNode(true);
        const container = node.querySelector('div');
        container.appendChild(document.createTextNode(code.title));
        lectureNode.appendChild(node);
      });
    }

    this.innerHTML = '';
    this.appendChild(lectureNode);
  }
}

window.customElements.define('single-lecture', Lecture, { extends: 'div' });
