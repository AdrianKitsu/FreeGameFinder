import { useEffect } from "react";

const createFavList = () => {
  const { user } = Auth0();

  useEffect(() => {
    fetch(`/api/${user._id}/favorites`, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {});
  });
};

export default createFavList;
