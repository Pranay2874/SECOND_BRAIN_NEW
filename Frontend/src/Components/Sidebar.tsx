import { Logo } from "../Icons/Logo";
import { TwitterIcon } from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { TextICON } from "../Icons/TextIcon";

export const Sidebar = () => {
  return (
    <div className="h-screen w-64 fixed bg-white left-0 top-0 p-6 shadow-md">
      <div className="flex items-center gap-2 mb-8">
        <Logo name="Second Brain" />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 text-gray-700 hover:text-black hover:bg-gray-200 rounded-md px-2 py-2 cursor-pointer">
          <TwitterIcon />
          <span>Tweets</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700 hover:text-black hover:bg-gray-200 rounded-md px-2 py-2 cursor-pointer">
          <YoutubeIcon />
          <span>YT Videos</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700 hover:text-black hover:bg-gray-200 rounded-md px-2 py-2 cursor-pointer">
          <TextICON />
          <span>Text</span>
        </div>
      </div>
    </div>
  );
};
