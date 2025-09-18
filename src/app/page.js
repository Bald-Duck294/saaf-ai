import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Head from "next/head";
import Home from "./pages/Home";

export default function Page() {
  return (
    <>
      {/* <div className="text-center max-w-[100rem] mx-auto my-0 bg-amber-300 flex max-h-lvh h-[90vh]">
        <div className=" w-full h-full max-w-[25rem] bg-amber-500">
          <Sidebar />
        </div>

        <div className=" w-full h-full max-w-[75rem]">
          <Header />
          <WashroomsList />
        </div>
      </div>
      <Footer /> */}
      <Home/>
    </>
  );
}
