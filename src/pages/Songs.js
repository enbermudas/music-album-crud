import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Row,
  Col,
  Card,
  List,
  Avatar,
  Tooltip,
  Popconfirm,
  Empty,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Spin,
  Select,
  Alert,
  message
} from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { default as InfiniteList } from '@researchgate/react-intersection-list';
import time from '../helpers/time';
import { API_URL } from '../constants';
import './Songs.css';

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

const Songs = () => {
  const query = useQuery();

  const [albumId] = useState(Number(query.get('albumId')));
  const [artistId] = useState(Number(query.get('artistId')));
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [songs, setSongs] = useState([]);
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
      const songsFetch = axios.get(`${API_URL}/song`);
      const albumsFetch = axios.get(`${API_URL}/album`);
      const artistsFetch = axios.get(`${API_URL}/artist`);

      const [songs, albums, artists] = await axios.all([
        songsFetch,
        albumsFetch,
        artistsFetch
      ]);

      let filteredSongs = songs.data.data;
      let filteredAlbums = albums.data.data;
      let filteredArtists = artists.data.data;

      if (artistId) {
        filteredSongs = filteredSongs.filter((song) => song.artistId === artistId);
        filteredArtists = filteredArtists.filter((artist) => artist.id === artistId);
        filteredAlbums = filteredAlbums.filter((album) => album.artistId === artistId);
      }

      if (albumId) {
        filteredSongs = filteredSongs.filter((song) => song.albumId === albumId);
      }

      setSongs(filteredSongs);
      setAlbums(filteredAlbums);
      setArtists(filteredArtists);
    } catch (err) {
      console.error(err);
      message.error('Ups! Something went wrong while fetching the songs.');
    } finally {
      setFetching(false);
    }
  }, []);

  const handleCreate = async (values) => {
    setConfirmLoading(true);

    try {
      await axios.post(`${API_URL}/song`, values);

      const res = await axios.get(`${API_URL}/song`);
      setSongs(res.data.data);

      setShowCreate(false);

      message.success('The song was successfuly created.');
    } catch (err) {
      console.error(err);
      message.error('Ups! Something went wrong while deleting the song.');
    }

    setConfirmLoading(false);
  };

  const handleEdit = async (values) => {
    setConfirmLoading(true);

    try {
      await axios.put(`${API_URL}/song/${editId}`, values);

      const res = await axios.get(`${API_URL}/song`);
      setSongs(res.data.data);

      setShowEdit(false);

      message.success('The song was successfuly edited.');
    } catch (err) {
      console.error(err);
      message.error('Ups! Something went wrong while editing the song.');
    }

    setConfirmLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/song/${id}`);

      const res = await axios.get(`${API_URL}/song`);
      setSongs(res.data.data);

      message.success('The song was successfuly deleted.');
    } catch (err) {
      console.error(err);
      message.error('Ups! Something went wrong while deleting the song.');
    }
  };

  const setupEdition = (id) => {
    const song = songs.find((a) => a.id === id);
    setEditId(song.id);
    editForm.setFieldsValue(song);
    setShowEdit(true);
  };

  const clearForms = () => {
    setShowCreate(false);
    setShowEdit(false);
    setEditId(null);
    createForm.resetFields();
    editForm.resetFields();
  };

  const itemsRenderer = (items, ref) => (
    <span ref={ref}>
      <List itemLayout="vertical" size="large" dataSource={songs}>
        {items}
      </List>
    </span>
  );

  const renderItem = (index, key) => {
    const { id, name, duration, artist, album } = songs[index];

    return (
      <React.Fragment key={key}>
        <List.Item
          key={id}
          extra={time(duration)}
          actions={[
            <Tooltip key={`song-${id}-edit`} title="Edit this song">
              <EditOutlined onClick={() => setupEdition(id)} />
            </Tooltip>,

            <Popconfirm
              key={`song-${id}-edit`}
              title="Are you sure about deleting this song?"
              onConfirm={() => handleDelete(id)}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Delete this song" placement="bottom">
                <DeleteOutlined />
              </Tooltip>
            </Popconfirm>
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={artist.photo} />}
            title={name}
            description={
              <span>
                Made by <strong>{artist.name}</strong> for the album titled{' '}
                <i>{album.name}</i>.
              </span>
            }
          />
        </List.Item>
      </React.Fragment>
    );
  };

  return (
    <>
      {/* SPINNER */}
      {fetching && <Spin size="large" style={{ margin: '50px 50%' }} />}

      {/* CREATION BUTTON */}
      {!fetching && !!artists.length && !!albums.length && (
        <Row style={{ margin: '20px 20px' }}>
          <Col lg={{ span: 12, offset: 6 }} xs={{ span: 24 }}>
            <Button type="primary" onClick={() => setShowCreate(true)}>
              Create a new song!
            </Button>
          </Col>
        </Row>
      )}

      {/* ALERTS */}
      {!fetching && (!artists.length || !albums.length) && (
        <>
          {!artists.length && (
            <Alert
              style={{ margin: '20px' }}
              message={
                <span>
                  Seems like there are no artists on the app. Go ahead and{' '}
                  <Link to="/artists">create one</Link>!
                </span>
              }
              type="error"
            />
          )}

          {!albums.length && (
            <Alert
              style={{ margin: '20px' }}
              message={
                !artistId ? (
                  <span>
                    Seems like there are no albums on the app. Go ahead and{' '}
                    <Link to="/albums">create one</Link>!
                  </span>
                ) : (
                  <span>
                    Seems like <strong>{artists[0].name}</strong> has no albums on the
                    app. Go ahead and{' '}
                    <Link to={`/albums?artistId=${artists[0].id}`}>create one</Link> for
                    them!
                  </span>
                )
              }
              type="error"
            />
          )}
        </>
      )}

      {!fetching &&
        (!!songs.length ? (
          <div className="Songs">
            <Row>
              <Col lg={{ span: 12, offset: 6 }} xs={{ span: 24 }}>
                <Card bordered style={{ marginBottom: '25px' }}>
                  <InfiniteList
                    itemCount={songs.length}
                    itemsRenderer={itemsRenderer}
                    renderItem={renderItem}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        ) : (
          <Empty style={{ marginTop: '2%' }} />
        ))}

      {/* CREATE FORM */}
      <Modal
        title="Create a new song"
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
        <Form {...layout} form={createForm} name="create-song-form">
          <Form.Item
            name="artistId"
            label="Artist"
            hasFeedback
            rules={[{ required: true, message: "Please select the song's artist" }]}
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
            name="albumId"
            label="Album"
            hasFeedback
            rules={[{ required: true, message: "Please select the song's album" }]}
          >
            <Select placeholder="Check the list">
              {albums.map((album) => {
                return (
                  <Select.Option key={album.id} value={album.id}>
                    {album.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "You must indicate the song's name." }]}
          >
            <Input placeholder="Example: React Is Amazing Ft. AntD" />
          </Form.Item>

          <Form.Item
            label="Duration"
            name="duration"
            rules={[
              {
                required: true,
                message: 'You must provide the duration (seconds) of the song.'
              }
            ]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="Example: 230" />
          </Form.Item>
        </Form>
      </Modal>

      {/* EDIT FORM */}
      <Modal
        title="Edit a new song"
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
        <Form {...layout} form={editForm} name="edit-song-form">
          <Form.Item
            name="artistId"
            label="Artist"
            hasFeedback
            rules={[{ required: true, message: "Please select the song's artist" }]}
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
            name="albumId"
            label="Album"
            hasFeedback
            rules={[{ required: true, message: "Please select the song's album" }]}
          >
            <Select placeholder="Check the list">
              {albums.map((album) => {
                return (
                  <Select.Option key={album.id} value={album.id}>
                    {album.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "You must indicate the song's name." }]}
          >
            <Input placeholder="Example: React Is Amazing Ft. AntD" />
          </Form.Item>

          <Form.Item
            label="Duration"
            name="duration"
            rules={[
              {
                required: true,
                message: 'You must provide the duration (seconds) of the song.'
              }
            ]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="Example: 230" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Songs;
