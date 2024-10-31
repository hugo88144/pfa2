import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";
import SideBar from "./SideBar";
import { useEffect } from "react";
import {
  fetchOverviewData,
  selectOverviewStatus,
} from "../Pages/overview/overviewSlice";
import { useDispatch, useSelector } from "react-redux";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const status = useSelector(selectOverviewStatus);
  const error = useSelector((state) => state.overview.error);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOverviewData());
    }
  }, [status, dispatch]);
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-screen h-screen grid bg-[#F8F4F0] grid-cols-[18%,82%] max-1100:flex max-1100:flex-col-reverse  justify-between ">
      <SideBar />
      {isLoading && <Loader />}

      <main className="overflow-y-auto  ">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
