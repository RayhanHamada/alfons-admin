import type { ICabang } from '@components';
import type { IUserIdentity } from '@customTypes/authProvider';
import type { definitions } from '@customTypes/supabase';
import {
  Button,
  Col,
  Form,
  Input,
  List,
  message,
  Spin,
  Typography,
  useGetIdentity,
  useOne,
} from '@pankod/refine';
import { supabaseBrowserClient } from '@utility/supabaseBrowserClient';
import { useState } from 'react';

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
  const [freeze, setFreeze] = useState(false);

  /**
   * ambil data diri
   */
  const {
    data: dataDiri,
    isError: isDataDiriError,
    isLoading: isDataDiriLoading,
  } = useGetIdentity<IUserIdentity>();

  const {
    data: cabangData,
    isError: isCabangError,
    isLoading: isCabangLoading,
  } = useOne<ICabang>({
    resource: 'cabang',
    id: dataDiri?.cabangId.toString() ?? '',
    queryOptions: {
      enabled: !!dataDiri || isDataDiriError,
    },
  });

  const onUpdateDataFormFinish = async ({ name }: UpdateDataForm) => {
    /**
     * update table admin
     */
    setFreeze(true);
    if (!dataDiri) {
      await message.error('Gagal mengupdate data admin', 1);
    } else {
      const { id } = dataDiri;

      const { data, error } = await supabaseBrowserClient
        .from<definitions['admin']>('admin')
        .update({
          name,
        })
        .eq('supabase_user_id', id);

      if (error || !data) {
        await message.error('Gagal mengupdate data admin', 1);
      } else {
        await message.success(`Berhasil mengupdate user ${name}`, 1);
      }
    }

    setFreeze(false);
  };

  const onUpdatePasswordFormFinish = async ({
    password,
  }: UpdatePasswordForm) => {
    setFreeze(true);
    const { user, error } = await supabaseBrowserClient.auth.update({
      password,
    });

    if (error || !user) {
      await message.error('Gagal mengupdate password', 1);
    } else {
      await message.success(`Berhasil mengupdate password user.`, 1);
    }

    setFreeze(false);
  };

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
          {isDataDiriError || !dataDiri ? (
            <Text>Gagal mengambil data anda</Text>
          ) : isDataDiriLoading ? (
            <Spin spinning />
          ) : (
            <>
              <Form.Item
                label="Nama"
                name="name"
                initialValue={dataDiri.username}
                style={{ width: 400 }}
              >
                <Input placeholder="Nama" disabled={freeze} />
              </Form.Item>
              <Form.Item label="Email" name="email" style={{ width: 400 }}>
                <Text>{dataDiri.email}</Text>
              </Form.Item>
            </>
          )}

          <Form.Item label="Cabang" name="cabang" style={{ width: 400 }}>
            {isCabangError || !cabangData ? (
              <Text>Gagal mengambil data cabang</Text>
            ) : isCabangLoading ? (
              <Spin spinning />
            ) : (
              <Text>{cabangData.data.name}</Text>
            )}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={freeze}>
              Simpan
            </Button>
          </Form.Item>
        </Form>

        {/* reset password */}
        <Form
          layout="vertical"
          form={updatePasswordForm}
          onFinish={onUpdatePasswordFormFinish}
        >
          <Title level={5}>Update Password</Title>
          <hr />
          <Form.Item
            label="Password Baru"
            name="password"
            style={{ width: 400 }}
            rules={[
              {
                type: 'string',
                min: 6,
              },
            ]}
          >
            <Input.Password
              type="password"
              placeholder="Password baru anda"
              disabled={freeze}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={freeze || isDataDiriError}
            >
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </List>
  );
};
