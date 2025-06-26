import Lottie from 'lottie-react';
import Animation from '../../assets/Animation-Content/Animation.json';
import './Animation.css'

const YDOAnimation = ({
    animationData = Animation,
    loop = true,
    autoplay = true,
    speed = 1,
    onClick = null,  
}) => {
  return (
    <div className="ydo-animation">
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        speed={speed}
        onClick={onClick}
      />
    </div>
  );
};
export default YDOAnimation;
