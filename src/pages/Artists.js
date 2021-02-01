import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Tooltip, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';
import {
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
  CaretRightOutlined
} from '@ant-design/icons';
import { API_URL } from '../constants';
import './Artists.css';

const Artists = () => {
  const [artists, setArtists] = useState([]);

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
  );
};

export default Artists;
