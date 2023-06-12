import Layout from "@/components/tempalte/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Props = {};

const index = () => {
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();
  const fetching = async () => {
    const loggedin = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    // if (!token) {
    //   router.push("/403");
    //   return;
    // }
    const URL = `https://dummyjson.com/users/${loggedin}`;
    const data = await fetch(URL);
    const user = await data.json();

    setUserData(user);
  };

  useEffect(() => {
    fetching();
  }, []);

  return (
    <Layout >
      <div className="text-white">{userData ? userData.username : null}</div>
      <div>
        {userData ? userData.firstName + ` ` + userData.lastName : null}
      </div>
      <div>
        <img src={userData ? userData.image : null} alt="image" />
      </div>

      url/book = books
      url/kategory = kategory
    </Layout>
  );
};

export default index;
