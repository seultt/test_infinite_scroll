import axios from 'axios';

export const getTheData = (page) => {
  return (dispatch) => {
    dispatch({
      type: 'DATA_REQUEST',
    })
    axios.get('https://www.techinasia.com/wp-json/techinasia/2.0/posts?page='+page+'&per_page=5', true)
    .then(res => {
      // console.log(res.data)
      dispatch({
        type: 'DATA_SUCCESS',
        payload: res.data.posts
      })
    })
  }
}