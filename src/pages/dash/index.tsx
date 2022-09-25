import React from 'react'
import { useSession } from 'next-auth/react'

const Dashboard = () => {
  const { data: session } = useSession()
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl mt-8">Welcome {session?.user?.name}</h1>
    </div>
  )
}

export default Dashboard