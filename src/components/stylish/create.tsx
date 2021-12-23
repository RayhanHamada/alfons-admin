import type { IStylish } from '@components';
import { IUserIdentity } from '@customTypes/authProvider';
import {
  Create,
  Form,
  HttpError,
  Input,
  IResourceComponentsProps,
  Radio,
  Typography,
  useForm,
  useGetIdentity,
} from '@pankod/refine';

const { Title, Text } = Typography;

export const StylishCreate: React.FC<IResourceComponentsProps<IStylish>> = (
  _props
) => {
  const { saveButtonProps, formProps } = useForm<
    IStylish,
    HttpError,
    IStylish
  >();

  const { isLoading, data: dataAdmin } = useGetIdentity<IUserIdentity>();

  if (isLoading) return <Text>Loading</Text>;

  if (!dataAdmin) return <Text>Data Cabang tidak ditemukan</Text>;

  return (
    <Create
      resource="stylish"
      title="Buat Stylish Baru"
      saveButtonProps={saveButtonProps}
    >
      <Form {...formProps} layout="vertical" style={{ width: '500px' }}>
        <Form.Item
          label="Nama Stylish"
          name="name"
          rules={[
            {
              required: true,
              max: 80,
              type: 'string',
            },
          ]}
        >
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="Nomor Telepon"
          name="phone_number"
          rules={[
            {
              max: 20,
              type: 'string',
            },
          ]}
          required
        >
          <Input autoComplete="off" />
        </Form.Item>
        <Title level={4}>Penjadwalan</Title>
        <Form.Item
          label="Senin"
          name="senin_available"
          key="senin_available"
          initialValue="false"
          requiredMark
          required
        >
          <Radio.Group>
            <Radio value="true">Available</Radio>
            <Radio value="false">Not Available</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Selasa"
          name="selasa_available"
          key="selasa_available"
          initialValue="false"
          requiredMark
          required
        >
          <Radio.Group>
            <Radio value="true">Available</Radio>
            <Radio value="false">Not Available</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="rabu"
          name="rabu_available"
          key="rabu_available"
          initialValue="false"
          requiredMark
          required
        >
          <Radio.Group>
            <Radio value="true">Available</Radio>
            <Radio value="false">Not Available</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Kamis"
          name="kamis_available"
          key="kamis_available"
          initialValue="false"
          requiredMark
          required
        >
          <Radio.Group>
            <Radio value="true">Available</Radio>
            <Radio value="false">Not Available</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Jumat"
          name="jumat_available"
          key="jumat_available"
          initialValue="false"
          requiredMark
          required
        >
          <Radio.Group>
            <Radio value="true">Available</Radio>
            <Radio value="false">Not Available</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Sabtu"
          name="sabtu_available"
          key="sabtu_available"
          initialValue="false"
          requiredMark
          required
        >
          <Radio.Group>
            <Radio value="true">Available</Radio>
            <Radio value="false">Not Available</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Minggu"
          name="minggu_available"
          key="minggu_available"
          initialValue="false"
          requiredMark
          required
        >
          <Radio.Group>
            <Radio value="true">Available</Radio>
            <Radio value="false">Not Available</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Cabang Id"
          name="cabang_id"
          initialValue={dataAdmin.cabangId}
          hidden
        >
          <Input autoComplete="off" />
        </Form.Item>
      </Form>
    </Create>
  );
};
