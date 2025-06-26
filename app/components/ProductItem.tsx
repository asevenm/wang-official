import React from 'react'
import { InstrumentItem } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  item: InstrumentItem;
  type: 'equipment' | 'reagents';
}

const ProductItem = ({ item, type }: Props) => {

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="aspect-w-16 aspect-h-9 relative">
        {/* 图片占位符 */}
        <div className="w-full h-48 bg-gray-200"></div>
        <Image src={item.images?.[0]?.url || ''} alt={item.name} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{item.name}</h3>
        <p className="text-gray-600">{item.desc}</p>
        <Link href={`/${type}/${item.id}`}>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            了解详情
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductItem