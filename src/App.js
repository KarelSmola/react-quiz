import React, { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:9000/questions`);
      const data = await response.json();
      console.log(data);
    };

    fetchData();
  }, []);

  return <div></div>;
};

export default App;
