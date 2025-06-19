import "./style/header.css";
import logo from "../../public/icons/ss.svg";
import { Link } from "react-router-dom";

function Header({ isMainPage }: { isMainPage: boolean }) {
  return (
    <>
      <header className={isMainPage ? "header-main" : "header-other"}>
        <div className="container">
          <div className="header__wrap">
            <Link to="/">
              <div className="header__logoWrap">
                <img src={logo} alt="SS Detailing" className="header__logo" />
                <p className="header__title">
                  <span className="header__title--first">SS</span> <br />
                  <span className="header__title--second">Detailing</span>
                </p>
              </div>
            </Link>
            <div className="header__buttons">
              <Link
                to="/services"
                onClick={() => console.log("Navigating to /services")}
              >
                <button className="header__button">Наши услуги</button>
              </Link>
              <Link
                to="/contacts"
                onClick={() => console.log("Navigating to /contacts")}
              >
                <button className="header__button">Контакты</button>
              </Link>
              <Link
                to="/about"
                onClick={() => console.log("Navigating to /about")}
              >
                <button className="header__button">О компании</button>
              </Link>
              <Link
                to="/apply"
                onClick={() => console.log("Navigating to /apply")}
              >
                <button className="header__button">Записаться</button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
