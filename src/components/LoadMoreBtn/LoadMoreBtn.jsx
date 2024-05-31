import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ nextPage }) {
  return (
    <button className={css.loadBtn} onClick={() => nextPage()}>
      Load more
    </button>
  );
}
