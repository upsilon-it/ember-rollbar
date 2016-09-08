export function initialize(instance) {
  const { container, application } = instance;
  container.lookup('service:rollbar').configure(application.rollbar);
}
