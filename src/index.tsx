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

export default function AppRoute() {
  const isLogged = useSelector(
    (state: AppRootStateType) => state.auth.auth.isLogged
  );

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<Navigate to={isLogged ? "/todolists" : "/login"} />}
        />
        <Route
          index
          path="/login"
          element={isLogged ? <Navigate to="/todolists" /> : <Login />}
        />
        <Route
          path="/todolists"
          element={isLogged ? <AppWithRedux /> : <Navigate to="/login" />}
        />
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
