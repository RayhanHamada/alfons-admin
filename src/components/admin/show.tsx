import { IAdmin } from '@components';
import {
  Button,
  DateField,
  Show,
  Space,
  Typography,
  useShow,
} from '@pankod/refine';
import dayjs from 'dayjs';
import { MouseEventHandler, useCallback } from 'react';

const { Title, Text } = Typography;

export const AdminShow: React.FC = () => {
  const {
    queryResult: { isLoading, data: adminData },
    showId,
  } = useShow<IAdmin>();

  const onHapusAdmin: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      e.preventDefault();
      if (showId) {
        //   TODO trigger DELETE /user dan /admin ke API
      }
    },
    [showId]
  );

  if (!adminData) return <p>Mengambil data admin</p>;

  return (
    <Show
      title={`Admin ${adminData?.data.name}`}
      recordItemId={showId}
      isLoading={isLoading}
      actionButtons={
        <Space>
          <Button type="primary" onClick={onHapusAdmin} danger>
            Hapus Admin
          </Button>
        </Space>
      }
    >
      <Title level={5}>id</Title>
      <Text>{adminData.data.id}</Text>
      <Title level={5}>Nama</Title>
      <Text>{adminData.data.name}</Text>
      <Title level={5}>Email</Title>
      <Text>{adminData.data.email}</Text>
      <Title level={5}>Nomor Telepon</Title>
      <Text>{adminData.data.phone_number}</Text>
      <Title level={5}>Ditambahkan Tanggal</Title>
      <DateField
        format="LLL"
        value={dayjs(adminData.data.created_at).add(7, 'h')}
      />
    </Show>
  );
};
