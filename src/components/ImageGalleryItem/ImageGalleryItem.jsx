import React from "react";
import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, onClick }) => (
  <li
    className={styles.galleryItem}
    onClick={() => onClick(largeImageURL, tags)}
  >
    <img src={webformatURL} alt={tags} className={styles.image} />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
