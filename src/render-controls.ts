import { html, render } from "../node_modules/lit-html/lit-html";

const renderControls = (result) => {
  // Calculate the next and previous page number
  const pages = (total_results, per_page, page) => {
    const total_pages = total_results ? Math.ceil(total_results / per_page) : 1;
    const next = Math.min(page + 1, total_pages);
    const prev = Math.max(page - 1, 1);

    return {
      total_pages,
      prev,
      next,
    };
  };

  const { next, total_pages } = pages(
    result.total_results,
    result.per_page,
    result.page
  );

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
  } else if (total_pages > 1) {
    render(
      html`<p class="type type--pos-small-normal">
        There are no more results.
      </p>`,
      document.getElementById("controls")
    );
  }
};

export default renderControls;
