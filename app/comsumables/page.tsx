import Swiper from "../components/Swiper";
import Cascader from "../components/Cascader";
import Products from '../components/Products';

const tree = [{
  name: '分类1',
  id: 1,
  children: [
    {
      name: 'child1',
      id: 2,
    },
    {
      name: 'child2',
      id: 3,
    },
    {
      name: 'child3',
      id: 4,
    },
  ]
}]

export default function Consumables() {
  return (
    <>
      <Swiper />
      <div className="flex">
        <div className="h-full overflow-y-auto pb-[17rem] text-gray-400 text-sm pt-4 pr-4 [&>*]:pt-6 xl:pb-60">
          {tree.map((item) => (
            <div key={item.id}>
              <h3 className="pb-6 font-medium text-zinc-50">分类一</h3>
              <ul className="relative after:absolute after:top-0 after:left-3 after:w-px after:h-full after:bg-zinc-800">
                {item.children.map((i) => (
                  <li key={i.id}>
                    <a className="block relative z-10 rounded-lg px-3 py-2 transition-colors duration-150 group bg-zinc-900 text-zinc-100 font-medium hover:bg-zinc-900 hover:text-zinc-100" active="bg-zinc-900 text-zinc-100 font-medium">
                      <span className="pl-6 py-0.5 border-l group-hover:border-indigo-500 duration-150 border-indigo-500">{i.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Products />
      </div>
    </>
  );
}