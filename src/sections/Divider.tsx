export default function Divider() {
  return (
    <div className="w-full py-0 flex items-center justify-center bg-[#0d0f14]">
      <div className="w-full max-w-[1440px] px-20 flex items-center">
        <div className="flex-1 h-[1px] bg-[#2a2520]" />
        <div className="flex items-center gap-0 mx-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c9956b]" />
          <div className="w-10 h-[1px] bg-[#c9956b] mx-2" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#c9956b]" />
        </div>
        <div className="flex-1 h-[1px] bg-[#2a2520]" />
      </div>
    </div>
  );
}
