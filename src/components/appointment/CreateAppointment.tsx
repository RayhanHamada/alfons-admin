import { Col, Create, Typography } from '@pankod/refine';
import { CreateUserDrawer } from './CreateUserDrawer';
import FormDataKlien from './FormDataKlien';
import OrderedServiceList from './OrderedServiceList';
import ServiceDrawer from './ServiceDrawer';

const { Title } = Typography;

export const AppointmentCreate: React.FC = (_props) => {
  return (
    <Create title="Buat Appointment">
      <Col>
        <FormDataKlien />
        <br />
        <Title level={4}>Order Service</Title>
        <OrderedServiceList />
        <br />
        <br />
        <Title level={4}>Pilih Stylish dan Jadwal</Title>
        <ServiceDrawer />
        <CreateUserDrawer />
      </Col>
    </Create>
  );
};
