const BASE_URL ="https://cube-todo-backend.onrender.com/"

const signup = async (user) => {
  try {
    const res = await fetch(BASE_URL + "user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": BASE_URL,
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

const login = async (user) => {
  try {
    const res = await fetch(BASE_URL + "user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": BASE_URL,
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

export {signup, login}