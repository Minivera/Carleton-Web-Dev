import { databaseManager } from '../../database';

/**
 * utility web component that allows its child classes to be notified when the database is valid and has
 * changed. Notification is handled through the `notified` method and will only happen if the database
 * is ready.
 */
export const DatabaseConsumer = (base = window.HTMLElement) => class extends base {
  constructor() {
    super();

    this.unsuscriber = null;
  }

  connectedCallback() {
    if (this.isConnected) {
      this.unsuscriber = databaseManager.subscribe(this.triggerNotified.bind(this));
    }

    if (databaseManager.ready) {
      this.render();
    }
  }

  disconnectedCallback() {
    if (this.unsuscriber) {
      this.unsuscriber();
    }
  }

  triggerNotified() {
    // Only notify child classes f the database is ready.
    if (!databaseManager.ready) {
      return;
    }

    this.notified();
  }

  notified() {}

  render() {}
};
