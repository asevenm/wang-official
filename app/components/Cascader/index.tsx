'use client';

import Item from './Item';

export default function Cascader() {
  const groups = [
    { name: '分组1', id: 1, children: [{ name: '子组1', id: 5 }, { name: '子组2', id: 6 }] },
    { name: '分组2', id: 2, children: [{ name: '子组3', id: 7 }, { name: '子组4', id: 8 }] },
    { name: '分组3', id: 3, children: [{ name: '子组5', id: 9 }, { name: '子组6', id: 10 }] },
    { name: '分组4', id: 4, children: [{ name: '子组7', id: 11 }, { name: '子组8', id: 12 }] },
  ]
  return (
    <div>
      <div></div>
      <ul className="flex flex-col w-52 bg-white">
        {groups.map((group) => (
          <li className="relative p-4 text-black text-center cursor-pointer" key={group.id}>
            <Item name={group.name} items={group.children} />  
          </li>
        ))}
      </ul>
    </div>
  );
}