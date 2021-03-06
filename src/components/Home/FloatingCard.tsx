import { getNumberWithCommas } from '@/utils/formatHelper';
import Button from '../Shared/Button';
import { motion } from 'framer-motion';
import { isMobile } from '@/hooks/window';

interface Props {
  bg: string;
  bgOnHover?: string;
  showCatheonLogo?: boolean;
  title: string;
  categories: string[];
  network: string;
  marketCap?: string;
  coinSupply?: string;
  onPlay?: any;
  playDisabled?: boolean;
  onFirstItemMouseOver?: (val: boolean) => void;
  onCardClick?: () => Promise<void> | void;
  onMouseOver?: any;
  onMouseLeave?: any;
  id?: string;
  currentHoverId?: string;
  logo?: string;
  isFloatRight?: boolean;
  isDefaultFloating?: boolean;
}

const FloatingCard = ({
  currentHoverId,
  id,
  bg,
  bgOnHover,
  title,
  categories,
  network,
  marketCap,
  coinSupply,
  onPlay,
  onCardClick,
  onMouseOver,
  onMouseLeave,
  logo,
  isFloatRight,
  isDefaultFloating,
}: Props) => {
  const handleMouseOver = () => {
    if (isMobile()) {
      return;
    }
    onMouseOver && onMouseOver(id);
  };

  const handleMouseOut = () => {
    if (isMobile()) {
      return;
    }
    onMouseLeave && onMouseLeave(id);
  };

  return (
    <div
      className="w-full"
      style={{
        height: isDefaultFloating ? 390 : 'auto',
      }}
    >
      {currentHoverId !== id && !isDefaultFloating && (
        <div
          className="cursor-pointer rounded-[5px] align-middle transition-all drop-shadow-xl relative z-[1]"
          onMouseOver={() => handleMouseOver()}
          onMouseLeave={() => handleMouseOut()}
          onClick={() => {
            onCardClick && onCardClick();
          }}
        >
          <img
            src={bg}
            alt={title}
            className="object-cover rounded-[5px] h-[25vh] w-full"
          />
          <div className="absolute bottom-[10px] pl-[12px]">
            <img src={logo} alt={''} width={150} />
          </div>
        </div>
      )}
      {(currentHoverId === id || isDefaultFloating) && (
        <motion.div
          initial={{
            opacity: 0,
            x: isDefaultFloating ? 0 : '10px',
            y: isDefaultFloating ? 0 : '-105px',
            zIndex: 100,
          }}
          animate={{
            opacity: 1,
            x: isDefaultFloating ? 0 : isFloatRight ? '0px' : '-25px',
            y: isDefaultFloating ? 0 : '-105px',
            zIndex: 100,
          }}
          className="bg-[#13002B] rounded-[5px] cursor-pointer absolute shadow-sm shadow-[#000]"
          onMouseLeave={() => handleMouseOut()}
          style={{ position: isDefaultFloating ? 'static' : 'absolute' }}
        >
          <div
            style={{
              width: isDefaultFloating ? 'auto' : '25vw',
            }}
            className="rounded-[5px] transition-all bg-[#13002B] overflow-hidden"
          >
            <div className="relative flex items-start justify-center h-[55%]">
              <div
                className="relative"
                style={{
                  width: isDefaultFloating ? '90vw' : '25vw',
                  height: isDefaultFloating ? 199 : '25vh',
                }}
              >
                <div className="absolute bottom-3 pl-[12px] z-2">
                  <img src={logo} alt={''} width={150} />
                </div>
                <video muted autoPlay loop>
                  <source src={bgOnHover} type="video/mp4" />
                </video>
              </div>
            </div>
            <div
              className="bg-[#13002B] pt-[20px] pb-[24px] h-[45%] relative"
              style={{ height: isDefaultFloating ? 170 : '' }}
            >
              <div className="px-[12px] py-[0px]">
                <div className="font-normal text-[#FFFFFF] text-[14px] 2xl:text-[16px]">
                  {title?.length > 80 ? title?.slice(0, 80) + '...' : title}
                </div>
                <div className="w-full flex justify-between items-center pr-[24px] mt-[12px]">
                  <div className="text-[#FFFFFF] text-[12px] flex items-center pr-[12px] flex-wrap basis-[70%]">
                    {categories && categories.length ? (
                      categories.map((category, index) => {
                        return (
                          <div
                            key={index}
                            className="text-[12px] flex items-center 2xl:text-[16px]"
                          >
                            {String(category).toLowerCase()}
                            {index !== categories.length - 1 && (
                              <span className="ml-[4px] mr-[4px] text-[#aaa] text-[12px]">
                                ???
                              </span>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <Button
                      onClick={() => onPlay()}
                      style={{ padding: '8px 24px', fontSize: 12 }}
                    >
                      Play
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-[16px] h-[2px] w-full bg-[#290030]" />
              <div className="grid gap-x-[12px] grid-cols-3 grid-rows-1 w-full px-[12px] mt-[16px]">
                {network && (
                  <div className="text-[10px] flex items-center">
                    <div className="text-[#9497AA]">Network:</div>
                    <div className="text-[#FC1F8E] ml-[3px]">{network}</div>
                  </div>
                )}
                {marketCap !== null && (
                  <div className="text-[10px] flex items-center">
                    <div className="text-[#9497AA]">M Cap:</div>
                    <div className="text-[#FC1F8E] ml-[3px]">
                      {getNumberWithCommas(Number(marketCap), 2)}
                    </div>
                  </div>
                )}
                {coinSupply !== null && (
                  <div className="text-[10px] flex items-center">
                    <div className="text-[#9497AA]">C Supply:</div>
                    <div className="text-[#FC1F8E] ml-[3px]">
                      {getNumberWithCommas(Number(coinSupply), 0)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FloatingCard;
