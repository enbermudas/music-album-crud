import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import './Artists.css';

const Artists = () => {
  const [artists, setArtists] = useState([]);

  // Initial fetch
  useEffect(async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1/artist');
      setArtists(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="Artists">
      <Row gutter={[16, 16]}>
        {!!artists.length &&
          artists.map(({ id, name, photo }) => (
            <Col key={id} lg={{ span: 6 }} md={{ span: 12 }} xs={{ span: 24 }}>
              <Card
                className="artist-card"
                cover={
                  <img className="artist-cover" alt={`artist-${id}-cover`} src={photo} />
                }
                actions={[
                  <Tooltip key={`artist-${id}-find`} title="Go to profile page">
                    <EllipsisOutlined />
                  </Tooltip>,

                  <Tooltip key={`artist-${id}-edit`} title="Edit this artist">
                    <EditOutlined />
                  </Tooltip>,

                  <Tooltip key={`artist-${id}-delete`} title="Delete this artist">
                    <DeleteOutlined />
                  </Tooltip>
                ]}
              >
                <Card.Meta title={name} />
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Artists;
