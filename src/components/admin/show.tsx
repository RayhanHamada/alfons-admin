import { IAdmin } from '@components';
import { Res } from '@customTypes/api/getAdmin';
import {
  Button,
  DateField,
  message,
  Popconfirm,
  Show,
  Space,
  Typography,
  useShow,
} from '@pankod/refine';
import { ky } from '@utility/ky';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const { Title, Text } = Typography;

export const AdminShow: React.FC = () => {
  const {
    queryResult: { isLoading, data: adminResult },
    showId,
  } = useShow<IAdmin>();

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * fetch email admin dari table auth.users
   */
  useEffect(() => {
    const getAdmin = async (showId: string) =>
      ky.get(`api/getAdmin?id=${showId}`).json<Res>();

    if (showId) {
      getAdmin(showId).then((user) => {
        if (user) {
          setEmail(user.email!);
        }
      });
    }
  }, [showId]);

  if (!adminResult) return <p>Mengambil data admin</p>;

  const { data: adminData } = adminResult;

  const onHapusAdmin = async () => {
    await ky
      .delete(`api/deleteAdmin?uid=${adminData.supabase_user_id}`)
      .then(async (res) => {
        if (res.ok) {
          await message.success('Hapus Berhasil', 1).then(() => {
            router.replace('/admin');
          });
        }
      })
      .catch(async () => {
        await message.error('Hapus Tidak Berhasil', 1).then(() => {
          router.replace('/admin');
        });
      });
  };

  return (
    <Show
      title={`Admin ${adminData.name}`}
      recordItemId={showId}
      isLoading={isLoading}
      actionButtons={
        <Space>
          <Popconfirm
            title="Anda Yakin"
            onConfirm={onHapusAdmin}
            okButtonProps={{ loading: isDeleting }}
          >
            <Button type="primary" danger disabled={isDeleting}>
              Hapus Admin
            </Button>
          </Popconfirm>
        </Space>
      }
    >
      <Title level={5}>id</Title>
      <Text>{adminResult.data.id}</Text>
      <Title level={5}>Nama</Title>
      <Text>{adminResult.data.name}</Text>
      <Title level={5}>Email</Title>
      <Text>{email}</Text>
      <Title level={5}>Nomor Telepon</Title>
      <Text>{adminResult.data.phone_number}</Text>
      <Title level={5}>Ditambahkan Tanggal</Title>
      <DateField
        format="LLL"
        value={dayjs(adminResult.data.created_at).add(7, 'h')}
      />
    </Show>
  );
};
