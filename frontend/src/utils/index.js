export default function autoBind(classComponent) {
  // this returns an array of methods off class component's prototype
  const classMethods = Object.getOwnPropertyNames(classComponent.prototype);
  classMethods.forEach((method) => {
    if (method.startsWith('handle')) {
      this[method] = this[method].bind(this);
    }
  });
}
