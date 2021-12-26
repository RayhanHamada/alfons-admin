import type { IAdmin } from '@components';
import type { CreateAdminBody } from '@customTypes/api/createAdmin';
import type { IUserIdentity } from '@customTypes/authProvider';
import {
  Create,
  Form,
  Input,
  IResourceComponentsProps,
  message,
  Select,
  useGetIdentity,
  useSelect,
} from '@pankod/refine';
import { ky } from '@utility/ky';
import { useRouter } from 'next/router';

export const AdminCreate: React.FC<IResourceComponentsProps<IAdmin>> = (
  _props
) => {
  const router = useRouter();
  const [form] = Form.useForm();

  const {
    data: adminData,
    isError: isAdminError,
    isLoading: isAdminLoading,
  } = useGetIdentity<IUserIdentity>();

  const { selectProps: selectCabangProps } = useSelect({
    resource: 'cabang',
    optionLabel: 'name',
    optionValue: 'id',
    defaultValue: adminData?.cabangId ? `${adminData.cabangId}` : undefined,
  });

  const onFinish = async ({
    email,
    name,
    password,
    phone_number,
    cabang_id,
    adminRole,
  }: CreateAdminBody) => {
    await ky
      .post('api/createAdmin', {
        json: {
          email,
          name,
          password,
          phone_number,
          cabang_id,
          adminRole,
        },
      })
      .then((res) => {
        if (!res.ok) {
          message.error('Gagal membuat admin !', 3);
        }

        message.success(`Sukses membuat user ${email}`, 1).then(() => {
          router.push('/admin');
        });
      })
      .catch(() => {
        message.error('Gagal membuat admin !', 3);
      });
  };

  if (isAdminLoading) {
    return <p>Mengambil data admin...</p>;
  }

  if (!adminData || isAdminError) {
    return <p>Error mengambil data admin</p>;
  }

  return (
    <Create
      title="Daftar Admin Baru"
      saveButtonProps={{
        onClick: form.submit,
      }}
    >
      <Form
        layout="vertical"
        style={{ width: '500px' }}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item label="Nama Admin" name="name" requiredMark required>
          <Input placeholder="Contoh: Budi" type="text" autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="Email Admin"
          name="email"
          rules={[
            {
              type: 'email',
            },
          ]}
          requiredMark
          required
        >
          <Input
            placeholder="Contoh: budi123contoh@gmail.com"
            type="email"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          label="Nomor Telepon Admin"
          name="phone_number"
          requiredMark
          required
        >
          <Input placeholder="" type="tel" autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="Password asal"
          name="password"
          initialValue="admin2022"
          rules={[
            {
              required: true,
              min: 6,
            },
          ]}
          requiredMark
          required
        >
          <Input
            autoComplete="off"
            readOnly={adminData.adminRole === 'admin'}
          />
        </Form.Item>
        <Form.Item
          initialValue={adminData.cabangId}
          label="Cabang"
          name="cabang_id"
          requiredMark
          required
        >
          <Select
            {...selectCabangProps}
            disabled={adminData.adminRole === 'admin'}
          />
        </Form.Item>
        <Form.Item
          initialValue="admin"
          label="Jenis Admin"
          name="adminRole"
          requiredMark
          required
        >
          <Select disabled={adminData.adminRole === 'admin'}>
            <Select.Option value="admin">Admin (karyawan)</Select.Option>
            <Select.Option value="superadmin">
              Super Admin (Manager atau Owner)
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Create>
  );
};
