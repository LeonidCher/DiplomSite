import headerVideo from "../../public/video/SSHeaderVideo.MOV";
import "./style/mainContent.css";
import ServiceCards from "./ServiceCards";
import Categories from "./Categories";
import sliderImg1 from "../../public/image/sliderImage1.png";
import Feedback from "./Feedback";
import ApplicationForm from "./ApplicationForm";
import ReviewForm from "./ReviewForm"; // Добавляем форму отзывов

function MainContent() {
  return (
    <>
      <div className="headerVideo">
        <video
          className="headerVideo__video"
          src={headerVideo}
          autoPlay
          muted
          loop
        ></video>
        <div className="container">
          <div className="headerVideo__textblock">
            <p className="headerVideo__preTitle">
              Профессиональный детейлинг, безупречная тонировка <b>И</b>
            </p>
            <h1 className="headerVideo__title">уход за кузовом автомобиля</h1>
            <p className="headerVideo__desc">
              от качественной мойки{" "}
              <span className="headerVideo__desc_red">
                до покрытия пленкой или керамикой всего авто
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="service">
        <div className="container">
          <h2 className="service__title">Наши услуги</h2>
          <p className="service__description">
            Наш детейлинг готов вам предложить самый высокий класс обслуживания,
            вне зависимости сложности работ. Мы работаем с 2020 года, за это
            время мы смогли достичь высоты качества, чтобы радовать наших
            клиентов.
          </p>
          <div className="serviceList">
            <ServiceCards></ServiceCards>
          </div>
        </div>
      </div>
      <div className="categories">
        <Categories></Categories>
      </div>
      <div className="works">
        <h2 className="works__title">Наши работы</h2>
        <div className="works__slider">
          <div className="works__slider-line">
            <img src={sliderImg1} alt="" className="works__slider-item" />
          </div>
        </div>
        <div className="container">
          <div className="works__textBlock">
            <h2 className="works__subTitle">
              Искусство детейлинга{" "}
              <span className="works__title_red">в каждой детали</span>
            </h2>
            <p className="works__description">
              Каждая деталь — это искусство, а каждый проект — наша гордость.
              Взгляните на работы, которые говорят сами за себя: безупречная
              полировка, защита кузова на годы вперед и индивидуальный подход к
              каждому клиенту. <br />
              <br />
              Доверьтесь профессионалам, которые знают, как подчеркнуть
              совершенство вашего авто.
            </p>
            <button className="works__button">Узнать больше</button>
          </div>
        </div>
        <Feedback></Feedback>
        {/* <ReviewForm /> Добавляем форму для отзывов */}
        <div className="applicationForm">
          <div className="container">
            <ApplicationForm></ApplicationForm>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainContent;