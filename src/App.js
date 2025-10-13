import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";

function LayoutController() {
  const location = useLocation();

  // All routes that should NOT include header/footer
  const hideLayout = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideLayout && <Header />}

      <Container
        fluid={hideLayout} // full width for admin pages
        style={{
          marginTop: hideLayout ? 0 : "80px",
          padding: hideLayout ? 0 : undefined,
        }}
      >
        <AppRoutes />
      </Container>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutController />
    </Router>
  );
}

export default App;
