import logo from '@public/logo.svg';
import Image from 'next/image';

const Title: React.FC = (_props) => {
  return (
    <div style={{ backgroundColor: 'white' }}>
      <Image src={logo} alt="Alfons Salon" height={230} />
    </div>
  );
};

export default Title;
