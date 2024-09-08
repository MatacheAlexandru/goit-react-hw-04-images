import React from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import styles from "./ImageGallery.module.css";
import { nanoid } from "nanoid";

const ImageGallery = ({ images, onImageClick }) => (
  <ul className={styles.gallery}>
    {images.map(({ webformatURL, largeImageURL, tags }) => (
      <ImageGalleryItem
        key={nanoid()}
        webformatURL={webformatURL}
        largeImageURL={largeImageURL}
        tags={tags}
        onClick={onImageClick}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
