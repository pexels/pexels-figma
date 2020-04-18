import { html } from "../../node_modules/lit-html/lit-html";

// The image markup to be rendered
const loadingMarkup = (message = "Loading photos") => {
  return html`
    <div class="visual-bell">
      <div class="visual-bell__spinner-container">
        <span class="visual-bell__spinner"></span>
      </div>
      <span class="visual-bell__msg">${message}&hellip;</span>
    </div>
  `;
};

export default loadingMarkup;
