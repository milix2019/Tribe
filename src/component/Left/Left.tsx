import { Link } from 'react-router-dom';

const Left = (): JSX.Element => {
  return (
    <div className="leftContainer">
      <div className="fixed">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {' '}
            <Link to="/">Public</Link>
          </li>
          <li>
            {' '}
            <Link to="/">Objectives</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Left;
