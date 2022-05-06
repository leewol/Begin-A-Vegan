import PostCard from "./PostCard";

export default function PostCardStates({ postingList, setPostingList }) {
  return (
    <>
      {postingList.map((posting) => (
        <PostCard key={posting.id} posting={posting} setPostingList={setPostingList} />
      ))}
    </>
  );
}
