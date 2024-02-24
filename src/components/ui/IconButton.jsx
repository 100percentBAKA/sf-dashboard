import PropTypes from "prop-types";
import styles from "../../assets/styles/IconButton.module.css";

const IconButton = ({ children, hidden, ...props }) => {
  return (
    <button {...props} className={hidden ? styles["hide"] : styles["icon-btn"]}>
      {children}
    </button>
  );
};

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  hidden: PropTypes.bool,
};

export default IconButton;
