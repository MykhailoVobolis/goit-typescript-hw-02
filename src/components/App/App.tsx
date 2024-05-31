import SearchBar from "../SearchBar/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ImageModal from "../ImageModal/ImageModal";
import "./App.css";
import { fetchImagesByWord } from "../../unsplash-api";
import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Image } from "../../types";

export const perPage: number = 18; // Кількість зображень що повертаються з API за один запит

export default function App() {
  // Оголошуємо стани
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loaderBtn, setLoaderBtn] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [inputValue, setInputValue] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [lageImage, setLageImage] = useState<Image | null>(null);

  // Реалізація плавного скролу при додаванні нових зображень
  const firstNewImageRef = useRef<HTMLLIElement | null>(null);

  useEffect((): void => {
    // firstNewImageRef.current && firstNewImageRef.current.scrollIntoView({ behavior: "smooth" });
    // Використання оператора опціональної послідовності ?. замість &&
    firstNewImageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [images]);

  const changeValue = (value: string): void => {
    setImages([]);
    setLoaderBtn(false);
    setInputValue(value);
    setPage(1); // Скиданя номеру сторінки результатів при новому пошуку
  };

  const nextPage = (): void => {
    setLoaderBtn(false);
    setLoading(true);
    setPage(page + 1);
  };

  const openModal = (item: Image): void => {
    setModalIsOpen(true);
    setLageImage(item);
  };
  const closeModal = (): void => {
    setModalIsOpen(false);
  };

  useEffect((): void => {
    // Оголошуємо асинхронну функцію сабміту форми
    async function handleSearch() {
      if (inputValue === "") return; // Пропускаємо ефект як що input порожній
      try {
        setError(false);
        setLoading(true);
        // Використовуємо HTTP-функцію
        const data = await fetchImagesByWord(inputValue, page);
        // Перевірка наявності зображень відповідних запиту
        if (!data.results.length) {
          toast("Sorry, there are no images matching your search query. Please try again!", {
            style: {
              color: "#ffffff",
              backgroundColor: "#ef4040",
            },
          });
          return;
        }
        // Записуємо дані в стан
        setImages((prevImages: Image[]) => {
          return [...prevImages, ...data.results];
        });
        setLoaderBtn(true);
        // Перевірка, чи це остання завантажена сторінка?
        if (page === data.total_pages) {
          //  Повідомлення про досягнення кінця результатів запиту
          toast("We're sorry, but you've reached the end of search results.", {
            style: {
              color: "#ffffff",
              backgroundColor: "#0099FF",
            },
          });
          setLoaderBtn(false);
        }
      } catch (error) {
        // У разі помилки від API Встановлюємо стан error в true
        setError(true);
      } finally {
        // Встановлюємо індикатор в false після запиту
        setLoading(false);
      }
    }
    handleSearch();
  }, [inputValue, page]);

  return (
    <div className="mainContainer">
      <SearchBar onSearch={changeValue} />
      {error && <ErrorMessage />}
      <>
        {images.length > 0 && (
          <ImageGallery ref={firstNewImageRef} items={images} openModal={openModal} perPage={perPage} />
        )}
      </>
      {loading && <Loader loading={loading} />}
      {loaderBtn && <LoadMoreBtn nextPage={nextPage} />}
      {modalIsOpen && lageImage && <ImageModal isOpen={modalIsOpen} onClose={closeModal} lageImage={lageImage} />}
      <Toaster position="top-right" />
    </div>
  );
}
