module.exports = {
  attachHandlers(handlers) {
    handlers.forEach(attachHandler);
  },

  render,

  attachComponent
};

function render({ template, root, ...context }) {
  attachComponent(root, template(context));
}

function attachComponent(el, content) {
  document.querySelector(el).innerHTML = content;
}

function attachHandler({ selector, action = 'click', handler }) {
  document.querySelector(selector).addEventListener(action, handler);
}
