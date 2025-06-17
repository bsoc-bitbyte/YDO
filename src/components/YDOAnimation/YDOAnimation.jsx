import Lottie from 'lottie-react';
import YDOanimation from '../../assets/Animation/YDOanimation.json';
const YDOAnimation = ({
    animationData = YDOanimation,
    loop = true,
    autoplay = true,
    speed = 1,
    onClick = null,
    style = {
      width: '50vw',
      height: '70vh',
      padding: '10px',
      zIndex: 0,
      backgroundColor: 'rgba(255, 228, 239, 0.95)',
      borderRadius: '15px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
  }
}) => {
  return (
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        speed={speed}
        style={style}
        onClick={onClick}
      />
  );
};
export default YDOAnimation;
