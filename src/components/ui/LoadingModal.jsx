import PropTypes from "prop-types";

export const LoadingModal = ({ pending }) => {
  if (!pending) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-end z-40">
      <div className="md:ml-[280px] xl:ml-[350px] flex-1 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg z-50 text-white"></div>
      </div>
    </div>
  );
};

LoadingModal.propTypes = {
  pending: PropTypes.bool.isRequired,
};

export default LoadingModal;
