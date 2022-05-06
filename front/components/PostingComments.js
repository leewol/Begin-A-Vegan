import CommentCard from "./CommentCard";

export default function PostingComments({ Comments }) {
  console.log(Comments);
  return (
    <>
      {Comments.map((commentInfo) => (
        <CommentCard key={commentInfo.id} commentInfo={commentInfo} />
      ))}
    </>
  );
}
