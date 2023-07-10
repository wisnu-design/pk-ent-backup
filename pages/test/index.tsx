import React, { useEffect, useState } from "react";

type Props = {};

const Index = () => {
  const [data, setData] = useState<any>([]);

  const fetching = async () => {
    const url = "http://localhost:8080/user";
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    fetching();
  }, []);

  console.log(data);
  return (
    <div>
      {data.map((v: any) => {
        return <div key={v.id}>{v.name}</div>;
      })}
    </div>
  );
};

export default Index;
