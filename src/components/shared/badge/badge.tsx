import './badge.scss';

interface IBadge {
  text: string;
}

export default function Badge({text}: IBadge) {

  const hexColorCalculation = () => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  }

  const contrastTextColor = () => {
    const hex = hexColorCalculation();
    const r = parseInt(hex.substr(1,2),16);
    const g = parseInt(hex.substr(3,2),16);
    const b = parseInt(hex.substr(5,2),16);
    const yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'tw-text-black' : 'tw-text-white';
  }

  return (
    <div className={`badge ${contrastTextColor()}`} style={{backgroundColor: hexColorCalculation()}}>
      {text}
    </div>
  );
}
