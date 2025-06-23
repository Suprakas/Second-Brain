import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "../components/Card"; // Adjust import if needed

type SharedContent = {
  _id?: string;
  title: string;
  link: string;
  type: string;
};

const SharedBrain = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [sharedData, setSharedData] = useState<SharedContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/v1/brain/${id}`)
      .then(res => res.json())
      .then(data => {
        setUsername(data.username || "");
        setSharedData(data.content || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  return (
    <div className="bg-slate-200 w-full min-h-screen">
      <div className="flex justify-between">
        <div className="font-bold text-3xl mt-4 ml-8">
          Shared Content by {username ? username : "Second Brain"} 🧠
        </div>
      </div>
      <div className="ml-7 mt-6 flex flex-wrap gap-x-3 gap-y-5">
        {loading ? (
          <div className="text-2xl font-semibold">Loading...</div>
        ) : sharedData.length > 0 ? (
          sharedData.map((item, idx) => (
            <Card
              key={item._id || idx}
              title={item.title}
              link={item.link}
              type={item.type === "twitter" || item.type === "youtube" ? item.type : "youtube"}
            />
          ))
        ) : (
          <div className="text-2xl font-semibold">
            No shared content found.
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedBrain;