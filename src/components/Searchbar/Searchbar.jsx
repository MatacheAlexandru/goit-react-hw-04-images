import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Searchbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");
  const typingTimeoutRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSubmit = (query) => {
    if (query.trim() === "") return;
    onSubmit(query);
    setQuery("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(query);
  };

  useEffect(() => {
    if (query.trim() === "") return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      handleSubmit(query);
    }, 3000);

    return () => {
      clearTimeout(typingTimeoutRef.current);
    };
  }, [query]);

  return (
    <header className={styles.searchbar}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <div className={styles.searchWrapper}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleChange}
          />
        </div>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
