import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import AppWithRedux from "./components/AppWithRedux";
import { Provider } from "react-redux";
import { AppRootStateType, store } from "./state/store";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./components/login/Login";
import { Layout } from "./components/layout/Layout";
import { useSelector } from "react-redux";
import { GlobalErrorDialog } from "./components/ErrorDialog";
import { Loading } from "./components/Loading";
import { About } from "./components/menu/About";
import { UserDetails } from "./components/menu/UserDetails";
import { LoginInstructions } from "./components/menu/LoginInstructions";
import { Help } from "./components/menu/Help";

export default function AppRoute() {
  const isLogged = useSelector(
    (state: AppRootStateType) => state.auth.auth.isLogged
  );

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to={isLogged ? "/todolists" : "/login"} />} />
        
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        
        {isLogged ? (
          <>
            <Route path="/todolists" element={<AppWithRedux />} />
            <Route path="/user-details" element={<UserDetails />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/login/instructions" element={<LoginInstructions />} />
          </>
        )}
      </Route>
    </Routes>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <Loading />
    <BrowserRouter>
      <GlobalErrorDialog />
      <AppRoute />
    </BrowserRouter>
  </Provider>
);
reportWebVitals();
