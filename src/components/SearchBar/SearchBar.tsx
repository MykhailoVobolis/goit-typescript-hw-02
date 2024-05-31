import css from "./SearchBar.module.css";
import { IoIosSearch } from "react-icons/io";
import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";

export default function SearchBar({ onSearch }) {
  const handleSubmit = (value, actions) => {
    !value.search
      ? toast("Please enter search term!", {
          style: {
            color: "#ffffff",
            backgroundColor: "#FF8C00",
          },
        })
      : onSearch(value.search);

    actions.resetForm();
  };

  return (
    <header className={css.headerContainer}>
      <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
        <Form className={css.searchForm}>
          <Field
            className={css.searchInput}
            autoComplete="off"
            autoFocus
            type="text"
            name="search"
            placeholder="Search images and photos"
          />
          <button className={css.searchBtn} type="submit">
            <IoIosSearch className={css.searchIcon} />
          </button>
        </Form>
      </Formik>
    </header>
  );
}
