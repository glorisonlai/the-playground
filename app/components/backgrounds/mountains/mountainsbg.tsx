import React from "react";
// import { ScreenConstants } from "../background";
// import Tree from "./tree";
import bgStyle from "styles/mountains.module.scss";
import styles from "styles/background.module.scss";

const Mountains = () => {
  const ForeGround = () => (
    <div id="foreground">
      <svg
        width={981}
        height={566}
        viewBox={`0 0 981 566`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0)">
          <path
            d="M77 528C67 535 -11 536 -11 536V569H988V428H953C937 428 944 435 917 435H859C842 435 814 438 800 445C786 452 789 468 761 468C733 468 728 458 702 458C676 458 643 483 616 476C589 469 565 468 565 468L502 476C502 476 434 496 420 501C406 506 400 491 389 491C378 491 306 513 306 513L197 521H136C126 521 87 521 77 528Z"
            fill="black"
            stroke="black"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          {/* <Tree /> */}
        </g>
      </svg>
    </div>
  );

  const MidGround = () => (
    <div id="midground">
      <svg
        width="981"
        height="566"
        viewBox="0 0 981 566"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0)">
          <path
            d="M62.3792 284.689C49.4132 275.665 -22.8257 305.746 -22.8257 305.746L-29 586H878C878 586 864.417 477.708 854.538 471.692C844.659 465.676 837.25 461.164 826.754 463.671C816.257 466.177 792.795 470.188 789.708 463.671C786.621 457.153 780.447 441.11 774.89 440.107C769.333 439.105 749.575 430.08 741.549 430.08C733.522 430.08 726.113 418.048 713.764 414.538C701.416 411.029 692.772 414.538 673.632 414.538C654.491 414.538 629.794 394.986 615.594 394.484C601.393 393.983 573.609 388.468 567.434 384.457C561.26 380.447 556.938 371.422 552.616 365.406C548.294 359.39 530.389 354.376 518.04 354.878C505.692 355.379 416.782 331.816 408.756 336.328C400.729 340.84 378.502 311.762 371.71 316.775C364.918 321.789 311.82 320.786 293.914 321.789C276.009 322.791 258.721 332.317 246.99 328.306C235.259 324.295 232.172 316.775 224.145 311.762C216.118 306.748 183.395 316.775 172.899 316.775C162.402 316.775 154.993 287.697 151.906 291.206C148.819 294.716 117.33 298.225 117.33 298.225C117.33 298.225 75.3451 293.713 62.3792 284.689Z"
            fill="url(#paint0_linear)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="198.5"
            y1="412"
            x2="-29"
            y2="639"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0906708" stop-color="#6A6A6A" />
            <stop offset="1" stop-color="#6A6A6A" stop-opacity="0" />
          </linearGradient>
          <clipPath id="clip0">
            <rect width="981" height="566" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );

  const BackGround = () => (
    <div id="mountainback">
      <svg
        width="981"
        height="566"
        viewBox="0 0 981 566"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0)">
          <path
            d="M826 254L789.5 240L826 325L908 342.5L902 299L876 279.5L843 272L826 254Z"
            fill="#C4C4C4"
          />
          <path
            d="M744.5 242.5L724 249.5L706 260.5L728 481L998.5 461.5L988.5 310.5L945 302.5L936 294.5L924.5 299L897 287.5L876 281L884.5 294.5L876 299L867 287.5V299L889 323L864.5 310.5L853.5 302.5L834.5 294.5V276.5L820.5 281L817 268H827.5L810.5 249.5L781.5 236.5L762.5 231L744.5 242.5Z"
            fill="url(#paint0_linear)"
          />
          <path
            d="M527.5 159.5L503.5 165L776.5 479L839.5 459.5L911 452L957.5 430.5L917.5 413L881.5 403L839.5 378.5L810 369.5L788.5 352.5L764.5 329.5V310L747.5 286L719 264.5H737.5L764.5 275.5L737.5 252.5L711.5 246L673.5 225.5L639 202.5H609.5L587 184.5H579.5L561 165L527.5 159.5Z"
            fill="#D6D4D4"
          />
          <path
            d="M358.5 278.5C351.5 283.5 308.456 322.833 297.5 336L387.5 528L546 519H769L799.5 457.5L776.5 431.5L756 414V392.5L739.5 374L705 351L681 336L663 312L651 301.5L639 295L651 287L626 271H639L617.5 247L609.5 239.5H598L586 233L576 219H586L576 206H563L546 178L528.5 165L536 178H522L503.5 165L489.5 200.5L423.5 247C426.662 252.253 402.506 273.485 400.5 271C398.494 268.515 387.328 291.616 378 295C368.672 298.384 365.5 273.5 358.5 278.5Z"
            fill="url(#paint1_linear)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="818"
            y1="318.5"
            x2="810.5"
            y2="496.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#9C9C9C" />
            <stop offset="1" stop-color="#9C9C9C" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="449.5"
            y1="273"
            x2="265"
            y2="377"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#9C9C9C" />
            <stop offset="1" stop-color="#9E9E9E" stop-opacity="0" />
          </linearGradient>
          <clipPath id="clip0">
            <rect width="981" height="566" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );

  const Clouds = () => (
    <div id="clouds">
      <svg
        width="981"
        height="566"
        viewBox="0 0 981 566"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M347.964 150.001H145.464H80.464C76.1032 149.783 103.964 146.001 101.964 143.001C99.9641 140.001 109.294 125.062 132.464 123.501C125.859 121.055 132.852 108.793 145.464 106.501C158.076 104.209 167.964 106.501 167.964 106.501C167.964 106.501 163.964 80.5012 190.964 74.5012C217.964 68.5012 232.949 118.372 230.964 117.501C228.979 116.631 244.878 123.872 251.964 123.501C259.05 123.131 283.385 125.295 282.464 134.501C281.543 143.708 354.467 145.449 347.964 150.001Z"
          fill="#C9C9C9"
        />
        <path
          d="M957.904 192H730.404H690.404C684.893 192.407 689.331 188.449 698.904 187C708.476 185.551 716.742 179.182 719.904 177.5C723.066 175.818 739.404 182.5 742.904 182.5C746.404 182.5 746.226 170.767 762.404 170.5C771.366 172.429 775.28 174.499 790.904 170.5C795.442 171.14 803.543 155.742 790.904 155.5C778.264 155.258 755.032 146.357 755.904 141.5C756.286 134.016 759.97 133.032 768.404 133C768.139 127.142 775.404 124 778.904 124C782.404 124 787.952 113.37 790.904 110C792.695 102.676 790.144 98.2306 813.904 93C829.69 95.879 831.452 105.347 835.904 118C837.445 110.04 841.097 104.487 850.404 101.5C860.253 105.611 863.912 109.27 867.404 118C870.03 125.98 864.935 131.776 858.904 141.5C872.339 142.918 877.66 145.155 877.404 155.5L909.904 162C917.52 167.007 920.074 171.132 919.404 182.5C952.568 185.885 961.895 187.949 957.904 192Z"
          fill="#8C8C8C"
        />
      </svg>
    </div>
  );

  return (
    <div className={`${styles.bg} ${bgStyle.tracker}`}>
      <Clouds />
      <MidGround />
      <BackGround />
      <ForeGround />
    </div>
  );
};

export default Mountains;
