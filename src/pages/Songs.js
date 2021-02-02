import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, List, Avatar, Tooltip, Popconfirm, Empty, message } from 'antd';
import { useLocation } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { default as InfiniteList } from '@researchgate/react-intersection-list';
import time from '../helpers/time';
import { API_URL } from '../constants';
import './Songs.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Songs = () => {
  const query = useQuery();

  const [albumId] = useState(Number(query.get('albumId')));
  const [artistId] = useState(Number(query.get('artistId')));
  const [songs, setSongs] = useState([]);

  // Initial fetch
  useEffect(async () => {
    try {
      const res = await axios.get(`${API_URL}/song`);

      let filteredSongs = res.data.data;

      if (artistId) {
        filteredSongs = filteredSongs.filter((song) => song.artistId === artistId);
      }

      if (albumId) {
        filteredSongs = filteredSongs.filter((song) => song.albumId === albumId);
      }

      setSongs(filteredSongs);
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
      </React.Fragment>
    );
  };

  return (
    <>
      {!!songs.length ? (
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
      )}
    </>
  );
};

export default Songs;
