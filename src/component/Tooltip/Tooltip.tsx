import InfoFilled from '../../assets/info_filled.svg';

interface Props {
  text: string;
}

const Tooltip = ({ text }: Props) => {
  return (
    <div className="tooltip">
      <img src={InfoFilled} alt="img" />
      <span className="tooltiptext">
        {text}
        {/* Here you can find the created questions and their answers */}
      </span>
    </div>
  );
};

export default Tooltip;
