import * as ActionTypes from "./ActionTypes";

export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: {
    dishId,
    rating,
    author,
    comment,
  },
});
