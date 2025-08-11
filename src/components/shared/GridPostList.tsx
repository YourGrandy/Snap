import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { PostStats } from "@/components/shared";
import { useUserContext } from "@/context/AuthContext";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  const buildFileDownloadUrl = (fileId: string) => {
    if (!fileId) return "";
    return `https://fra.cloud.appwrite.io/v1/storage/buckets/689628660035b0ddbe53/files/${fileId}/download?project=6896256c0023d71c5cff`;
  };

  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80 group">
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <img
              src={
                user.imageId
                  ? buildFileDownloadUrl(post.imageId)
                  : "/assets/icons/profile-placeholder.svg"
              }
              alt="post"
              className="object-cover w-full h-full transition-all duration-200 hover:scale-110 hover:opacity-50"
            />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start flex-1 gap-2">
                <img
                  src={
                    post.creator?.imageId
                      ? buildFileDownloadUrl(post.creator.imageId)
                      : "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="object-cover w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
