import { Footer, Navbar, AccountsPostList } from "../components";

export const AccountsPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <AccountsPostList />
      </div>
      <Footer />
    </div>
  );
};
