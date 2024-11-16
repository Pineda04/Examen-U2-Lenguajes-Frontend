import { Footer, JournalsPostList, Navbar } from "../components"

export const JournalsPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <JournalsPostList />
      </div>
      <Footer />
    </div>
  )
}
