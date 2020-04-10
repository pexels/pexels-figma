import { html } from "../node_modules/lit-html/lit-html";

// Error message markup
const errorMarkup = (message: string = "There was an error.") => {
  return html` <div class="visual-bell visual-bell--error">
    <span class="visual-bell__msg">${message}</span>
  </div>`;
};

export default errorMarkup;
