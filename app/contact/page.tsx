import { Input, Link, Button, Textarea } from "@nextui-org/react";
import Swiper from "../components/Swiper"
import MessageBoard from "../components/MessageBoard";

export default function Contact() {
  return (
    <div>
      <Swiper />
      <div className="my-8 text-xl text-center">在线留言</div>
      <MessageBoard className="px-10" />
    </div>
  );
}