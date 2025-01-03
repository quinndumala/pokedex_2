export interface LoadingProps {
  style?: "spinner" | "dots" | "ring";
  size?: "xs" | "sm" | "md" | "lg";
}

const Loading = ({ style, size }: LoadingProps) => {
  const loadingStyle = style || "spinner";
  const loadingSize = size || "lg";

  return (
    <div className="flex items-center justify-center">
      <span
        className={`loading loading-${loadingStyle} loading-${loadingSize}`}
      ></span>
    </div>
  );
};

export default Loading;
