import { ActivityCalendar } from "react-activity-calendar";
import { HeroHighlight, Highlight } from "../../ui/hero-highlight";
import { Heading1 } from "lucide-react";

const data = [
  {
    date: "2024-01-01",
    count: 0,
    level: 1,
  },
  {
    date: "2024-08-02",
    count: 16,
    level: 4,
  },
  {
    date: "2024-11-29",
    count: 11,
    level: 3,
  },
];

const theme = {
  light: ["hsl(27, 0%, 100%)", "hsl(27, 100%, 61%)"],
};

export const WorkCardSeciton = () => {
  const handleSubmit = (note: string) => {
    console.log("Submitted note:", note);
  };

  return (
    <section id="wordcard" className="max-w-[75%] mx-auto py-24 sm:py-32">
      <div className="relative -top-10">
        <p className="text-xl md:text-2xl">
          This is my personal workstation. I record and output content in three
          areas: #programming, #fitness, #music by Wechat bot to check in.
          <Highlight className="text-black dark:text-white">
            One person company.
          </Highlight>
        </p>
      </div>
      <div className="flex">
        <ActivityCalendar data={data} theme={theme} />
      </div>
    </section>
  );
};
