import { Link, useRouteError } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'

const Error = () => {
  const error = useRouteError()
  console.log(error)
  if (error.status === 404) {
    return (
      <Wrapper className='full-page'>
        <div>
          <img src={img} alt='not found' />
          <h3>ooh! page not found</h3>
          <p>We cant seem to find page you are looking for </p>
          <Link to='/'> back to home</Link>
        </div>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <div>
        {' '}
        <h3>something went wrong</h3>
      </div>
    </Wrapper>
  )
}

export default Error
