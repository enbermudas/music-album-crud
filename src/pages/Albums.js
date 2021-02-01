import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Tooltip, Popconfirm, message } from 'antd';
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { API_URL } from '../constants';
import './Albums.css';

const Albumbs = () => {
  const [albums, setAlbums] = useState([]);

  // Initial fetch
  useEffect(async () => {
    try {
      const res = await axios.get(`${API_URL}/album`);
      setAlbums(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

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
  );
};

export default Albumbs;
