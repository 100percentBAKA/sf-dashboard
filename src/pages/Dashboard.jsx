import DashboardCard from "../components/ui/DashboardCard";
import CategoriesIcon from "../assets/images/categoriesIcon.svg";

const Dashboard = () => {
  return (
    <div className="bg-base-100 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
      <DashboardCard
        category="categories"
        number={26}
        svg={<img src={CategoriesIcon} />}
      />

      <DashboardCard
        category="categories"
        number={26}
        svg={<img src={CategoriesIcon} />}
      />

      <DashboardCard
        category="categories"
        number={26}
        svg={<img src={CategoriesIcon} />}
      />

      <DashboardCard
        category="categories"
        number={26}
        svg={<img src={CategoriesIcon} />}
      />
    </div>
  );
};

export default Dashboard;
