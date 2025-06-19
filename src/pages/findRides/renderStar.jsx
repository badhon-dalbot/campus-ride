import { Star } from 'lucide-react';

const StarIcon = ({ keyProp, fillPercentage }) => {
  const isPartial = fillPercentage > 0 && fillPercentage < 100;

  if (isPartial) {
    return (
      <div key={keyProp} className="relative inline-block">
        <Star size={14} className="text-gray-300" fill="none" />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${fillPercentage}%` }}
        >
          <Star size={14} className="text-[#E04F5F]" fill="#E04F5F" />
        </div>
      </div>
    );
  }

  const isFilled = fillPercentage === 100;

  return (
    <Star
      key={keyProp}
      size={14}
      className={isFilled ? 'text-[#E04F5F]' : 'text-gray-300'}
      fill={isFilled ? '#E04F5F' : 'none'}
    />
  );
};

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasPartial = rating % 1 !== 0;
  const partialPercentage = hasPartial ? Math.round((rating % 1) * 100) : 0;
  const totalStars = 5;

  for (let i = 0; i < totalStars; i++) {
    if (i < fullStars) {
      stars.push(<StarIcon key={i} keyProp={`full-${i}`} fillPercentage={100} />);
    } else if (i === fullStars && hasPartial) {
      stars.push(<StarIcon key={i} keyProp={`partial-${i}`} fillPercentage={partialPercentage} />);
    } else {
      stars.push(<StarIcon key={i} keyProp={`empty-${i}`} fillPercentage={0} />);
    }
  }

  return stars;
};

export default renderStars;
export { renderStars };
