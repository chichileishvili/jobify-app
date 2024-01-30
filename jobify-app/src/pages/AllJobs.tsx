import { toast } from 'react-toastify'
import { JobsContainer, SearchContainer } from '../components'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { useContext, createContext } from 'react'
import { searchValues } from '../components/SearchContainer'
import React from 'react'
import { JobProps } from '../components/Job'
import { Job_Status, Job_Type, Job_Sort } from '../components/SearchContainer'

interface JobData {
  jobs: JobProps[]
  totalJobs: number
  numOfPages: number
  currentPage: number
}
interface LoaderDataType {
  data: JobData
  searchValues: searchValues
}

export const loader = async ({ request }) => {
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()])

  try {
    const { data } = await customFetch.get('/jobs', {
      params,
    })

    return { data, searchValues: { ...params } }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AllJobsContext = createContext<LoaderDataType>({
  data: {} as JobData,
  searchValues: {
    search: '',
    jobStatus: Job_Status.PENDING,
    job: Job_Type.FULL_TIME,
    sort: Job_Sort.NEWEST,
  },
})
const AllJobs = () => {
  const { data, searchValues } = useLoaderData() as LoaderDataType
  console.log(data, searchValues)

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  )
}
export const useAllJobsContext = (): LoaderDataType => useContext(AllJobsContext)

export default AllJobs
