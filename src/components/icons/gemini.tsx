export default function Google({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#4285F4"/>
      <path d="M2 17L12 22L22 17L12 12L2 17Z" fill="#34A853"/>
      <path d="M2 12L12 17V22L2 17V12Z" fill="#FBBC05"/>
      <path d="M12 17L22 12V17L12 22V17Z" fill="#EA4335"/>
    </svg>
  );
}
