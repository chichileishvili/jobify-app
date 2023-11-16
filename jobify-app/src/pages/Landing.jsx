import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <Wrapper>
      {' '}
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Job <span>tracking </span>
          </h1>
          <p>
            I'm baby flexitarian tote bag pabst PBR&B. Sriracha bushwick you probably haven't heard
            of them tbh chicharrones vegan echo park copper mug. Pork belly put a bird on it
            Brooklyn cred lomo marxism ascot succulents dreamcatcher copper mug pour-over. Cray
            unicorn paleo 8-bit dreamcatcher mukbang echo park salvia hot chicken selfies austin
            hoodie freegan.
          </p>
          <Link to='/register' className='btn register-link'>
            Register
          </Link>
          <Link to='/login' className='btn'>
            {' '}
            Login/Demo User
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default Landing
