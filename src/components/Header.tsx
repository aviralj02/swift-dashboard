import { Link } from "react-router";
import SwiftLogo from "./icons/SwiftLogo";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

const Header = () => {
  const [userData, setUserData] = useState<User | null>(null);

  const [firstName, lastName]: string[] = userData
    ? userData?.name.split(" ")
    : ["", ""];

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

  return (
    <div className="bg-primary flex justify-between items-center h-16 w-full md:px-28 px-6">
      <Link to="/" className="transform hover:scale-95 transition-all">
        <SwiftLogo />
      </Link>

      {userData ? (
        <Link to="/profile" className="flex items-center gap-2">
          <div className="bg-white w-8 h-8 flex items-center justify-center rounded-full text-primary font-medium">
            {firstName.charAt(0).toUpperCase() +
              lastName.charAt(0).toUpperCase()}
          </div>

          <span className="text-white hidden sm:inline-block">
            {userData.name}
          </span>
        </Link>
      ) : (
        <LoaderCircle className="w-4 h-auto text-white animate-spin" />
      )}
    </div>
  );
};

export default Header;
