import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  nextPage: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ nextPage }) => {
  return (
    <button className={css.loadBtn} onClick={() => nextPage()}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
