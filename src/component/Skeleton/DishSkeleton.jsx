import { Skeleton } from 'antd';

const DishSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
    <div className="h-48 bg-gray-200 animate-pulse" />
    <div className="flex justify-between items-center p-4">
      <div className="flex-1">
        <Skeleton active paragraph={{ rows: 1, width: '80%' }} title={false} />
        <Skeleton.Button active size="small" style={{ width: 80, marginTop: 8 }} />
      </div>
      <Skeleton.Avatar active size="large" shape="square" className="rounded-xl" />
    </div>
  </div>
);
export default DishSkeleton