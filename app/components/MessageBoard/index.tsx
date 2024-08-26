import React from 'react';
import { Input, Textarea, Button } from '@nextui-org/react';
import clsx from 'clsx';

type Props = {
  className?: string;
  // onClose?: () => void;
  size?: 'lg' |'md' |'sm';
}

const MessageBoard = ({ className, size }: Props) => {
  return (
    <form className={clsx(className, "flex flex-col gap-4")}>
        <Input size={size} isRequired label="标题" placeholder="请输入标题" type="title" />
        <Textarea size={size} isRequired label="内容" placeholder="请输入内容" type="content" />
        <Input size={size} label="联系人" placeholder="请输入联系人" type="name" />
        <Input size={size} label="联系电话" placeholder="请输入联系电话" type="phone" />
        <Input size={size} label="邮箱" placeholder="请输入邮箱" type="email" />
        <Input size={size} label="公司名称" placeholder="请输入公司名称" type="company" />
        <Textarea size={size} label="联系地址" placeholder="请输入联系地址" type="adress" />
        <div className="flex gap-2 justify-end">
          {/* {onClose && (
            <Button onClick={onClose}>
              取消 
            </Button>
          )} */}
          <Button>
            重置 
          </Button>
          <Button color="primary">
            提交
          </Button>
        </div>
      </form>
  );
}

export default MessageBoard;