import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
const Root = () => {
  return (
    <>
      <MainNavigation>
        <main>
          <Outlet></Outlet>
        </main>
      </MainNavigation>
    </>
  );
};
export default Root;
