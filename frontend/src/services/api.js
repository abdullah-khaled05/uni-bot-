export const sendMessage = async (message) => {
  const res = await fetch("http://127.0.0.1:8000/test", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ hello })
  });

 

  return res.json();
};