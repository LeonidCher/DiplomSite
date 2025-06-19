import polish from '../../public/icons/polish_2052360.svg';
import himchistka from '../../public/icons/himchistka.svg';
import predprodazha from '../../public/icons/predprodsha.svg';
import keramika from '../../public/icons/keramika.svg';
import toning from '../../public/icons/tonirovka.svg';
import engineClean from '../../public/icons/engineClean.svg';
import brone from '../../public/icons/broneplenka.svg';
import electrika from '../../public/icons/electrika.svg';
import diagnost from '../../public/icons/diagnost.svg';
import moikaDna from '../../public/icons/moikaDna.svg';
import ServiceCard from './ServiceCard';

interface Service {
  id: number;
  category?: string;
  name: string;
  description: string;
  materials: string;
  equipment: string;
  price: number;
}

const ServiceCards: React.FC<{ services: Service[] }> = ({ services }) => {
  const iconMap: Record<string, string> = {
    polishing: polish,
    cleaning: himchistka,
    predprodazha: predprodazha,
    coating: keramika,
    toning: toning,
    engineClean: engineClean,
    brone: brone,
    electrika: electrika,
    diagnost: diagnost,
    moikaDna: moikaDna,
  };

  return (
    <div className="cardss__flexx">
      {services.map(service => (
        <ServiceCard
          key={service.id}
          title={service.name}
          icon={iconMap[service.category || ''] || predprodazha} // Используем предпродажную иконку как запасную
        />
      ))}
    </div>
  );
};

export default ServiceCards;