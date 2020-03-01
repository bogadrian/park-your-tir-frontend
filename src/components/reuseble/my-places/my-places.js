import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { startGetMe } from '../../../redux/getMe/getMe-actions';
import { selectMe } from '../../../redux/getMe/getMe-selector';

import MyPlacesContainer from './my-place-container';
import Pagination from './pagination';

import './my-places.scss';

const MyPlaces = ({ startGetMe, me }) => {
  const posts = me.places;

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    startGetMe();
  }, [startGetMe]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="myplaces-container">
      <div>
        {posts ? (
          <MyPlacesContainer posts={currentPosts} />
        ) : (
          <h2>
            No Place Yet!{' '}
            <Link to="/create-place">
              <div style={{ color: '#1C9AAE' }}>Please create one!</div>
            </Link>
          </h2>
        )}

        {posts.length > postsPerPage ? (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  me: selectMe
});

const mapDispatchToProps = dispatch => ({
  startGetMe: () => dispatch(startGetMe())
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPlaces);
