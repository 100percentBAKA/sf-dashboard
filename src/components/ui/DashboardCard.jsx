import PropTypes from "prop-types";

const DashboardCard = ({ category, number, svg }) => {
  return (
    <div className="bg-white shadow-lg p-6 flex items-center justify-between rounded-lg w-[300px] 2xl:w-[380px]">
      <div className="flex flex-col space-y-2">
        <div className="text-[18px] font-semibold">{category}</div>
        <div className="text-[18px] font-semibold">{number}</div>
      </div>

      <div className="p-3 bg-gradient-to-tr from-[#FF6B6B] to-primary rounded-lg">
        {svg}
      </div>
    </div>
  );
};

DashboardCard.propTypes = {
  category: PropTypes.string,
  number: PropTypes.number,
  svg: PropTypes.node,
};

export default DashboardCard;
