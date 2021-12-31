import { IAdmin, ICabang } from '@components';
import { Res } from '@customTypes/api/getAdmin';
import {
  Button,
  DateField,
  message,
  Popconfirm,
  Show,
  Space,
  Typography,
  useOne,
  useShow,
} from '@pankod/refine';
import { deleteAdmin, getAdmin } from '@utility/api';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const { Title, Text } = Typography;

export const AdminShow: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    queryResult: { isLoading, data: adminResult, error: adminError },
    showId,
  } = useShow<IAdmin>();

  const { data: cabangData, error: cabangError } = useOne<ICabang>({
    resource: 'cabang',
    id: `${adminResult?.data.cabang_id}`,
  });

  /**
   * fetch email admin dari table auth.users
   */
  useEffect(() => {
    if (showId) {
      (async () => {
        const res = await getAdmin(showId);
        const user = (await res.json()) as Res;

        if (!res.ok || !user) return message.error('Gagal mengambil email');

        setEmail(user.email!);
      })();
    }
  }, [showId]);

  if (adminError || cabangError)
    return <p>Gagal mengambil data cabang atau admin</p>;

  if (!adminResult || !cabangData) return <p>Mengambil data admin</p>;

  const { data: adminData } = adminResult;

  const onHapusAdmin = async () => {
    setIsDeleting(true);
    const res = await deleteAdmin(adminData.supabase_user_id);

    if (res.ok) {
      await message.success('Hapus Berhasil', 1);
    } else {
      await message.error('Hapus Tidak Berhasil', 1);
    }

    setIsDeleting(false);

    await router.replace('/admin');
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
      <Title level={5}>Cabang</Title>
      <Text>{cabangData.data.name}</Text>
      <Title level={5}>Ditambahkan Tanggal</Title>
      <DateField
        format="LLL"
        value={dayjs(adminResult.data.created_at).add(7, 'h')}
      />
    </Show>
  );
};
