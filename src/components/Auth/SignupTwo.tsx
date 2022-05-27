import { motion } from 'framer-motion';
import Button from '../Shared/Button';
import PrimaryGradientText from '../Shared/PrimaryGradientText';

const SignupTwo = ({
  onNextStep,
  onCancel,
}: {
  onNextStep: () => Promise<void>;
  onCancel: () => void;
}) => {
  return (
    <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }}>
      <div className="mb-[135px] flex justify-center">
        <PrimaryGradientText className="hover:underline">
          Resend Link
        </PrimaryGradientText>
      </div>
      <div className="mt-3 px-[24px] pb-[24px]">
        <Button onClick={() => onNextStep()}>Next</Button>
        <div className="mt-[12px]">
          <Button onClick={() => onCancel()}>Cancel</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SignupTwo;
