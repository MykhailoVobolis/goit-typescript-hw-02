import ImageCard from "../ImageCard/ImageCard";
import { forwardRef, Ref } from "react";
import { Image } from "../../types";
import css from "./ImageGallery.module.css";

interface ForwardRefProps {
  items: Image[];
  openModal: (item: Image) => void;
  perPage: number;
  ref?: React.Ref<HTMLLIElement>;
}

const ImageGallery = forwardRef<HTMLLIElement, ForwardRefProps>(({ items, openModal, perPage }, ref) => {
  const newImageIndex = items.length - perPage;
  // Функція перевірки співпадіння індексу масиву зображень
  // Повертає true або false
  const isNewImage = (index: number) => index === newImageIndex;

  return (
    <ul className={css.gallery}>
      {items.map((item: Image, index: number) => (
        <li className={css.galleryItem} key={item.id} ref={isNewImage(index) ? ref : null}>
          <ImageCard item={item} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
});

// Обов'язкове додавання відображуваного ім'я у визначені компонента на вимогу eslint
ImageGallery.displayName = "ImageGallery";

export default ImageGallery;
