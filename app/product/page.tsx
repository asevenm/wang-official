import Swiper from "@/app/components/Swiper";
// import { fetchTypes } from '@/app/lib/data/equipment';
import Cascader from "../components/Cascader";
import Products from '../components/Products';
import { catgories } from "./const";



export default async function Page() {
  // const res = await fetchTypes();
  // console.log('res', res);
  const renderBlock = (item:  any) => {
    return (
            <div key={item.key}>
              <div className="text-base mb-4 flex items-center">
                <i className="w-1 bg-primary mr-1 h-4" />
                {item.name}
              </div>
              <Products />
            </div>
    )
  }
  return (
    <div>test</div>
  );
}