import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  Row,
  Col,
  Tooltip,
  Popconfirm,
  Modal,
  Form,
  Input,
  message
} from 'antd';
import { Link } from 'react-router-dom';
import {
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
  CaretRightOutlined
} from '@ant-design/icons';
import image from '../helpers/image';
import { API_URL } from '../constants';
import './Artists.css';

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

const Artists = () => {
  const [form] = Form.useForm();
  const [artists, setArtists] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // Initial fetch
  useEffect(async () => {
    try {
      const res = await axios.get(`${API_URL}/artist`);
      setArtists(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/artist/${id}`);

      const res = await axios.get(`${API_URL}/artist`);
      setArtists(res.data.data);

      message.success('The artist was successfuly deleted.');
    } catch (err) {
      console.error(err);
      message.error('Ups! Something went wrong while deleting the artist.');
    }
  };

  const handleCreate = async (values) => {
    setConfirmLoading(true);

    try {
      await axios.post(`${API_URL}/artist`, values);

      const res = await axios.get(`${API_URL}/artist`);
      setArtists(res.data.data);

      setShowCreate(false);

      message.success('The artist was successfuly created.');
    } catch (err) {
      console.error(err);
      message.error('Ups! Something went wrong while deleting the artist.');
    }

    setConfirmLoading(true);
  };

  return (
    <>
      <div className="Artists">
        <Button
          style={{ marginBottom: '20px' }}
          type="primary"
          onClick={() => setShowCreate(true)}
        >
          Create a new artist!
        </Button>

        <Row gutter={[16, 16]}>
          {!!artists.length &&
            artists.map(({ id, name, photo }) => (
              <Col key={id} lg={{ span: 6 }} md={{ span: 12 }} xs={{ span: 24 }}>
                <Card
                  className="artist-card"
                  cover={
                    <img
                      className="artist-cover"
                      alt={`artist-${id}-cover`}
                      src={photo}
                    />
                  }
                  actions={[
                    <Tooltip key={`artist-${id}-albums`} title="Go to albums list">
                      <Link to={`/albums?artistId=${id}`}>
                        <FileImageOutlined />
                      </Link>
                    </Tooltip>,

                    <Tooltip key={`artist-${id}-songs`} title="Go to songs list">
                      <Link to={`/songs?albumId=${id}`}>
                        <CaretRightOutlined />
                      </Link>
                    </Tooltip>,

                    <Tooltip key={`artist-${id}-edit`} title="Edit this artist">
                      <EditOutlined />
                    </Tooltip>,

                    <Popconfirm
                      key={`artist-${id}-delete`}
                      title="Are you sure about deleting this artist?"
                      onConfirm={() => handleDelete(id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Tooltip title="Delete this artist" placement="bottom">
                        <DeleteOutlined />
                      </Tooltip>
                    </Popconfirm>
                  ]}
                >
                  <Card.Meta title={name} />
                </Card>
              </Col>
            ))}
        </Row>
      </div>

      <Modal
        title="Create a new artist"
        visible={showCreate}
        confirmLoading={confirmLoading}
        okText="Create"
        cancelText="Cancel"
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleCreate(values);
            })
            .catch((info) => console.error('Validate Failed:', info));
        }}
        onCancel={() => setShowCreate(false)}
      >
        <Form {...layout} form={form} name="create-artist-form">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'You must indicate the artist name.' }]}
          >
            <Input placeholder="Example: The Placeholders" />
          </Form.Item>

          <Form.Item
            label="Photo"
            name="photo"
            rules={[
              { required: true, message: 'You must provide an image for the artist.' },
              { validator: image }
            ]}
          >
            <Input placeholder="Example: https://pacehold.it/1000x1000" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Artists;
