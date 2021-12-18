import type { IAdmin } from '@components';
import {
  Create,
  Form,
  HttpError,
  Input,
  IResourceComponentsProps,
  useForm,
  useGetIdentity,
} from '@pankod/refine';
import { IUserIdentity } from '@utility/authProvider';

export const AdminCreate: React.FC<IResourceComponentsProps<IAdmin>> = (
  _props
) => {
  const { saveButtonProps, formProps } = useForm<IAdmin, HttpError, IAdmin>();

  const {
    data: adminData,
    isError: isAdminError,
    isLoading: isAdminLoading,
  } = useGetIdentity<IUserIdentity>();

  if (isAdminLoading) {
    return <p>Mengambil data admin...</p>;
  }

  if (!adminData || isAdminError) {
    return <p>Error mengambil data admin</p>;
  }

  return (
    <Create title="Daftar Admin Baru" saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" style={{ width: '500px' }}>
        <Form.Item
          label="Nama Admin"
          name="name"
          rules={[
            {
              required: true,
              max: 80,
            },
          ]}
          requiredMark
          required
        >
          <Input type="text" autoComplete="off" />
        </Form.Item>
        <Form.Item label="Email Admin" name="email" requiredMark required>
          <Input type="email" autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="Nomor Telepon Admin"
          name="phone_number"
          requiredMark
          required
        >
          <Input type="tel" autoComplete="off" />
        </Form.Item>
        <Form.Item
          initialValue={adminData.cabangId}
          label="Cabang"
          name="cabang_id"
          hidden
          requiredMark
          required
        >
          <Input autoComplete="off" />
        </Form.Item>
      </Form>
    </Create>
  );
};
