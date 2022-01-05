import { Col, Create, Typography } from '@pankod/refine';
import { FormDataKlien } from './FormDataKlien';
import { OrderedServiceList } from './orderedServiceList';
import { ServiceDrawer } from './serviceDrawer';

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
      </Col>
    </Create>
  );
};
