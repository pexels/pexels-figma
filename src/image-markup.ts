import { html } from "../node_modules/lit-html/lit-html";

// The image markup to be rendered
const imageMarkup = (
  src,
  photographer,
  width: number | string = "auto",
  height: number | string = "auto"
) => {
  return html`
    <figure class="gallery__image">
      <img
        src="${src.tiny}"
        alt="Photo by ${photographer}"
        title="Photo by ${photographer}"
        width="${width}"
        height="${height}"
        data-insert-url="${src.original}"
      />
    </figure>
  `;
};

export default imageMarkup;
