function Dots({ position = 'after' }: { position?: 'before' | 'after' }) {
  const peusedoCSS =
    position === 'before'
      ? "before:(content-[''] animate-ellipsis)"
      : "after:(content-[''] animate-[ellipsis_1.25s_infinite])"
  return <span className={`inline-block w-4 ${peusedoCSS}`}></span>
}

export default Dots
