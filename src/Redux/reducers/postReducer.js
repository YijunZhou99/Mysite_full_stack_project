import{
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  ADD_POST,
  SEARCH_POST
} from "../actions/types";

const posts = JSON.parse(localStorage.getItem('postList'));
const initialState = {
  posts: posts,
  searchby: "",
  searchquery: "",
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
      };
     
    case GET_POSTS_FAIL:
      return {
        ...state,
        posts: [],
      };
    case ADD_POST:
      return {
        ...state,
        posts: state.posts,
      };
    case SEARCH_POST:
      return {
        ...state,
        searchby: action.payload.searchby,
        searchquery: action.payload.query,
      };
    default:
      return state;
  }
}