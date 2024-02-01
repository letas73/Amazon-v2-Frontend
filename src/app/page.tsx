import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import Home from "./Home";

export default function HomePage() {
  return (
    <div>
      <Header />
      <div className='flex'>
        <Sidebar />
        <Home />
      </div>
    </div>
  )
}
