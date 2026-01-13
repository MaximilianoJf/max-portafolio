import { Outlet } from "react-router-dom"
import Header from "../components/layout/Header"
import ProjectImageViewer from "../components/project/ProjectImageViewer"
import Footer from "../components/layout/Footer"
import WaveSvg from "../components/ui/WaveSvg"
export default function Layout() {
  return (
    <>
      <div className="relative min-h-screen flex gap-y-5 flex-col">
        <Header />
        <main className="relative z-10 items-center justify-center">

          <div className="flex flex-col mt-12 gap-y-10 max-w-7xl mx-auto sm:px-6 sm:py-6 ">
            <Outlet />
          </div>

          <Footer />

          <ProjectImageViewer />

        </main>

        <div className="fixed bottom-0 left-0 w-full z-0 pointer-events-none">
          <WaveSvg />
        </div>

      </div>

    </>
  )
}
