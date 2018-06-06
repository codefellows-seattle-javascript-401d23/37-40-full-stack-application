// autobind class methods

export default function autoBind(classComponent) {
  // return an array of methods of class component's prototype
  const classMethods = Object.getOwnPropertyNames(classComponent.prototype);
  classMethods.forEach((method) => {
    if (method.startsWith('handle')) {
      this[method] = this[method].bind(this);
    }
  });
}


