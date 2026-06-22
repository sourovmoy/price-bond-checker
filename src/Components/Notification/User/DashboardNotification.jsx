import React, { useState, useRef } from "react";
import { FiBell } from "react-icons/fi";
import NotificationModal from "../../Modal/UserModal/NotificationModal";
import useAuth from "../../../Hooks/useAuth";
import useNotificationCount from "../../../Hooks/useNotificationCount";
import useMarkNotificationsRead from "../../../Hooks/useMarkNotificationsRead ";

const DashboardNotification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const buttonRef = useRef(null);

  const { data: unreadCount = 0 } = useNotificationCount();
  const { mutate: markAllRead } = useMarkNotificationsRead();

  const displayCount = unreadCount > 9 ? "9+" : unreadCount;

  const handleBellClick = () => {
    const willOpen = !isOpen;
    setIsOpen(willOpen);

    if (willOpen && unreadCount > 0) {
      markAllRead();
    }
  };

  if (!user) return null;

  return (
    <div className="r">
      <button
        ref={buttonRef}
        onClick={handleBellClick}
        className="relative text-gray-500 hover:text-[#244B43] transition-colors"
      >
        <FiBell size={20} />

        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[9px] font-semibold leading-none">
            {displayCount}
          </span>
        )}
      </button>

      <NotificationModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default DashboardNotification;
