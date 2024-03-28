import DashboardCard from "../components/ui/DashboardCard";
import CategoriesIcon from "../assets/images/categoriesIcon.svg";
import SubCategoriesIcon from "../assets/images/SubCategoriesIcon.svg";
import SubToSubIcon from "../assets/images/SubToSubIcon.svg";
import FilesIcon from "../assets/images/FilesIcon.svg";
import UsersIcon from "../assets/images/UsersIcon.svg";
import PaymentIcon from "../assets/images/PaymentIcon.svg";
import LoadingModal from "../components/ui/LoadingModal";
import ErrorDisplay from "../components/ui/ErrorDisplay";
import {
  useGetCatsQuery,
  useGetSubCatsQuery,
  useGetSubSubCatsQuery,
} from "../services/queries";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const catQuery = useGetCatsQuery();
  const subCatQuery = useGetSubCatsQuery();
  const subSubCatQuery = useGetSubSubCatsQuery();

  useEffect(() => {
    if (catQuery.data) {
      console.log(`category data length: ${catQuery.data?.data.length}`);
    }
  }, [catQuery.data]);

  // Check for any loading state
  const isLoading =
    catQuery.isFetching || subCatQuery.isFetching || subSubCatQuery.isFetching;

  // Check for any error state
  const error = catQuery.error || subCatQuery.error || subSubCatQuery.error;
  if (error) {
    toast.error("An error occurred while fetching data.");
    return <ErrorDisplay />;
  }

  // Proceed with rendering if there's no loading or error state
  return (
    <>
      {isLoading ? (
        <LoadingModal pending={isLoading} />
      ) : (
        <div className="bg-base-100 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
          <DashboardCard
            category="Categories"
            number={catQuery.data?.data.length}
            svg={<img src={CategoriesIcon} alt="Categories" />}
          />

          <DashboardCard
            category="Sub Categories"
            number={subCatQuery.data?.data.length}
            svg={<img src={SubCategoriesIcon} alt="Sub Categories" />}
          />

          <DashboardCard
            category="SubToSub Category"
            number={subSubCatQuery.data?.data.length}
            svg={<img src={SubToSubIcon} alt="SubToSub Category" />}
          />

          {/* Assuming these numbers are placeholders until similar queries are implemented */}
          <DashboardCard
            category="Files"
            number={26}
            svg={<img src={FilesIcon} alt="Files" />}
          />
          <DashboardCard
            category="Users"
            number={26}
            svg={<img src={UsersIcon} alt="Users" />}
          />
          <DashboardCard
            category="Payments"
            number={26}
            svg={<img src={PaymentIcon} alt="Payments" />}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
