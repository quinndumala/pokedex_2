const PokeballIcon = () => {
  return (
    <svg
      className="size-[1.5em]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinejoin="miter"
        strokeLinecap="square"
        strokeWidth="2"
        transform="rotate(-30 12 12)"
      >
        <circle cx="12" cy="12" r="10.5" strokeMiterlimit="10" />
        <line x1="2" y1="12" x2="8.5" y2="12" strokeMiterlimit="10" />
        <line x1="15.5" y1="12" x2="22" y2="12" strokeMiterlimit="10" />
        <circle cx="12" cy="12" r="3" strokeMiterlimit="10" />
      </g>
    </svg>
  );
};

export default PokeballIcon;
