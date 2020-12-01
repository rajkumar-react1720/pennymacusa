import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ShowsList.css';

const ShowsList = () => {
  let history = useHistory();
  const [showsList, setShowsList] = useState([]);
  const [query, setquery] = useState('');

  const fetchShowList = () => {
    fetch(`http://api.tvmaze.com/search/shows?q=${query}`)
      .then(
        function (response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
          response.json().then(function (data) {
            console.log(data);
            setShowsList(data);
          });
        }
      )
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
  }

  const handleOnChange = (e) => {
    setquery(e.target.value);
  }

  return (
    <div className='shows-list-container'>
      <div>
        <span>
          <input placeholder='Search show titles' onChange={handleOnChange} className='input-container'/>
        </span>
        <button className='button-container' onClick={fetchShowList}>Search</button>
      </div>

      {
        showsList && showsList.map(show =>
          {
            if((show.show.image && show.show.image.medium  !== null) && (show.show.summary && show.show.summary !== null)) {
              return(
                <div className='list-image'>
                <img className='image-container' src={show.show.image && show.show.image.medium}></img>
                <div className='list-container'>
                  <div className='list-summary'>
                    <div></div>
                    <div><h1 className='title'>{show.show.name}</h1>
                      <p className='paragraph'>{show.show.summary && show.show.summary.replace(/<[^>]*>/g, '')}</p>
                      <button className='episode-button'>Show Episodes</button>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
              )
            }
          }
        )
      }
    </div>
  );
};

export default ShowsList;