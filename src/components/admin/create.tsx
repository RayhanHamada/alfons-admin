import type { IAdmin } from '@components';
import type { Body } from '@customTypes/api/createAdmin';
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
import { createAdmin } from '@utility/api';
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

  const onFinish = async (body: Body) => {
    const res = await createAdmin(body);
    if (!res.ok) {
      message.error('Gagal membuat admin !', 3);
      return;
    }

    await message.success(`Sukses membuat user ${body.email}`, 1);
    await router.push('/admin');
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
