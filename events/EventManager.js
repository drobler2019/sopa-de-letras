export class EventManager {
  constructor(elements, eventNames, callbacks) {
    this.controller = new AbortController();
    this.elements = elements;
    elements.forEach((element, index) =>
      element.addEventListener(
        eventNames.at(index),
        (event) => callbacks.at(index)(event),
        { signal: this.controller.signal },
      ),
    );
  }

  abort() {
    this.controller.abort();
  }
}
