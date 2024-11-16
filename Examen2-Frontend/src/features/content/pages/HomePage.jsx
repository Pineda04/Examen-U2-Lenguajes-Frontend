import { Footer, MainContent, Navbar } from "../components";

export const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <MainContent />
      </div>
      <Footer />
    </div>
  );
};
