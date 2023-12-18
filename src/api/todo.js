let token;

const getUser = () => {
  let temp = JSON.parse(localStorage.getItem("user"));
  if (temp) {
    token = temp.token;
    console.log(token);
  }
};

const BASE_URL = "https://cube-todo-backend.onrender.com/";

const create = async (data) => {
  getUser();;
  try {
    const res = await fetch(`${BASE_URL}todo/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error("Create error:", err);
    throw err; // Throw the error for better handling
  }
};

const update = async (Id, data) => {
  try {
    const res = await fetch(`${BASE_URL}todo/${Id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error("Update error:", err);
    throw err;
  }
};

const remove = async (Id) => {
  try {
    const res = await fetch(`${BASE_URL}todo/${Id}`, {
      method: "DELETE",
      headers: {
        "x-access-token": token,
      },
    });

    if (res.status === 204) {
      // Successful DELETE with no content
      return { success: true };
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Delete error:", err);
    throw err;
  }
};


const read = async () => {
  getUser(); 
  try {
    const res = await fetch(`${BASE_URL}todo/`, {
      headers: {
        "x-access-token": token,
      },
    });
    return await res.json();
  } catch (err) {
    console.error("Read error:", err);
    throw err;
  }
};

export { create, read, update, remove };
