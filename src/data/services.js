import { FaCode, FaLaptopCode, FaPaintBrush } from "react-icons/fa";

export const services = {
  uz: [
    {
      id: 1,
      icon: <FaCode />,
      title: "Frontend Development",
      description: "Zamonaviy va tezkor frontend web ilovalar yarataman (React, Next.js).",
    },
    {
      id: 2,
      icon: <FaLaptopCode />,
      title: "Web Applications",
      description: "Landing page va kichik web app'larni toza va tushunarli kod bilan ishlab chiqaman.",
    },
    {
      id: 3,
      icon: <FaPaintBrush />,
      title: "UI Implementation",
      description: "Figma dizaynlarni responsive va pixel-perfect holatda kodga o'tkazaman.",
    },
  ],
  en: [
    {
      id: 1,
      icon: <FaCode />,
      title: "Frontend Development",
      description: "I create modern and fast frontend web applications (React, Next.js).",
    },
    {
      id: 2,
      icon: <FaLaptopCode />,
      title: "Web Applications",
      description: "I develop landing pages and small web apps with clean and understandable code.",
    },
    {
      id: 3,
      icon: <FaPaintBrush />,
      title: "UI Implementation",
      description: "I convert Figma designs into code in responsive and pixel-perfect format.",
    },
  ]
};

export default services;