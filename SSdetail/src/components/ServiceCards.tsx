import polish from '../../public/icons/polish_2052360.svg'
import himchistka from '../../public/icons/himchistka.svg'
import predprodazha from '../../public/icons/predprodsha.svg'
import keramika from '../../public/icons/keramika.svg'
import toning from '../../public/icons/tonirovka.svg'
import engineClean from '../../public/icons/engineClean.svg'
import brone from '../../public/icons/broneplenka.svg'
import electrika from '../../public/icons/electrika.svg'
import diagnost from '../../public/icons/diagnost.svg'
import moikaDna from '../../public/icons/moikaDna.svg'

import ServiceCard from './ServiceCard'


function ServiceCards () {
    return (
        <div className='cardss__flexx'>
            <ServiceCard title='Полировка кузова' icon={polish} />
            <ServiceCard title='Химчистка салона' icon={himchistka} />
            <ServiceCard title='Предпродажная подготовка' icon={predprodazha} />
            <ServiceCard title='Керамика' icon={keramika} />
            <ServiceCard title='Тонировка' icon={toning} />
            <ServiceCard title='Мойка двигателя' icon={engineClean} />
            <ServiceCard title='Бронепленка' icon={brone} />
            <ServiceCard title='Диагностика' icon={diagnost} />
            <ServiceCard title='Электрика' icon={electrika} />
            <ServiceCard title='Мойка дна' icon={moikaDna} />
        </div>
       
    )
}
export default ServiceCards