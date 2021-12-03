import { AntdLayout, AutoComplete, Icons, Input } from '@pankod/refine';

const { SearchOutlined } = Icons;

const Header: React.FC = () => {
  return (
    <AntdLayout.Header
      style={{
        padding: '0px 24px',
        backgroundColor: '#FFF',
      }}
    >
      <AutoComplete
        style={{ width: '100%', maxWidth: '550px' }}
        filterOption={false}
      >
        <Input
          size="large"
          placeholder="Search posts or categories"
          suffix={<SearchOutlined />}
        />
      </AutoComplete>
    </AntdLayout.Header>
  );
};

export default Header;
