import { getNumberWithCommas } from '@/utils/formatters';
import { useMemo, useState } from 'react';
import Divider from '../Shared/Divider';
import ProgressBar from '../Shared/ProgressBar';
import Tag from '../Shared/Tag';

interface Props {
  brandImg: string;
  brandName: string;
  symbol: string;
  price: number;
  priceToBTC: number;
  priceToETH: number;
  priceFluctuation: number;
  priceToBTCFluctuation: number;
  priceToETHFluctuation: number;
  lowDay: number;
  lowMonth: number;
  lowWeek: number;
  highDay: number;
  highWeek: number;
  highMonth: number;
  marketCap: number;
  fullyDilutedMarketCap: number;
  volume: number;
  circulatingSupply: number;
  circulatingSupplyPercentage: number;
  totalSupply: number;
  contractAddress: string;
  scanAddress: string;
}

const TokenPricePanel = ({
  brandImg,
  brandName,
  symbol,
  price,
  priceToBTC,
  priceToETH,
  priceFluctuation,
  priceToBTCFluctuation,
  priceToETHFluctuation,
  lowDay,
  lowMonth,
  lowWeek,
  highDay,
  highMonth,
  highWeek,
  marketCap,
  fullyDilutedMarketCap,
  volume,
  circulatingSupply,
  circulatingSupplyPercentage,
  totalSupply,
  contractAddress,
  scanAddress,
}: Props) => {
  const [currentView, setCurrentView] = useState('day');

  const low = useMemo(() => {
    switch (currentView) {
      case 'day':
        return lowDay;
      case 'week':
        return lowWeek;
      case 'month':
        return lowMonth;
      default:
        return 0;
    }
  }, [currentView, lowDay, lowMonth, lowWeek]);

  const high = useMemo(() => {
    switch (currentView) {
      case 'day':
        return highDay;
      case 'week':
        return highWeek;
      case 'month':
        return highMonth;
      default:
        return 0;
    }
  }, [currentView, highDay, highWeek, highMonth]);

  return (
    <Tag className="relative px-[24px] py-[24px]">
      <div className="absolute right-[24px] top-[24px]">
        <img src={brandImg} alt={brandName} width={105} height={105} />
      </div>
      <div>
        <div className="text-[#FFFFFF] font-semibold text-[14px] mb-[12px]">
          {brandName} Token Price ({symbol})
        </div>
        <div className="flex items-center mb-[14px]">
          <div className="font-bold text-[36px] text-[#FFFFFF]">${price}</div>
          <div className="ml-[14px]">{priceFluctuation}%</div>
        </div>
        <div className="flex items-center mb-[8px]">
          <div className="font-bold text-[14px] text-[#FFFFFF]">
            ${priceToBTC}
          </div>
          <div className="ml-[14px] text-[12px]">{priceToBTCFluctuation}%</div>
        </div>
        <div className="flex items-center mb-[14px]">
          <div className="font-bold text-[14px] text-[#FFFFFF]">
            ${priceToETH}
          </div>
          <div className="ml-[14px] text-[12px]">{priceToETHFluctuation}%</div>
        </div>
        <div className="flex items-center mb-[24px]">
          <div className="text-[#FFFFFF] text-[14px] font-semibold">
            Low: ${low}
          </div>
          <div className="ml-[12px]">
            <ProgressBar width={221} percentage={50} showIndicator />
          </div>
          <div className="text-[#FFFFFF] text-[14px] font-semibold ml-[12px]">
            High: ${high}
          </div>
          <div className="ml-[24px] flex">
            <div
              className="text-[14px] text-[#9497AA] cursor-pointer hover:underline hover:text-[#FFFFFF]"
              onClick={() => setCurrentView('day')}
            >
              1d
            </div>
            <div
              className="text-[14px] text-[#9497AA] ml-[12px] cursor-pointer hover:underline hover:text-[#FFFFFF]"
              onClick={() => setCurrentView('week')}
            >
              1w
            </div>
            <div
              className="text-[14px] text-[#9497AA] ml-[12px] cursor-pointer hover:underline hover:text-[#FFFFFF]"
              onClick={() => setCurrentView('month')}
            >
              1m
            </div>
          </div>
        </div>
        <div className="mb-[24px]">
          <Divider />
        </div>
        <div className="mb-[42px] flex">
          <div>
            <div className="text-[#FFFFFF] font-light text-[14px]">
              Market Cap
            </div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px]">
              ${getNumberWithCommas(marketCap)}
            </div>
          </div>
          <div className="ml-[48px]">
            <div className="text-[#FFFFFF] font-light text-[14px]">
              Fully Diluted Market Cap
            </div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px]">
              ${getNumberWithCommas(fullyDilutedMarketCap)}
            </div>
          </div>
          <div className="ml-[48px]">
            <div className="text-[#FFFFFF] font-light text-[14px]">
              Volume (24hr)
            </div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px]">
              ${getNumberWithCommas(volume)}
            </div>
          </div>
          <div className="ml-[48px]">
            <div className="text-[#FFFFFF] font-light text-[14px]">
              Circulating Supply
            </div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px]">
              <span>${getNumberWithCommas(circulatingSupply)}</span>
              <span className="ml-[4px]">{symbol}</span>
              <span className="ml-[20px] font-light">
                {circulatingSupplyPercentage}%
              </span>
            </div>
            <div className="mt-[6px]">
              <ProgressBar width={221} percentage={50} />
            </div>
          </div>
          <div className="ml-[48px]">
            <div className="text-[#FFFFFF] font-light text-[14px]">
              Max Supply
            </div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px]">
              {getNumberWithCommas(totalSupply)}
            </div>
          </div>
        </div>
        <div className="mb-[12px]">
          <Divider />
        </div>
        <div className="flex">
          <div>
            <div className="text-[#FFFFFF] text-[14px]">Contract Address</div>
            <div
              className="mt-[4px]"
              style={{
                background: 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {contractAddress}{' '}
            </div>
          </div>
          <div className="ml-[40px]">
            <div className="text-[#FFFFFF] text-[14px]">Solscan</div>
            <div
              className="mt-[4px]"
              style={{
                background: 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {scanAddress}{' '}
            </div>
          </div>
        </div>
      </div>
    </Tag>
  );
};

export default TokenPricePanel;
