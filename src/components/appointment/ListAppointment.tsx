import { IAppointment } from '@components';
import {
  Button,
  Col,
  Form,
  HttpError,
  Icons,
  Input,
  List,
  useTable,
} from '@pankod/refine';

export const AppointmentList: React.FC = (_props) => {
  const { searchFormProps } = useTable<
    IAppointment,
    HttpError,
    {
      klienName: string;
      stylishName: string;
    }
  >({
    resource: 'appointment',
    initialSorter: [
      {
        field: 'id',
        order: 'asc',
      },
    ],
  });

  return (
    <Col>
      <Form layout="vertical" {...searchFormProps}>
        <Form.Item label="Cari berdasarkan nama klien" name="klienName">
          <Input placeholder="Nama Klien" prefix={<Icons.SearchOutlined />} />
        </Form.Item>
        <Form.Item label="Cari berdasarkan nama stylish" name="stylishName">
          <Input placeholder="Nama Stylish" prefix={<Icons.SearchOutlined />} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Cari
          </Button>
        </Form.Item>
      </Form>
      <List
        title="Appointment"
        createButtonProps={{ children: 'Buat Appointment Baru' }}
        canCreate
      ></List>
    </Col>
  );
};
