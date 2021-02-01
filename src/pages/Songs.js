import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, List, Avatar, Tooltip, message, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import time from '../helpers/time';
import { API_URL } from '../constants';
import './Songs.css';

const Songs = () => {
  const [songs, setSongs] = useState([]);

  // Initial fetch
  useEffect(async () => {
    try {
      const res = await axios.get(`${API_URL}/song`);
      setSongs(res.data.data);
    } catch (err) {
      console.error(err);
      message.error('Ups! Something went wrong while fetching the songs.');
    }
  }, []);

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

  return (
    <div className="Songs">
      <Row>
        <Col lg={{ span: 12, offset: 6 }} xs={{ span: 24 }}>
          <Card bordered>
            <List
              itemLayout="vertical"
              size="large"
              dataSource={songs}
              renderItem={({ id, name, duration, artist, album }) => (
                <List.Item
                  key={id}
                  extra={time(duration)}
                  actions={[
                    <Tooltip key={`song-${id}-edit`} title="Edit this song">
                      <EditOutlined />
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
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Songs;
