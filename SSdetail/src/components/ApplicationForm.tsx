import { useForm, useWatch } from 'react-hook-form';
import "./style/applicationForm.css";
import CustomCalendar from './CustomCalendar';

interface FormData {
  name: string;
  carModel: string;
  service: string;
  email: string;
  dateTime: string;
}

function ApplicationForm() {
  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm<FormData>();
  const dateTime = useWatch({ control, name: 'dateTime', defaultValue: '' });

  const onSubmit = async (data: FormData) => {
    console.log('Отправляемые данные:', data);
    try {
      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log('Ответ сервера:', result);
      if (response.ok) {
        alert('Заявка успешно отправлена!');
      } else {
        alert(`Ошибка: ${result.message || 'Проверь консоль'}`);
      }
    } catch (err) {
      console.error('Ошибка:', err);
      alert('Ошибка сервера, проверь консоль');
    }
  };

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
        <form className="applicationForm__form" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name", { required: "Имя обязательно" })}
            placeholder="Ваше имя"
            className="applicationForm__inputTxt"
          />
          {errors.name && <p className="error">{errors.name.message}</p>}

          <input
            {...register("carModel", { required: "Марка и модель автомобиля обязательны" })}
            placeholder="Ваша марка и модель автомобиля"
            className="applicationForm__inputTxt"
          />
          {errors.carModel && <p className="error">{errors.carModel.message}</p>}

          <input
            {...register("service", { required: "Услуга обязательна" })}
            placeholder="Услуга"
            className="applicationForm__inputTxt"
          />
          {errors.service && <p className="error">{errors.service.message}</p>}

          <input
            {...register("email", {
              required: "Электронная почта обязательна",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Неверный формат email",
              },
            })}
            type="email"
            placeholder="Ваша электронная почта"
            className="applicationForm__inputTxt"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <div onClick={(e) => e.preventDefault()}>
            <CustomCalendar onSelect={(dateTime) => setValue('dateTime', dateTime, { shouldValidate: false })} />
          </div>
          {errors.dateTime && <p className="error">{errors.dateTime.message}</p>}

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