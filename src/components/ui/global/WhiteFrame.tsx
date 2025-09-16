export default function WhiteFrame({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-gray-200 rounded-lg shadow-md p-2 lg:p-4 ${className ? className : ""}`}>
      {children}
    </div>
  );
}