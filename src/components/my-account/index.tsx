import { ICabang } from '@components';
import type { IUserIdentity } from '@customTypes/authProvider';
import type { definitions } from '@customTypes/supabase';
import {
  Button,
  Col,
  Form,
  Input,
  List,
  message,
  Typography,
  useGetIdentity,
  useOne,
} from '@pankod/refine';
import { supabaseBrowserClient } from '@utility/supabaseBrowserClient';

const { Title, Text } = Typography;

type UpdateDataForm = {
  name: string;
};

type UpdatePasswordForm = {
  password: string;
};

export const MyAccount: React.FC = (_props) => {
  const [updateDataForm] = Form.useForm<UpdateDataForm>();
  const [updatePasswordForm] = Form.useForm<UpdatePasswordForm>();

  /**
   * ambil data diri
   */
  const { data: dataDiri } = useGetIdentity<IUserIdentity>();

  const { data: cabangData } = useOne<ICabang>({
    resource: 'cabang',
    id: `${dataDiri?.cabangId}`,
  });

  const onUpdateDataFormFinish = async ({ name }: UpdateDataForm) => {
    /**
     * update table admin
     */
    if (!dataDiri) return message.error('Gagal mengupdate data admin');
    const { id } = dataDiri;

    const { data, error } = await supabaseBrowserClient
      .from<definitions['admin']>('admin')
      .update({
        name,
      })
      .eq('supabase_user_id', id);

    if (error || !data) return message.error('Gagal mengupdate data admin');

    await message.success(`Berhasil mengupdate user ${name}`, 1);
  };

  if (!dataDiri) return <p>Mengambil data</p>;

  return (
    <List title="Akun Saya">
      <Col>
        {/* update table admin */}
        <Form
          layout="vertical"
          form={updateDataForm}
          onFinish={onUpdateDataFormFinish}
        >
          <Title level={5}>Data Admin</Title>
          <hr />
          <Form.Item
            label="Nama"
            name="name"
            initialValue={dataDiri.username}
            style={{ width: 400 }}
          >
            <Input placeholder="Nama" />
          </Form.Item>
          <Form.Item label="Email" name="email" style={{ width: 400 }}>
            <Text>{dataDiri.email}</Text>
          </Form.Item>

          {cabangData ? (
            <Form.Item label="Cabang" name="cabang" style={{ width: 400 }}>
              <Text>{cabangData.data.name}</Text>
            </Form.Item>
          ) : null}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Simpan
            </Button>
          </Form.Item>
        </Form>

        {/* reset password */}
        <Form layout="vertical" form={updatePasswordForm}>
          <Title level={5}>Reset Password</Title>
          <hr />
          <Form.Item
            label="Password Baru"
            name="password"
            style={{ width: 400 }}
          >
            <Input.Password type="password" placeholder="Password baru anda" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="button">
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </List>
  );
};
