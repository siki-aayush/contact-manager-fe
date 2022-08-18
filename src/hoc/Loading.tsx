import { Space, Spin } from "antd";

interface LoadingPropsInterface {
  isLoading: boolean;
  children: React.ReactNode;
}
const Loading = ({ isLoading, children }: LoadingPropsInterface) => {
  return isLoading ? (
    <Space size="middle" className="spinner-wrapper">
      <Spin size="large" />
    </Space>
  ) : (
    <>{children}</>
  );
};
export default Loading;
