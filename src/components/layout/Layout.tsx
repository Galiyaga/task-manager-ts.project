import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        <div className="footer__container">
          <div className="footer__logo">
            <img src="/footerLogo.svg" alt="Логотип" />
          </div>
          <div className="footer__info">
            <div className="adress">
              API предоставлено командой Incubator
            </div>
            <div className="copyright">Copyright. 2022</div>
          </div>
        </div>
      </footer>
    </>
  );
}
