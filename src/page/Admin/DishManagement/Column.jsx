import { Space, Button, Popconfirm, Switch } from "antd";

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const getDishColumns = (actions) => {
  const { handleFillInput, removeDish, ToggleDisable } = actions;

  return [
    {
      title: "Ảnh",
      dataIndex: "image",
      width: 120,
      render: (image) => (
        <img
          src={image}
          alt="dish"
          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
        />
      )
    },
    {
      title: "Tên món",
      dataIndex: "name",
      width: 200,
    },
    {
      title: "Giá",
      dataIndex: "price",
      width: 150,
      render: (price) => formatPrice(price),
      sorter: (a, b) => a.price - b.price,
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      width: 250,
      filters: [
        { text: 'Gà rán', value: 'Gà rán' },
        { text: 'Burger', value: 'Burger' },
        { text: 'Mì Ý', value: 'Mì Ý' },
        { text: 'Khoai & Món phụ', value: 'Khoai & Món phụ' },
        { text: 'Đồ uống', value: 'Đồ uống' },
        { text: 'Tráng miệng', value: 'Tráng miệng' },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Hành động",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button  onClick={() => handleFillInput(record)}>Sửa</Button>
          <Popconfirm
            title="Xoá món này?"
            onConfirm={() => removeDish(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button  danger>Xoá</Button>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: "Vô hiệu",
      dataIndex: "isDisable",
      width: 100,
      align: 'center',
      render: (isDisable, record) => (
        <Switch
          
          checked={isDisable}
          onChange={(checked) => ToggleDisable(record.id, !checked)}
        />
      ),
    },
  ];
};