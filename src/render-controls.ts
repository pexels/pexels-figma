import { html, render } from "../node_modules/lit-html/lit-html";

const renderControls = (result) => {
  // Calculate the next and previous page number
  const pages = (result) => {
    const total_pages = Math.floor(result.total_results / result.per_page);
    const next = Math.min(result.page + 1, total_pages);
    const prev = Math.max(result.page - 1, 1);

    return {
      next,
      prev,
      total_pages,
    };
  };

  const { next, total_pages } = pages(result);

  // If we're not on the last page
  if (next < total_pages) {
    // Render the button to add more
    render(
      html`<button
        id="loadmore"
        data-next="${next}"
        class="button button--secondary"
      >
        Load more&hellip;
      </button>`,
      document.getElementById("controls")
    );
  }
};

export default renderControls;
