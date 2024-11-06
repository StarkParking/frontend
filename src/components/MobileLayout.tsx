import React from 'react'
interface MobileLayoutProps {
  children: React.ReactNode
}
const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-white relative pb-[90px]">
        {children}
      </div>
    </div>
  )
}
export default MobileLayout
