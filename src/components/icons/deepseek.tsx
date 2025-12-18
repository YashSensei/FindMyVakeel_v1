export default function DeepSeek({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="12" r="3" fill="currentColor"/>
      <path d="M12 3V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 16V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M3 12H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
