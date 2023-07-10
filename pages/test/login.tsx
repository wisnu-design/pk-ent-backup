import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data); // Handle the response data as needed
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      router.push("/test");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="text-white">
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            className="text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            className="text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
