import React from "react";
import PropTypes from "prop-types";
import { Circles } from "react-loader-spinner";
import styles from "./Loader.module.css";

const Loader = () => (
  <div className={styles.loader}>
    <Circles color="#00BFFF" height={80} width={80} />
  </div>
);

Loader.propTypes = {
  color: PropTypes.string,
};

export default Loader;
