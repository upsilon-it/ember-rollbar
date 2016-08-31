export function initialize(container, application) {
  container.lookup('service:rollbar').configure(application.rollbar);
}
