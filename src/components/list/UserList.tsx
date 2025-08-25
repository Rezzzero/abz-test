import { useCallback, useEffect, useState } from "react";
import "../../styles/_globals.scss";
import { Button } from "../button/Button";
import "./UserList.scss";
import type { UserCardProps } from "./types";
import axios from "axios";
import { UserCard } from "./card/UserCard";

interface DataTypes {
  total_pages: number;
  total_users: number;
  count: number;
  page: number;
  links: {
    next_url: string;
    prev_url: string;
  };
  users: UserCardProps[];
}

export const UserList = ({ token }: { token: string }) => {
  const [data, setData] = useState<DataTypes | null>(null);
  const [page, setPage] = useState(1);
  const [showCount, setShowCount] = useState(6);

  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(
    async (page: number) => {
      if (!token) return;
      setLoading(true);
      try {
        const res = await axios.get(
          `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData((prev) => {
          if (!prev) return res.data;
          return {
            ...res.data,
            users: [...prev.users, ...res.data.users],
          };
        });
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    fetchUsers(page);
  }, [page, token, fetchUsers]);

  const handleShowMore = () => {
    if (!data) return;
    setShowCount((prev) => prev + 6);
    if (page < data.total_pages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="user-list container">
      <h1 className="user-list__title">Working with GET request</h1>
      <div className="user-list__cards">
        {data?.users.slice(0, showCount).map((user) => (
          <UserCard key={user.id} user={user} />
        ))}

        {loading && <p className="user-list__loading">Loading...</p>}
      </div>
      {data && data?.total_users > showCount && (
        <Button
          text="Show more"
          type="button"
          onClick={() => handleShowMore()}
        />
      )}
    </div>
  );
};
