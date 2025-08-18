import "./UserCard.scss";
import type { UserCardProps } from "../types";

export const UserCard = ({ user }: { user: UserCardProps }) => {
  return (
    <div className="card">
      <img src={user.photo} alt={user.name + " photo"} className="card__img" />
      <p className="card__info-text">{user.name}</p>

      <div className="card__info">
        <p className="card__info-text">{user.position}</p>
        <p className="card__info-text">{user.email}</p>
        <p className="card__info-text">{user.phone}</p>
      </div>
    </div>
  );
};
