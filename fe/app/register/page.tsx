"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  async function handleRegister(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:8000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            phone,
            dob: dob || null,
            gender,
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || data.detail || "Register failed");
        return;
      }

      alert("Account created!");
      router.push("/login");

    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleRegister}
      style={{ display: "flex", flexDirection: "column", gap: 8 }}
    >
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
      <input type="date" value={dob} onChange={e => setDob(e.target.value)} />
      <select value={gender} onChange={e => setGender(e.target.value)}>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <button disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
