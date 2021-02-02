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
  Spin,
  Empty,
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
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [artists, setArtists] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Initial fetch
  useEffect(async () => {
    try {
      const res = await axios.get(`${API_URL}/artist`);
      setArtists(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
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

    setConfirmLoading(false);
  };

  const handleEdit = async (values) => {
    setConfirmLoading(true);

    try {
      await axios.put(`${API_URL}/artist/${editId}`, values);

      const res = await axios.get(`${API_URL}/artist`);
      setArtists(res.data.data);

      setShowEdit(false);

      message.success('The artist was successfuly edited.');
    } catch (err) {
      console.error(err);
      message.error('Ups! Something went wrong while editing the artist.');
    }

    setConfirmLoading(false);
  };

  const setupEdition = (id) => {
    const artist = artists.find((a) => a.id === id);
    setEditId(artist.id);
    editForm.setFieldsValue(artist);
    setShowEdit(true);
  };

  const clearForms = () => {
    setShowCreate(false);
    setShowEdit(false);
    setEditId(null);
    createForm.resetFields();
    editForm.resetFields();
  };

  return (
    <>
      {fetching && <Spin size="large" style={{ margin: '50px 50%' }} />}

      {!fetching && (
        <Button
          style={{ margin: '20px' }}
          type="primary"
          onClick={() => setShowCreate(true)}
        >
          Create a new artist!
        </Button>
      )}

      {!fetching &&
        (!!artists.length ? (
          <div className="Artists">
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
                          <Link to={`/songs?artistId=${id}`}>
                            <CaretRightOutlined />
                          </Link>
                        </Tooltip>,

                        <Tooltip key={`artist-${id}-edit`} title="Edit this artist">
                          <EditOutlined onClick={() => setupEdition(id)} />
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
        ) : (
          <Empty style={{ marginTop: '5%' }} />
        ))}

      {/* CREATE FORM */}
      <Modal
        title="Create a new artist"
        visible={showCreate}
        confirmLoading={confirmLoading}
        okText="Create"
        cancelText="Cancel"
        onOk={() => {
          createForm
            .validateFields()
            .then((values) => {
              createForm.resetFields();
              handleCreate(values);
            })
            .catch((info) => console.error('Validate Failed:', info));
        }}
        onCancel={() => clearForms()}
      >
        <Form {...layout} form={createForm} name="create-artist-form">
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
              {
                required: true,
                message: 'You must provide an image for the artist.'
              },
              { validator: image }
            ]}
          >
            <Input placeholder="Example: https://pacehold.it/1000x1000" />
          </Form.Item>
        </Form>
      </Modal>

      {/* EDIT FORM */}
      <Modal
        title="Editing an artist"
        visible={showEdit}
        confirmLoading={confirmLoading}
        okText="Update"
        cancelText="Cancel"
        onOk={() => {
          editForm
            .validateFields()
            .then((values) => {
              editForm.resetFields();
              handleEdit(values);
            })
            .catch((info) => console.error('Validate Failed:', info));
        }}
        onCancel={() => clearForms()}
      >
        <Form {...layout} form={editForm} name="edit-artist-form">
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
              {
                required: true,
                message: 'You must provide an image for the artist.'
              },
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
