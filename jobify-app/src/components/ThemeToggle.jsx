import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import Wrapper from '../assets/wrappers/ThemeToggle'
import { useDashboradContext } from '../pages/Dashboard'

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboradContext()

  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? <BsFillSunFill /> : <BsFillMoonFill />}
    </Wrapper>
  )
}

export default ThemeToggle
