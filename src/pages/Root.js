import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function RootLayout() {
  const navigation = useNavigation();
  //navigation object has couple of properties, like state which can be idle, loading and in submitting status
  return (
    <>
      <MainNavigation></MainNavigation>
      <main>
        {navigation.state === "loading" && <p>Loading...</p>}
        <Outlet></Outlet>
      </main>
    </>
  );
}
export default RootLayout;
