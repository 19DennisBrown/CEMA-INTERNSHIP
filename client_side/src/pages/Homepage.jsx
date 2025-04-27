import { useRef, useState} from "react";
import ViewProgram from "./program/ViewProgram";
import ViewPatients from "./patient/ViewPatients";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar"; 

const HomePage = () => {
  

  // Sidebar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Refs for scrolling
  const headerRef = useRef(null);
  const profileRef = useRef(null);
  const programRef = useRef(null);
  const patientRef = useRef(null);

  // Scroll to section function
  const scrollToSection = (section) => {
    switch (section) {
      case "header":
        headerRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "profile":
        profileRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "programs":
        programRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "patients":
        patientRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar
        scrollToSection={scrollToSection}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div
        className={`flex-1 p-2 overflow-y-auto transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "sm:ml-64" : "sm:ml-0"
        }`}
      >
        {/* Header Section */}
        <section className="w-full grid grid-cols-10 gap-2 mt-0" ref={headerRef}>
          <div className="col-span-9">
            <Header />
          </div>
          <div className="grid col-span-1 place-items-center h-14 w-14 bg-black rounded-3xl text-white">
            Profile
          </div>
        </section>

        {/* Profile and Program Section */}
        <section className="mt-12 p-1 sm:p-6 w-full mx-auto bg-white  rounded-lg" ref={programRef}>
        

          <section className="grid sm:grid-cols-1 grid-cols-1 gap-4" ref={programRef}>
              <ViewProgram />
          </section>

          {/* Patients Section */}
          <div className="w-full overflow-x-scroll sm:overflow-x-hidden h-96 mt-8" ref={patientRef}>
            <ViewPatients />
          </div>

          
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
