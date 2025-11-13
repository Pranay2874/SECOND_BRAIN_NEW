
import { CrossIcon } from "../Icons/CrossIcon";
import { Input } from "../Components/Input";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";


export const Modal = ({ open, onclose }: { open: boolean; onclose: (shouldRefresh?: boolean) => void }) => {
  const linkref = useRef<HTMLInputElement>(null);
  const typeref = useRef<HTMLSelectElement>(null);
  const titleref = useRef<HTMLInputElement>(null);
  const descriptionref = useRef<HTMLTextAreaElement>(null);
  const tagref = useRef<HTMLInputElement>(null);

  async function addcontent() {
    const link = linkref.current?.value;
    const type = typeref.current?.value;
    const description = descriptionref.current?.value;
    const title = titleref.current?.value;
    const tags = tagref.current?.value;

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        { link, type, description, title, tags },
        {
          headers: {
          
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Content added successfully!");
      
      onclose(true); 
    } catch (error) {
      console.error(error);
      alert("Failed to add content.");
      
      onclose(false); 
    }
  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-slate-950/70 fixed top-0 left-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-[450px]">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">Add New Content</h2>
              {/* Call onclose without argument to just close (no refresh) */}
              <div onClick={() => onclose(false)} className="cursor-pointer">
                <CrossIcon />
              </div>
            </div>

            <p className="text-gray-700 text-sm mb-6">Provide details about your content below.</p>

            <div className="space-y-4 text-gray-900">
              <div>
                <label className="text-sm font-medium">Link</label>
                <Input ref={linkref} placeholder="Enter content URL" />
              </div>

              <div>
                <label className="text-sm font-medium">Type</label>
                <select
                  ref={typeref}
                  className="border border-gray-300 w-full h-10 p-2 text-sm rounded-md focus:ring-2 focus:ring-[#4071f4]"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select type
                  </option>
                  <option value="Youtube">YouTube</option>
                  <option value="Twitter">Twitter</option>
                  <option value="Text">Text</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Title</label>
                <Input ref={titleref} placeholder="Enter title" />
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  ref={descriptionref}
                  placeholder="Short description"
                  className="border border-gray-300 w-full h-20 p-2 text-sm rounded-md focus:ring-2 focus:ring-[#4071f4] resize-none"
                ></textarea>
              </div>

              <div>
                <label className="text-sm font-medium">Tags</label>
                <Input ref={tagref} placeholder="Add tags (e.g. #learning #ai)" />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={addcontent}
                className="bg-[#4071f4] hover:bg-[#2f5ed8] text-white font-semibold text-md px-6 py-2 rounded-lg shadow-md transition-all"
              >
                Add Content
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};