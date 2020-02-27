import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { startGetMe } from '../../../redux/getMe/getMe-actions';
import { selectMe } from '../../../redux/getMe/getMe-selector';

import MyPlacesContainer from './my-place-container';
import Pagination from './pagination';
import Spinner from '../../spinner/spinner';

import './my-places.scss';

const MyPlaces = ({ startGetMe, me}) => {
  const posts = me.places;

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  console.log(currentPage);

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
        {me ? <MyPlacesContainer posts={currentPosts} /> : null}

        {posts.length > postsPerPage ? (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        ) : (
          <Spinner />
        )}
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
