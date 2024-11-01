import { ActivityCalendar } from "react-activity-calendar";
import { HeroHighlight, Highlight } from "../../ui/hero-highlight";
// import { GET as runGet } from "../../../app/api/run/route";
import dayjs from "./../../../node_modules/dayjs/esm/index";

const cdata = [
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

// export async function getServerSideProps(context: any) {
//   try {
//     console.log('111111')
//     const data = await runGet();
//     console.log(data, '2222222')
//     return { props: { data } };
//   } catch (error) {
//     // 处理错误，可以返回错误信息或进行其他操作
//     return { props: { error: 'Failed to fetch data' } };
//   }
// }

function getLevel(metre: number): number {
  if (metre < 2000) {
    return 1;
  } else if (metre >= 2000 && metre < 4000) {
    return 2;
  } else if (metre >= 4000 && metre < 6000) {
    return 3;
  } else if (metre >= 6000) {
    return 4;
  } else {
    return 0;
  }
}

export const WorkCardSeciton = ({ data }: any) => {
  const runData = data
    ?.map((item: any) => ({
      ...item,
      date: dayjs(item.endTime).format("YYYY-MM-DD"),
      level: getLevel(item.kilometre),
      count: 1,
    }))
    .reverse();

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
      <div className="flex gap-10">
        <div className="flex-1 min-w-[40%]">
          <ActivityCalendar data={cdata} theme={theme} />
        </div>
        <div className="flex-1 min-w-[40%]">
          <ActivityCalendar
            data={runData}
            theme={theme}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </section>
  );
};
