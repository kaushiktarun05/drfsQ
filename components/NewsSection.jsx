import React from "react";
import CardHeader from "./CardHeader";

function NewsItem({ time, source, title }) {
  return (
    <article className="mb-5 pb-5 border-b border-white border-opacity-10">
      <div className="text-sm text-[#B1C7DF] mb-1.5">
        <span>{time} | </span>
        <span className="font-medium">{source}</span>
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </article>
  );
}

function NewsSection() {
  const newsItems = [
    {
      time: "17 minutes ago",
      source: "Discover Magazine",
      title: "Molestias facilis quis qui aut quas quisquam at quis quisquam.",
    },
    {
      time: "17 minutes ago",
      source: "Flagzz",
      title: "Quidem inventore officia similique.",
    },
    {
      time: "17 minutes ago",
      source: "MagTZ",
      title: "Nihil fugiat est et perferendis assumenda eos ipsa aperiam.",
    },
    {
      time: "17 minutes ago",
      source: "MTB",
      title: "Qui aut sed maiores ullam ipsam doloremque.",
    },
  ];

  return (
    <section>
      <CardHeader title="News" subtitle="May to June 2021" showActions={true} />

      <div className="p-5">
        {newsItems.map((item, index) => (
          <NewsItem
            key={index}
            time={item.time}
            source={item.source}
            title={item.title}
          />
        ))}
      </div>
    </section>
  );
}

export default NewsSection;
