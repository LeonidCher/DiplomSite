import keramika from "../../public/image/keramica.png"
import polish from "../../public/image/polish.png"
import himcitka from "../../public/image/himcistka.png"
import tonirovka from "../../public/image/tonirovka.png"
import './style/categories.css'
function Categories() {
  return (
    <>
      <div className="categories__category categories__category_black">
        <div className="categories__textBlock categories__textBlock_marginLeft ">
          <h3 className="categories__title">Керамика <br></br> авто</h3>
          <p className="categories__description">
            Керамика для авто — нанопокрытие, защищающее кузов от царапин, грязи
            и УФ-лучей. Дарит зеркальный блеск, облегчает уход и сохраняет
            идеальный вид на годы. Это надежная защита и безупречный внешний вид
            вашего автомобиля!
          </p>
        </div>
        <img src={keramika} alt="" className="categories__image" />
      </div>
      <div className="categories__category categories__category_white">
        <img src={polish} alt="" className="categories__image" />
        <div className="categories__textBlock categories__textBlock_marginRight">
          <h3 className="categories__title">Полировка <br></br>кузова</h3>
          <p className="categories__description">
            Полировка кузова— профессиональное восстановление блеска и гладкости
            лакокрасочного покрытия. Удаляет царапины, swirl- marks и мелкие
            дефекты, возвращая автомобилю идеальный вид. Это финишный штрих,
            который делает ваш авто безупречным!
          </p>
        </div>
      </div>
      <div className="categories__category categories__category_black">
        <div className="categories__textBlock categories__textBlock_marginLeft">
          <h3 className="categories__title">Химчистка <br></br> салона</h3>
          <p className="categories__description">
            Химчистка салона— глубокая очистка всех поверхностей автомобиля от
            загрязнений, пятен и запахов. Специальные средства и оборудование
            бережно удаляют пыль, жир и следы эксплуатации, возвращая салону
            свежесть и ухоженный вид. Это обновление, которое делает поездки
            комфортными и приятными!
          </p>
        </div>
        <img src={himcitka} alt="" className="categories__image" />
      </div>
      <div className="categories__category categories__category_white">
        <img src={tonirovka} alt="" className="categories__image" />
        <div className="categories__textBlock categories__textBlock_marginRight">
          <h3 className="categories__title">ТОНировка</h3>
          <p className="categories__description">
            Тонировка авто — защита и стиль в одном решении. Специальная пленка
            затемняет стекла, блокирует УФ-лучи, снижает нагрев салона и
            повышает конфиденциальность. Это не только эстетика, но и комфорт в
            любую погоду!
          </p>
        </div>
      </div>
    </>
  );
}
export default Categories;
