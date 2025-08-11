import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";

type UserCardProps = {
  user: Models.Document;
};

const buildFileDownloadUrl = (fileId: string) => {
  if (!fileId) return "";
  return `https://fra.cloud.appwrite.io/v1/storage/buckets/689628660035b0ddbe53/files/${fileId}/download?project=6896256c0023d71c5cff`;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link to={`/profile/${user.$id}`} className="user-card">
      <img
        // src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        src={user.imageId ? buildFileDownloadUrl(user.imageId) : user.imageUrl}
        alt="creator"
        className="object-cover rounded-full w-14 h-14"
      />

      <div className="flex-col gap-1 flex-center">
        <p className="text-center base-medium text-light-1 line-clamp-1">
          {user.name}
        </p>
        <p className="text-center small-regular text-light-3 line-clamp-1">
          @{user.username}
        </p>
      </div>

      <Button type="button" size="sm" className="px-5 shad-button_primary">
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;
