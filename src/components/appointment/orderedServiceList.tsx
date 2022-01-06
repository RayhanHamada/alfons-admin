import type { IService } from '@components';
import {
  AntdList,
  Button,
  Icons,
  NumberField,
  TextField,
  Typography,
  useMany,
} from '@pankod/refine';
import useCreateAppointmentStore from '@utility/hooks/useCreateAppointmentStore';

const { PlusOutlined, DeleteOutlined } = Icons;
const { Title } = Typography;

const OrderedServiceList: React.FC = (_props) => {
  const { serviceIds, removeServiceId, toggleServiceDrawer } =
    useCreateAppointmentStore();

  const { data: serviceOrderedData, isError: isServiceOrderedError } =
    useMany<IService>({
      resource: 'service',
      ids: serviceIds.map((v) => `${v}`),
    });

  if (isServiceOrderedError || !serviceOrderedData) return <p>Terjadi Error</p>;

  return (
    <>
      <AntdList.Item
        actions={[
          <Button type="primary" danger style={{ visibility: 'hidden' }}>
            <PlusOutlined />
          </Button>,
        ]}
      >
        <AntdList.Item.Meta
          style={{ fontWeight: 'bolder' }}
          title={<Title level={5}>Jenis Service</Title>}
        />
        <TextField strong value={<Title level={5}>Perkiraan Harga</Title>} />
      </AntdList.Item>

      {/* list service yang dipilih */}
      <AntdList
        dataSource={serviceOrderedData.data}
        renderItem={(item, i) => (
          <AntdList.Item
            actions={[
              <Button
                type="primary"
                onClick={() => removeServiceId(parseInt(item.id!))}
                danger
              >
                <DeleteOutlined />
              </Button>,
            ]}
          >
            <AntdList.Item.Meta title={`${i + 1}. ${item.name}`} />
            <NumberField
              value={item.cost_estimate}
              options={{ currency: 'idr', style: 'currency' }}
            />
          </AntdList.Item>
        )}
      />

      <Button onClick={toggleServiceDrawer}>Tambahkan Service</Button>

      {/* perkiraan total harga */}

      <>
        <hr />
        <AntdList.Item
          actions={[
            <Button type="primary" danger style={{ visibility: 'hidden' }}>
              <DeleteOutlined />
            </Button>,
          ]}
        >
          <AntdList.Item.Meta
            style={{ fontWeight: 'bold' }}
            title="Total Perkiraan Harga"
          />
          <NumberField
            value={serviceOrderedData.data.reduce(
              (p, c) => p + c.cost_estimate,
              0
            )}
            options={{ currency: 'idr', style: 'currency' }}
            strong
          />
        </AntdList.Item>
      </>
    </>
  );
};

export default OrderedServiceList;
