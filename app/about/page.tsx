import Image from "next/image";
import Swiper from "../components/Swiper";
export default function About() {
  return (
    <div>
      {/* <Image
        src="/images/about/image-001.jpg"
        alt=""
        width={400}
        height={500}
        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      /> */}
      <Swiper
        dataSources={[
          '/images/about/image-001.jpg',
          '/images/about/image-002.jpg',
          '/images/about/image-003.png',
          '/images/about/image-004.jpg',
          '/images/about/image-005.jpg',
          '/images/about/image-006.jpg',
        ]}
      />
      <div className="my-4 py-2 px-4 bg-primary-600 rounded text-white">关于我们</div>
      <p className="indent-8">
        <b>上海森昌生物科技有限公司</b>主要从事高科技产品研发和欧美先进的生命科 学实验产品在大中国区的市场推广，包括生理学实验设备、药理学实验设备、毒理学实验设备、神经科学实验设备、心理学实验设备、运动科学、人因工程、动物学 等学科的实验设备，并负责产品的售前咨询、售后服务，技术支持，国际技术交流 等。我公司员工均毕业于国内著名大专院校，具有本科以上学历，良好的专业技术知识，且每位售后服务工程师均受过厂家以及我司严格的专业技术培训，确保为用户提供一流的服务，在广大用户中已树立起良好的信誉。
      </p>
      <p className="indent-8">
        我们的宗旨是:简单，坦诚，客户至上。我们秉承高品质的产品、良好的信誉、专业的售前咨询和完善的售后服务。我公司将在系统化、专业化的基础上，更多的引进国际最先进的生命科学研究实验设备及仪器，并根据用户需求研发更适合国内用户的产品，组织更多的专业技术培训和学术交流，以优质的产品和服务为祖国科技事业的发展做出贡献。
      </p>
      <p className="indent-8">
        我公司客户群体包括:清华大学、北京大学，复旦大学、上海交通大学，同济大学、华东理工大学大学、中国科学院第二军医大学、浙江大学、重庆医科大学等全国一流大学;中国科学院药物研究所，中国科学院神经所、中国人民解放军军事科学院军事医学研究院等全国一流研究机构;北京协和医院、华山医院、华东医院、瑞金医院、鼓楼医院等国内一流著名医院。
      </p>
    </div>
  );
}