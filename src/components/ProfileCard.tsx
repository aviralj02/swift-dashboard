import InputLabel from "./InputLabel";

type Props = {
  user: User;
};

const ProfileCard = ({ user }: Props) => {
  const [firstName, lastName] = user.name.split(" ");

  return (
    <div className="flex flex-col gap-6 shadow-md border-2 rounded-md p-10">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center text-3xl font-medium text-primary w-24 h-24 bg-gray-100 rounded-full">
          {firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()}
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg font-medium text-primary">{user.name}</h2>
          <p className="text-sm font-medium opacity-40 text-primary">
            {user.email}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5 mb-10">
        <div className="flex flex-col gap-5 md:flex-row md:gap-12">
          <InputLabel label="User ID" value={user.id} id="userId" disabled />
          <InputLabel label="Name" value={user.name} id="name" disabled />
        </div>

        <div className="flex flex-col gap-5 md:flex-row md:gap-12">
          <InputLabel label="Email ID" value={user.email} id="email" disabled />
          <InputLabel
            label="Address"
            value={
              user.address.street +
              ", " +
              user.address.suite +
              ", " +
              user.address.city
            }
            id="address"
            disabled
          />
        </div>

        <div className="flex flex-col md:flex-row md:gap-12">
          <InputLabel label="Phone" value={user.phone} id="phone" disabled />
          <InputLabel hidden disabled />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
