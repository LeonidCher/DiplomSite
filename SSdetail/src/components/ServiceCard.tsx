import React from 'react';
import './style/serviceCard.css';

interface ServiceCardProps {
  title: string;
  icon: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title }) => {
  return (
    <a href="#"> 
      <div className="serviceCard">
        <div className="serviceCard_background">
        <img src={icon} className="serviceCard__icon" alt={title} /> 
        </div>
        <h3 className="serviceCard__title">{title}</h3>
      </div>
    </a>
  );
};

export default ServiceCard;