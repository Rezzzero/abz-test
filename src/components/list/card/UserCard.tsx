import "./UserCard.scss";
import type { UserCardProps } from "../types";
import { truncateText } from "../../../utils/text/truncateText";

export const UserCard = ({ user }: { user: UserCardProps }) => {
  return (
    <div className="card">
      <img src={user.photo} alt={user.name + " photo"} className="card__img" />
      <p className="card__info-text">{truncateText(user.name, 35)}</p>

      <div className="card__info">
        <p className="card__info-text">{truncateText(user.position, 38)}</p>
        <p className="card__info-text">{truncateText(user.email, 32)}</p>
        <p className="card__info-text">{user.phone}</p>
      </div>
    </div>
  );
};
