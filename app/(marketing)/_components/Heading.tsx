"use client"

import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/clerk-react'
import { useConvexAuth } from 'convex/react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Heading = () => {

  const { isAuthenticated, isLoading } = useConvexAuth()

  return (
    <div className='max-w-3xl space-x-4'>
      <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
        Your Ideas, Documents, & Plans, Unified. Welcome to <span className='underline'>Notion</span>
      </h1>
      <h3 className='text-base sm:tect-xl md:text-2xl font-medium pt-3'>
        Notion is the connected workspace where <br /> better, faster work happens.
      </h3>
      {
        isLoading && (
          <div className='w-full flex justify-center items-center mt-4'>
            <Spinner size={'lg'} />
          </div>
        )
      }
      {
        isAuthenticated && !isLoading && (
          <Button className='mt-4' asChild>
            <Link href={"/documents"}>
              Enter Notion
              <ArrowRight className='w-4 h-4' />
            </Link>

          </Button>
        )
      }
      {
        !isAuthenticated && !isLoading && (
          <SignInButton mode='modal'>
            <Button className='mt-4'>
              Get Notion
              <ArrowRight className='h-4 w-4 ml-2' />
            </Button>
          </SignInButton>
        )
      }

    </div>
  )
}

export default Heading