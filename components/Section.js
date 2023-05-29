class Section {
  constructor({ items, renderer }, containerSelector) {
    // items serves as an array of data
    // renderer is for rendering that data on the page
    // containerSelector is where card elements are added

    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // public method named renderItems()
  renderItems() {
    this._renderItems.forEach((item) => this._renderer(item));
  }

  // public method called addItem() that take a DOM element and adds it to the container
  addItem() {
    this._container.append(element);
  }
}
