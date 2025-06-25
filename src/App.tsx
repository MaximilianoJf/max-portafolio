import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import RouteWatcher from "./components/RouteWatcher";
import ProjectImageViewer from "./components/project/ProjectImageViewer";


const App: React.FC = () => {
  return (
    <Router>
      <RouteWatcher />
      <div className="app">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-6 space-y-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proyectos" element={<Projects />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <ProjectImageViewer/>
        <Footer />
      </div>
    
    </Router>
  );
};

export default App;
