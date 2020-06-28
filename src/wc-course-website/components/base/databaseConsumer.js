import { databaseManager } from '../../database';

export const DatabaseConsumer = (base = window.HTMLElement) => class extends base {
  constructor() {
    super();

    this.unsuscriber = null;
  }

  connectedCallback() {
    if (this.isConnected) {
      this.unsuscriber = databaseManager.subscribe(this.triggerNotified.bind(this));
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
};
