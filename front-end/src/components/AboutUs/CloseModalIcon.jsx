export default function CloseModalIcon({ tailwindFillColor, onClose }) {
  return (
    <svg
      onClick={onClose}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      className={`${tailwindFillColor} size-full hover:cursor-pointer`}
    >
      <path
        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
      />
    </svg>
  );
}
