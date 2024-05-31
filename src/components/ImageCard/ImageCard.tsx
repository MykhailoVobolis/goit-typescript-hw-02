import css from "./ImageCard.module.css";

export default function ImageCard({ item, openModal }) {
  return <img className={css.galleryImage} onClick={() => openModal(item)} src={item.urls.small} alt={item.alt} />;
}
