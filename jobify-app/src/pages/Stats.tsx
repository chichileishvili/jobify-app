import { ChartsContainer, StatsContainer } from '../components'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import React from 'react'

export const loader = async () => {
  try {
    const response = await customFetch.get('/jobs/stats')
    return response.data
  } catch (error) {
    return error
  }
}

export interface ChartsContainerProps {
  data: {
    _id: string
    count: number
  }[]
}

export interface StatsProps {
  defaultStats: {
    pending: number
    interview: number
    declined: number
  }
  monthlyApplications: {
    _id: string
    count: number
  }[]
}
const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData() as StatsProps
  const transformedData = monthlyApplications.map((item) => ({
    date: item._id,
    count: item.count,
  }))

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {transformedData?.length > 0 && <ChartsContainer data={transformedData} />}
    </>
  )
}

export default Stats
