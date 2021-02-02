import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  Row,
  Col,
  Tooltip,
  Popconfirm,
  Empty,
  Button,
  Modal,
  Form,
  Input,
  Spin,
  Select,
  message
} from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import image from '../helpers/image';
import { API_URL } from '../constants';
import './Albums.css';

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Albums = () => {
  const query = useQuery();

  const [artistId] = useState(Number(query.get('artistId')));
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Initial fetch
  useEffect(async () => {
    try {
      const albumsFetch = axios.get(`${API_URL}/album`);
      const artistsFetch = axios.get(`${API_URL}/artist`);

      const [albums, artists] = await axios.all([albumsFetch, artistsFetch]);

      let filteredAlbums = albums.data.data;
      let filteredArtists = artists.data.data;

      if (artistId) {
        filteredAlbums = filteredAlbums.filter((album) => album.artistId === artistId);
        filteredArtists = filteredArtists.filter((artist) => artist.id === artistId);
      }

      setAlbums(filteredAlbums);
      setArtists(filteredArtists);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  }, []);

  const handleCreate = async (values) => {
    setConfirmLoading(true);

    try {
      await axios.post(`${API_URL}/album`, values);

      const res = await axios.get(`${API_URL}/album`);
      setAlbums(res.data.data);

      setShowCreate(false);

      message.success('The album was successfuly created.');
    } catch (err) {
      console.error(err);
      message.error('Ups! Something went wrong while deleting the album.');
    }

    setConfirmLoading(false);
  };

  const handleEdit = async (values) => {
    setConfirmLoading(true);

    try {
      await axios.put(`${API_URL}/album/${editId}`, values);

      const res = await axios.get(`${API_URL}/album`);
      setAlbums(res.data.data);

      setShowEdit(false);

      message.success('The album was successfuly edited.');
    } catch (err) {
      console.error(err);
      message.error('Ups! Something went wrong while editing the album.');
    }

    setConfirmLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/album/${id}`);

      const res = await axios.get(`${API_URL}/album`);
      setAlbums(res.data.data);

      message.success('The album was successfuly deleted.');
    } catch (err) {
      console.error(err);
      message.error('Ups! Something went wrong while deleting the album.');
    }
  };
  const setupEdition = (id) => {
    const album = albums.find((a) => a.id === id);
    setEditId(album.id);
    editForm.setFieldsValue(album);
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

      {!fetching &&
        (!!albums.length ? (
          <>
            <div className="Albums">
              <Button
                style={{ marginBottom: '20px' }}
                type="primary"
                onClick={() => setShowCreate(true)}
              >
                Create a new album!
              </Button>

              <Row gutter={[16, 16]}>
                {!!albums.length &&
                  albums.map(({ id, name, cover, artist }) => (
                    <Col key={id} lg={{ span: 6 }} md={{ span: 12 }} xs={{ span: 24 }}>
                      <Card
                        className="album-card"
                        cover={
                          <img
                            className="album-cover"
                            alt={`album-${id}-cover`}
                            src={cover}
                          />
                        }
                        actions={[
                          <Tooltip key={`album-${id}-find`} title="Go to song list">
                            <Link to={`/songs?albumId=${id}`}>
                              <EllipsisOutlined />
                            </Link>
                          </Tooltip>,

                          <Tooltip key={`album-${id}-edit`} title="Edit this album">
                            <EditOutlined onClick={() => setupEdition(id)} />
                          </Tooltip>,

                          <Popconfirm
                            key={`album-${id}-delete`}
                            title="Are you sure about deleting this album?"
                            onConfirm={() => handleDelete(id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Tooltip title="Delete this album" placement="bottom">
                              <DeleteOutlined />
                            </Tooltip>
                          </Popconfirm>
                        ]}
                      >
                        <Card.Meta title={name} description={`By: "${artist.name}"`} />
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>

            {/* CREATE FORM */}
            <Modal
              title="Create a new album"
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
              <Form {...layout} form={createForm} name="create-album-form">
                <Form.Item
                  name="artistId"
                  label="Artist"
                  hasFeedback
                  rules={[
                    { required: true, message: "Please select the album's artist" }
                  ]}
                >
                  <Select placeholder="Check the list">
                    {artists.map((artist) => {
                      return (
                        <Select.Option key={artist.id} value={artist.id}>
                          {artist.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: 'You must indicate the album name.' }
                  ]}
                >
                  <Input placeholder="Example: Unrealistic Title" />
                </Form.Item>

                <Form.Item
                  label="Cover"
                  name="cover"
                  rules={[
                    {
                      required: true,
                      message: 'You must provide an image for the album.'
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
              title="Editing an album"
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
              <Form {...layout} form={editForm} name="edit-album-form">
                <Form.Item
                  name="artistId"
                  label="Artist"
                  hasFeedback
                  rules={[
                    { required: true, message: "Please select the album's artist" }
                  ]}
                >
                  <Select placeholder="Check the list">
                    {artists.map((artist) => {
                      return (
                        <Select.Option key={artist.id} value={artist.id}>
                          {artist.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: 'You must indicate the album name.' }
                  ]}
                >
                  <Input placeholder="Example: The Placeholders" />
                </Form.Item>

                <Form.Item
                  label="Cover"
                  name="cover"
                  rules={[
                    {
                      required: true,
                      message: 'You must provide an image for the album.'
                    },
                    { validator: image }
                  ]}
                >
                  <Input placeholder="Example: https://pacehold.it/1000x1000" />
                </Form.Item>
              </Form>
            </Modal>
          </>
        ) : (
          <Empty style={{ marginTop: '5%' }} />
        ))}
    </>
  );
};

export default Albums;
