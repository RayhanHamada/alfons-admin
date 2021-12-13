import { IStylish } from '@components';
import {
  Edit,
  Form,
  HttpError,
  Input,
  Select,
  Typography,
  useForm,
  useGetIdentity,
} from '@pankod/refine';
import { IUserIdentity } from '@utility';

const { Text, Title } = Typography;

export const StylishEdit: React.FC = (_props) => {
  const { isLoading: isIdentiyLoading, data: dataAdmin } =
    useGetIdentity<IUserIdentity>();

  const { saveButtonProps, formProps } = useForm<
    IStylish,
    HttpError,
    IStylish
  >();

  if (isIdentiyLoading) return <Text>Loading</Text>;

  if (!dataAdmin) return <Text>Data Cabang tidak ditemukan</Text>;

  return (
    <Edit
      deleteButtonProps={{ size: 'small' }}
      saveButtonProps={saveButtonProps}
      canDelete
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
        {/* <Form.Item label="Senin" name="senin_available" required>
          <Input autoComplete="off" />
        </Form.Item> */}
        <Title level={4}>Penjadwalan</Title>
        <Form.Item
          label="Senin"
          name="senin_available"
          key="senin_available"
          requiredMark
          required
        >
          <Select>
            <Select.Option value={true as any}>Available</Select.Option>
            <Select.Option value={false as any}>Not Available</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Selasa"
          name="selasa_available"
          key="selasa_available"
          requiredMark
          required
        >
          <Select>
            <Select.Option value={true as any}>Available</Select.Option>
            <Select.Option value={false as any}>Not Available</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="rabu"
          name="rabu_available"
          key="rabu_available"
          requiredMark
          required
        >
          <Select>
            <Select.Option value={true as any}>Available</Select.Option>
            <Select.Option value={false as any}>Not Available</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Kamis"
          name="kamis_available"
          key="kamis_available"
          requiredMark
          required
        >
          <Select>
            <Select.Option value={true as any}>Available</Select.Option>
            <Select.Option value={false as any}>Not Available</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Jumat"
          name="jumat_available"
          key="jumat_available"
          requiredMark
          required
        >
          <Select>
            <Select.Option value={true as any}>Available</Select.Option>
            <Select.Option value={false as any}>Not Available</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Sabtu"
          name="sabtu_available"
          key="sabtu_available"
          requiredMark
          required
        >
          <Select>
            <Select.Option value={true as any}>Available</Select.Option>
            <Select.Option value={false as any}>Not Available</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Minggu"
          name="minggu_available"
          key="minggu_available"
          requiredMark
          required
        >
          <Select>
            <Select.Option value={true as any}>Available</Select.Option>
            <Select.Option value={false as any}>Not Available</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Cabang Id"
          name="cabang_id"
          initialValue={dataAdmin.cabangId}
          hidden
        >
          <Input autoComplete="off" readOnly />
        </Form.Item>
      </Form>
    </Edit>
  );
};
