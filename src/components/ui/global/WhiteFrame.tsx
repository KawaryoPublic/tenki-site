export default function WhiteFrame({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8 w-full h-full ${className ? className : ""}`}>
      {children}
    </div>
  );
}