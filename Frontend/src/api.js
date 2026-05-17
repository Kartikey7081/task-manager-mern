const API_URL = "http://localhost:3000/api/notes";

export const getTodos = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addTodo = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteTodo = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};