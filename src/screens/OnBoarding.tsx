
import { Button } from '../component/Button'
type OnBoardingProps = {
  onNext: () => void
}

const OnBoarding = ({onNext}:OnBoardingProps) => {
 
  return (
    <div className="relative flex flex-col justify-between items-center py-8 min-h-screen">
      
      {/* Title */}
     <h1 className="z-10 relative px-6 font-semibold text-glow-soft text-5xl md:text-7xl text-center leading-[0.97] animate-fade-in">
  Plan Your Work <br /> And Stay Productive
</h1>

      {/* Image Layer */}
      <div className="relative flex flex-1 justify-center items-center w-full animate-fade-in">
        <img
          src="/images/onBoarding/mix.webp"
          alt="Penguin in clock"
          className="absolute w-auto h-[70vh] md:h-[75vh] object-contain pointer-events-none"
        />
      </div>

      {/* Button */}
      <div className="top-10 z-10 relative mb-20 md:mb-6 animate-fade-in">
        <Button onClick={onNext}  variant="primary" size="large">
          Next
        </Button>
      </div>

    </div>
  )
}

export default OnBoarding
