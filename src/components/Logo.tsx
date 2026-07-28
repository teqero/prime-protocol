interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = '', size = 48 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle */}
      <circle cx="50" cy="50" r="48" stroke="#c9956b" strokeWidth="1.5" fill="none" opacity="0.6" />
      {/* Inner circle */}
      <circle cx="50" cy="50" r="42" stroke="#c9956b" strokeWidth="0.5" fill="none" opacity="0.3" />
      {/* Top accent arc */}
      <path
        d="M 14 50 A 36 36 0 0 1 86 50"
        stroke="#c9956b"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
      {/* P letter left */}
      <text
        x="32"
        y="62"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="36"
        fontWeight="600"
        fill="#c9956b"
      >
        P
      </text>
      {/* P letter right */}
      <text
        x="52"
        y="62"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="36"
        fontWeight="300"
        fill="#f5f0e8"
      >
        P
      </text>
      {/* Bottom dot */}
      <circle cx="50" cy="74" r="2" fill="#c9956b" opacity="0.6" />
    </svg>
  );
}
