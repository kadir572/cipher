type Props = {
  size?: string // Tailwind class for size, like 'h-12 w-12'
  color?: string // Tailwind class for color, like 'border-blue-500'
}

export default function Spinner({
  size = 'h-12 w-12',
  color = 'border-blue-500',
}: Props) {
  return (
    <div className={`relative ${size} animate-spin`}>
      <div
        className={`absolute w-full h-full border-4 border-t-transparent border-solid rounded-full`}
        style={{
          borderColor: `transparent ${color} transparent transparent`,
          animation: 'spin 1.2s linear infinite', // Control spin speed here
        }}
      />
      <div
        className={`absolute w-full h-full border-4 border-t-transparent border-solid rounded-full`}
        style={{
          borderColor: `transparent transparent ${color} transparent`,
          animation: 'spin 1.2s linear infinite 0.15s', // Staggering the spin for a different effect
        }}
      />
      <div
        className={`absolute w-full h-full border-4 border-t-transparent border-solid rounded-full`}
        style={{
          borderColor: `transparent transparent transparent ${color}`,
          animation: 'spin 1.2s linear infinite 0.3s', // Another staggered spin effect
        }}
      />
      <div
        className={`absolute w-full h-full border-4 border-t-transparent border-solid rounded-full`}
        style={{
          borderColor: `${color} transparent transparent transparent`,
          animation: 'spin 1.2s linear infinite 0.45s', // Another staggered spin effect
        }}
      />
    </div>
  )
}
