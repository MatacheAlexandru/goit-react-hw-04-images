import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import styles from "./App.module.css";

const API_KEY = "24587351-f51ecbfdd1a1ed72c58205b43";

const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [alt, setAlt] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchImages = async () => {
      setIsLoading(true);
      setNoResults(false);

      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        if (response.data.hits.length === 0) {
          setNoResults(true);
        }
        setImages((prevImages) => [...prevImages, ...response.data.hits]);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery, page]);

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const toggleModal = (largeImageURL = "", alt = "") => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
    setAlt(alt);
  };

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={handleSearchSubmit} />
      {noResults && <p>No images found. Try a different search term.</p>}
      <ImageGallery images={images} onImageClick={toggleModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <Button onClick={loadMoreImages} />}
      {showModal && (
        <Modal onClose={toggleModal} largeImageURL={largeImageURL} alt={alt} />
      )}
    </div>
  );
};

App.propTypes = {
  images: PropTypes.array,
  searchQuery: PropTypes.string,
  page: PropTypes.number,
  isLoading: PropTypes.bool,
  showModal: PropTypes.bool,
  largeImageURL: PropTypes.string,
  alt: PropTypes.string,
};

export default App;
