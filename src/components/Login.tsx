import {
  AntdLayout,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Typography,
} from '@pankod/refine';
import logo from '@public/logo.svg';
import { ILoginParam } from '@utility';
import Image from 'next/image';

const { Title } = Typography;

export const Login: React.FC = (_props) => {
  const [form] = Form.useForm<ILoginParam>();

  return (
    <AntdLayout style={{ height: '100vh', width: '100%' }}>
      <Col
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          rowGap: '50px',
        }}
      >
        <Image src={logo} width={200} height={80} />
        <Form
          layout="vertical"
          form={form}
          requiredMark={false}
          initialValues={{
            remember: false,
          }}
          style={{
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <Title level={3} className="title" style={{ textAlign: 'center' }}>
            Masuk ke Dashboard
          </Title>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input type="email" size="large" placeholder="budi@example.com" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
            style={{ marginBottom: '12px' }}
          >
            <Input type="password" placeholder="●●●●●●●●" size="large" />
          </Form.Item>
          <Form.Item
            name="remember"
            rules={[{ required: false }]}
            style={{ marginBottom: '12px' }}
          >
            <Checkbox>Ingat email saya</Checkbox>
          </Form.Item>
          <Button type="primary" size="large" htmlType="submit" block>
            Sign in
          </Button>
        </Form>
      </Col>
    </AntdLayout>
  );
};
