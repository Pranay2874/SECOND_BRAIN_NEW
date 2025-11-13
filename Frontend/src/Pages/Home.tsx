import { Button } from "../Components/Button";
import { PlusIcon } from "../Icons/PlusIcon";
import { Sidebar } from "../Components/Sidebar";
import { Bulb } from "../Icons/Bulb";
import { Logo } from "../Icons/Logo";
import { Modal } from "../Components/Modal";
import { ShareIcon } from "../Icons/ShareIcon";
import { Card } from "../Components/Card";
import useOnlineStatus from "../Hooks/useOnlinestatus";
import { useState } from "react";
import { Logout } from "../Icons/Logout";
import { useNavigate } from "react-router-dom";
import { useContent } from "../Hooks/useContent";

export const Home = () => {
  const navigate = useNavigate();
  const onlineStatus = useOnlineStatus();
  const [modalOpen, setModalOpen] = useState(false);
  
  const [refreshKey, setRefreshKey] = useState(0); 
    
  
  const content = useContent(refreshKey); 

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    alert("You have been logged out.");
    navigate("/signin");
  }
    
  
  const handleModalClose = (shouldRefresh = false) => {
    setModalOpen(false);
    if (shouldRefresh) {
      setRefreshKey(prevKey => prevKey + 1);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100">
        <div className="mt-5">
          <Logo name="All Notes" />
        </div>

      
        <Modal open={modalOpen} onclose={handleModalClose} />

        <div className="flex gap-4 justify-end -mt-5">
          <Button
            startIcon={<Bulb isonline={onlineStatus} />}
            variant="secondary"
            text={onlineStatus ? "Online" : "Offline"}
          />

          <Button
            variant="primary"
            onClick={() => setModalOpen(true)}
            text="Add Content"
            startIcon={<PlusIcon size="md" />}
          />

          <Button
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
          />

          <Button
            variant="logout"
            text="Logout"
            onClick={logout}
            startIcon={<Logout />}
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-7 overflow-y-auto">
          {content.map((item: any) => (
            <Card
              key={item._id}       
              _id={item._id} 
              type={item.type}
              tags={item.tags}
              link={item.link}
              description={item.description}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};