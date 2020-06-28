import { databaseManager } from '../../database';
import { DatabaseConsumer } from '../base/databaseConsumer';
import { createUrl } from '../../utilities/createUrl';

/**
 * A component that will render a single lectures's panel. Will render the lecture passed trough properties or
 * through the `lecture` search param. All events are handled internally through the database manager.
 *
 * This element extends the base div element and will need to created as `<div is="single-lecture">`
 *
 * @prop {Lecture} lecture - Write only lecture property to define which lecture to render.
 *
 * @element single-lecture
 */
export class Lecture extends DatabaseConsumer(window.HTMLDivElement) {
  constructor() {
    super();

    this.lectureTemplateId = '#single-lecture';

    this.lectureData = null;
  }

  notified() {
    this.render();
  }

  set lecture(lecture) {
    this.lectureData = lecture;
    this.render();
  }

  render() {
    this.classList.add('panel');
    this.classList.add('is-primary');

    let lecture = null;
    const query = new window.URL(window.location.toString());
    if (this.lectureData) {
      lecture = this.lectureData;
    } else if (query.searchParams.has('lecture')) {
      const lectureId = query.searchParams.get('lecture');
      lecture = databaseManager.getLecture(lectureId);
    } else {
      return;
    }

    if (!lecture) {
      return;
    }

    const lectureTemplate = document.querySelector(this.lectureTemplateId).content;
    const lectureNode = lectureTemplate.cloneNode(true);

    const title = lectureNode.querySelector('[data-element="title-link"]');
    title.href = createUrl('lecture', lecture.$loki);
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
