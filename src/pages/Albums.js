import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import './Albums.css';

const Albumbs = () => {
  const [albums, setAlbums] = useState([]);

  // Initial fetch
  useEffect(async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1/album');
      setAlbums(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="Albums">
      <Row gutter={[16, 16]}>
        {!!albums.length &&
          albums.map(({ id, name, cover, artist }) => (
            <Col key={id} lg={{ span: 6 }} md={{ span: 12 }} xs={{ span: 24 }}>
              <Card
                className="album-card"
                cover={
                  <img className="album-cover" alt={`album-${id}-cover`} src={cover} />
                }
                actions={[
                  <Tooltip key={`album-${id}-find`} title="Go to song list">
                    <EllipsisOutlined />
                  </Tooltip>,

                  <Tooltip key={`album-${id}-edit`} title="Edit this album">
                    <EditOutlined />
                  </Tooltip>,

                  <Tooltip key={`album-${id}-delete`} title="Delete this album">
                    <DeleteOutlined />
                  </Tooltip>
                ]}
              >
                <Card.Meta title={name} description={`By: "${artist.name}"`} />
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Albumbs;
