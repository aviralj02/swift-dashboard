import { LoaderCircle, MoveLeft } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ProfileCard from "../components/ProfileCard";

const ProfilePage = () => {
  const [userData, setUserData] = useState<User | null>(null);

  const router = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();

      setUserData(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData) {
    return (
      <div className="absolute left-1/2 bottom-1/2 flex gap-2 text-lg font-medium self-center">
        Loading Profile{" "}
        <LoaderCircle className="w-5 h-auto text-primary animate-spin" />
      </div>
    );
  }

  return (
    <PageWrapper className="flex flex-col w-full">
      <div className="my-10 flex items-center gap-4">
        <button aria-label="back-button" onClick={() => router(-1)}>
          <MoveLeft className="w-6 h-auto text-primary" />
        </button>

        <h1 className="text-xl font-semibold text-primary">
          Welcome, {userData.name}
        </h1>
      </div>

      <ProfileCard user={userData} />
    </PageWrapper>
  );
};

export default ProfilePage;
