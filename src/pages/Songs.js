import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, List, Avatar, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import time from '../helpers/time';
import './Songs.css';

const Songs = () => {
  const [songs, setSongs] = useState([]);

  // Initial fetch
  useEffect(async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1/song');
      setSongs(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

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

                    <Tooltip key={`song-${id}-edit`} title="Delete this song">
                      <DeleteOutlined />
                    </Tooltip>
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
