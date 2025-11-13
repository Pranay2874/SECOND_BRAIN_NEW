
import axios from "axios";
import { useEffect } from "react";
import { Bin } from "../Icons/Bin";
import { Qlist } from "../Icons/Qlist";
import { ShareIcon } from "../Icons/ShareIcon";
import { BACKEND_URL } from "../config";

interface CardProps {
  type: "Youtube" | "Twitter" | "Text";
  title: string;
  link?: string;
  description: string;
  tags?: string;
  _id?: string; 
}

export const Card = ({ type, link, title, description, tags, _id }: CardProps) => {

  
  useEffect(() => {
    if (type === "Twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [type, link]);

  async function deleteContent() {
    if (!_id) return; 
    
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        data: { contentId: _id },
        headers: {
          
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Deleted");
      
      window.location.reload(); 
    } catch (e) {
      alert("Delete failed");
    }
  }

  const getYoutubeEmbedLink = (url: string) => {
    try {
      if (url.includes("youtu.be")) {
        const id = url.split("youtu.be/")[1].split("?")[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      if (url.includes("watch?v=")) {
        const id = url.split("v=")[1].split("&")[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      return "";
    } catch {
      return "";
    }
  };

  const embedUrl = type === "Youtube" ? getYoutubeEmbedLink(link || "") : "";

  return (
    <div className="p-4 bg-white rounded-md border border-gray-200 max-w-72 min-h-48 min-w-72 flex flex-col justify-between">

      <div className="flex justify-between mb-3">
        <div className="flex items-center text-md font-semibold">
          <div className="text-gray-500 pr-2">
            <Qlist />
          </div>
          {title}
        </div>
        <div className="flex items-center text-gray-500">
          <div className="pr-2 cursor-pointer">
            <ShareIcon />
          </div>
          <div onClick={deleteContent} className="cursor-pointer">
            <Bin />
          </div>
        </div>
       </div>

      
      {type === "Youtube" && embedUrl && (
        <iframe
          className="w-full h-40 rounded-md"
          src={embedUrl}
          title="YouTube video player"
          allowFullScreen
        ></iframe>
      )}

      {type === "Twitter" && link && (
        <blockquote className="twitter-tweet" data-dnt="true">
          <a href={link.replace("x.com", "twitter.com")}></a>
        </blockquote>
      )}

      <p className="text-gray-700 text-sm mb-1 mt-3">{description}</p>

      {tags && (
        <p className="bg-blue-100 text-blue-600 px-2 py-1 text-xs font-medium rounded-full">
          {tags}
        </p>
      )}
    </div>
  );
};