import "./style/applicationForm.css";
function ApplicationForm() {
  return (
    <div className="applicationForm__wrap">
      <h2 className="applicationForm__title">Оставить заявку</h2>
      <div className="applicationForm__formWrap">
        <div className="applicationForm__desc">
          <p className="applicationForm__descTxt">
            <span className="applicationForm__descTxtBold">
              Закажите услугу и получите скидку 20%!
            </span>
            <br />
            <br />
            Доверяйте профессионалам — команда SS detailing предлагает
            специальный бонус новым клиентам: при подаче заявки на сайте вы
            автоматически получаете скидку 20% на любой комплекс услуг!
            <br />
            <br />
            ✔️ Аккуратность и профессионализм каждого этапа ухода
            <br />
            <br />
            ✔️ Современные материалы и оборудование премиум-класса
            <br />
            <br />
            ✔️ Гарантия результата и абсолютная безопасность для автомобиля
            <br />
            <br />
            Оформляйте заявку и наслаждайтесь высоким качеством обслуживания по
            выгодной стоимости!
          </p>
        </div>
        <form className="applicationForm__form">
          <input
            type="text"
            placeholder="Ваше имя"
            className="applicationForm__inputTxt"
          />
          <input
            type="text"
            placeholder="Ваша машина"
            className="applicationForm__inputTxt"
          />
          <input
            type="text"
            placeholder="Услуга"
            className="applicationForm__inputTxt"
          />
          <input
            type="email"
            placeholder="Ваша электронная почта"
            className="applicationForm__inputTxt"
          />
          <input
            type="date"
            name=""
            id=""
            placeholder="Выбор даты"
            className="applicationForm__inputDate"
          />
          <div className="applicationForm__formBtn">
            <input
              type="submit"
              value="Оставить заявку"
              className="applicationForm__inputSubmit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
export default ApplicationForm;
