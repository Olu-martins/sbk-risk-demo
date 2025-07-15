import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Router from "@routes/index.tsx";
import { Provider } from "@components/ui/provider";
import { GlobalProvider } from "@contexts/GlobalContext";
import RiskAssesmentDetails from "@pages/Dashboard/RiskAssesment/components";

function App() {
  return (
    <Provider>
      <GlobalProvider>
        <BrowserRouter>
          <Toaster containerStyle={{ fontSize: "1.4rem" }} />
          <Routes>
            <Route
              path="/risk-assesment/details"
              element={<RiskAssesmentDetails />}
            />
            <Route path="/*" element={<Router />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </Provider>
  );
}

export default App;
