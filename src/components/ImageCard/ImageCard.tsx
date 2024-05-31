import { Image } from "../../types";
import css from "./ImageCard.module.css";

interface ImageCardProps {
  item: Image;
  openModal: (item: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ item, openModal }) => {
  return (
    <img
      className={css.galleryImage}
      onClick={() => openModal(item)}
      src={item.urls.small}
      alt={item.alt_description}
    />
  );
};

export default ImageCard;
