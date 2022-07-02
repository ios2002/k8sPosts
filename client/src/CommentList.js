import React from "react";

const CommentList = ({ comments }) => {
  let renderedComments = <li key={0}></li>;
  if (comments && comments.length > 0) {
    renderedComments = comments.map((comment) => {
      let content;

      if (comment.status === "approved") {
        content = comment.content;
      }

      if (comment.status === "pending") {
        content = "This comment is awaiting moderation";
      }

      if (comment.status === "rejected") {
        content = "This comment has been rejected";
      }

      return <li key={comment.id}>{content}</li>;
    });
  }

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
