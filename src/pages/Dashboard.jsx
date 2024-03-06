import DashboardCard from "../components/ui/DashboardCard";
import CategoriesIcon from "../assets/images/categoriesIcon.svg";
import SubCategoriesIcon from "../assets/images/SubCategoriesIcon.svg";
import SubToSubIcon from "../assets/images/SubToSubIcon.svg";
import FilesIcon from "../assets/images/FilesIcon.svg";
import UsersIcon from "../assets/images/UsersIcon.svg";
import PaymentIcon from "../assets/images/PaymentIcon.svg";

const Dashboard = () => {
  return (
    <div className="bg-base-100 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
      <DashboardCard
        category="categories"
        number={26}
        svg={<img src={CategoriesIcon} />}
      />

      <DashboardCard
        category="Sub Categories"
        number={26}
        svg={<img src={SubCategoriesIcon} />}
      />

      <DashboardCard
        category="SubToSub category"
        number={26}
        svg={<img src={SubToSubIcon} />}
      />

      <DashboardCard
        category="Files"
        number={26}
        svg={<img src={FilesIcon} />}
      />
      <DashboardCard
        category="Users"
        number={26}
        svg={<img src={UsersIcon} />}
      />
      <DashboardCard
        category="Payments"
        number={26}
        svg={<img src={PaymentIcon} />}
      />
    </div>
  );
};

export default Dashboard;
