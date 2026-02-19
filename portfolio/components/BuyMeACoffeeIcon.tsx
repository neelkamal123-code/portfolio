type BuyMeACoffeeIconProps = {
  size?: number;
  className?: string;
};

export function BuyMeACoffeeIcon({ size = 14, className }: BuyMeACoffeeIconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <defs>
        <filter id="bm-depth" x="-25%" y="-25%" width="150%" height="170%">
          <feDropShadow dx="0" dy="2.2" stdDeviation="1.4" floodColor="#000000" floodOpacity="0.48" />
          <feDropShadow dx="0" dy="5.2" stdDeviation="2.6" floodColor="#000000" floodOpacity="0.22" />
        </filter>
        <linearGradient id="bm-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.36" />
          <stop offset="100%" stopColor="#A4C7F7" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="bm-liquid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFE99A" />
          <stop offset="100%" stopColor="#F2BE45" />
        </linearGradient>
      </defs>
      <g filter="url(#bm-depth)">
        <path
          d="M22.2 17.2c1.3-2.6 5.8-4.2 12.5-4.2 6.5 0 10.1 1.7 10.1 4.6 0 1.6-.6 2.9-1.9 3.8"
          fill="none"
          stroke="#ECF5FF"
          strokeOpacity="0.9"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.8 22.5h30.4a5.5 5.5 0 0 1 0 11H16.8a5.5 5.5 0 1 1 0-11z"
          fill="url(#bm-glass)"
          stroke="#ECF5FF"
          strokeOpacity="0.86"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.5 33.3l2.1 16.3c.5 4.1 2.7 6 6.5 6h5.8c3.8 0 6-1.9 6.5-6l2.1-16.3"
          fill="url(#bm-glass)"
          stroke="#ECF5FF"
          strokeOpacity="0.86"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26 37.2h12c1.3 0 2.2 1 2.1 2.4l-.9 8.8c-.2 1.9-1.2 2.8-2.9 2.8h-8.6c-1.7 0-2.7-.9-2.9-2.8l-.9-8.8c-.1-1.4.8-2.4 2.1-2.4z"
          fill="url(#bm-liquid)"
        />
        <path
          d="M28 35.4c-.8 3.6-.8 8.3 0 13.8"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.32"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
