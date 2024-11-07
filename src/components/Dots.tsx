function Dots({ position = 'after' }: { position?: 'before' | 'after' }) {
  const peusedoCSS =
    position === 'before'
      ? ":uno: before:(content-[''] animate-ellipsis)"
      : ":uno: after:(content-[''] animate-[ellipsis_1.25s_infinite])"
  return <span className={`:uno: inline-block w-4 ${peusedoCSS}`}></span>
}

export default Dots
