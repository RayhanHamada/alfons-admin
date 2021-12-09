import logo from '@public/logo.svg';
import Image from 'next/image';

export const Title: React.FC = (_props) => {
  return (
    <div style={{ backgroundColor: 'white' }}>
      <Image src={logo} alt="Alfons Salon" height={230} />
    </div>
  );
};
