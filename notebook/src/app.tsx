import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <div className="app">
        <Navbar />
        <main className="main-content"></main>
      </div>
    </ThemeProvider>
  );
};

export default App;
