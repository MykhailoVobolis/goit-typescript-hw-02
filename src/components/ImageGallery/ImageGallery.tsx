import ImageCard from "../ImageCard/ImageCard";
import { forwardRef } from "react";
import css from "./ImageGallery.module.css";

const ImageGallery = forwardRef(({ items, openModal, perPage }, ref) => {
  const newImageIndex = items.length - perPage;
  // Функція перевірки співпадіння індексу масиву зображень
  // Повертає true або false
  const isNewImage = (index) => index === newImageIndex;

  return (
    <ul className={css.gallery}>
      {items.map((item, index) => (
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
