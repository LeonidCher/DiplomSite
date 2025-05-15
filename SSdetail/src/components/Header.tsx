import "./style/header.css";
import logo from "../../public/icons/ss.svg";
function Header() {
  return (
    <>
      <header>
        <div className="container">
        <div className="header__wrap">
          <div className="header__logoWrap">
            <img src={logo} alt="" className="header__logo" />
            <p className="header__title">
              <span className="header__title--first">SS</span> <br></br>{" "}
              <span className="header__title--second">Detailing</span>
            </p>
          </div>
          <div className="header__buttons">
            <a href="">
              <button className="header__button">Наши работы</button>
            </a>
            <a href="">
              <button className="header__button">Контакты</button>
            </a>
            <a href="">
              <button className="header__button">Записаться</button>
            </a>
          </div>
        </div>
        </div>
      </header>
    </>
  );
}
export default Header;
