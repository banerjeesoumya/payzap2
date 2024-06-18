/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
export const Users = () => {
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const name = searchParams.get("name");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/bulk?filter=${filter}`);
        setUsers(response.data.users);
      } catch (err) {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [filter]);

  const filteredUsers = name ? users.filter((user) => user.firstName !== name) : users;

  return (
    <>
      <div className="font-bold mt-6 text-lg">
        Users
      </div>
      <div className="my-2">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      {loading ? (
        <div>Loading users...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div>
          {filteredUsers.map(user => <User key={user._id} user={user} />)}
        </div>
      )}
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center bg-white p-2 rounded-lg shadow mb-2">
      <div className="flex items-center">
        <div className="rounded-full h-10 w-10 bg-slate-200 flex items-center justify-center text-xl">
          {user.firstName[0]}
        </div>
        <div className="ml-2">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <Button
        label={"Send Money"}
        onClick={() => {
          navigate(`/send?id=${user._id}&name=${user.firstName}`);
        }}
      />
    </div>
  );
}
