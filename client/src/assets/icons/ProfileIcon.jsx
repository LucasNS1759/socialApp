const ProfileIcon = ({ post }) => {
  return (
    <figure className="w-10 h-10 bg-gray-200 p-1 rounded-full">
      <img className="w-8 h-8 rounded-full"
        src={
          post && post?.user?.profile?.gender === "male"
            ? "/images/male.png"
            : "/images/female.png"
        }
        alt="imagen de profile por default"
      />
    </figure>
  );
};

export default ProfileIcon;

