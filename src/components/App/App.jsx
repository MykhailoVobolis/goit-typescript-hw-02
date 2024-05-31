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

export const perPage = 18; // Кількість зображень що повертаються з API за один запит

export default function App() {
  // Оголошуємо стани
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaderBtn, setLoaderBtn] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [lageImage, setLageImage] = useState("");

  // Реалізація плавного скролу при додаванні нових зображень
  const firstNewImageRef = useRef();

  useEffect(() => {
    // firstNewImageRef.current && firstNewImageRef.current.scrollIntoView({ behavior: "smooth" });
    // Використання оператора опціональної послідовності ?. замість &&
    firstNewImageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [images]);

  const changeValue = (value) => {
    setImages([]);
    setLoaderBtn(false);
    setInputValue(value);
    setPage(1); // Скиданя номеру сторінки результатів при новому пошуку
  };

  const nextPage = () => {
    setLoaderBtn(false);
    setLoading(true);
    setPage(page + 1);
  };

  const openModal = (item) => {
    setModalIsOpen(true);
    setLageImage(item);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
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
        setImages((prevImages) => {
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
      {error && <ErrorMessage error={error} />}
      <>
        {images.length > 0 && (
          <ImageGallery ref={firstNewImageRef} items={images} openModal={openModal} perPage={perPage} />
        )}
      </>
      {loading && <Loader loading={loading} />}
      {loaderBtn && <LoadMoreBtn nextPage={nextPage} />}
      {modalIsOpen && <ImageModal isOpen={modalIsOpen} onClose={closeModal} lageImage={lageImage} />}
      <Toaster position="top-right" />
    </div>
  );
}
