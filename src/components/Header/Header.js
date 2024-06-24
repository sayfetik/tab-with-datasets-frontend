import React from 'react';
import './Header.css'
import Icon from './Icon';
import idhLogo from '../../img/idhLogo.png'

class Header extends React.Component {
  render() {
    return (
        <div id="header">
        <header className="commonsHeader">
        <a href="https://unionepro.ru">
          <div className="logo">
            <svg width="140px" height="36px" viewBox="0px 0px 140px 36px" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M49.0541 30.8145L47.4637 33.9151C47.3241 34.1895 47.1567 34.396 46.9615 34.5352C46.7696 34.6704 46.5603 34.7382 46.3337 34.7382C46.1522 34.7382 45.9727 34.6978 45.7948 34.6175L45.9622 34.0577C46.1051 34.1052 46.2238 34.1291 46.318 34.1291C46.5377 34.1291 46.7191 34.0101 46.8621 33.7724L46.9196 33.6791L45.46 30.8145H46.1872L47.2701 33.0699L48.3845 30.8145H49.0541Z" fill="#3E456F"></path>
              <path d="M52.7815 30.8145V34.6559H52.1013V33.0096H50.2075V34.6559H49.5273V30.8145H50.2075V32.4004H52.1013V30.8145H52.7815Z" fill="#3E456F"></path>
              <path d="M53.8145 30.8145H54.4841V33.5419L56.4512 30.8145H57.0843V34.6559H56.4146V31.934L54.4475 34.6559H53.8145V30.8145Z" fill="#3E456F"></path>
              <path d="M60.5228 32.6584C60.7563 32.7242 60.9342 32.8375 61.0564 32.9986C61.1784 33.1558 61.2395 33.3533 61.2395 33.5913C61.2395 33.9278 61.1209 34.1895 60.8838 34.376C60.6465 34.5626 60.3031 34.6559 59.8531 34.6559H58.1162V30.8145H59.7537C60.1652 30.8145 60.4862 30.9003 60.7164 31.0724C60.9466 31.2443 61.0617 31.4875 61.0617 31.8023C61.0617 32.0033 61.0146 32.1772 60.9204 32.3236C60.8296 32.4698 60.6971 32.5815 60.5228 32.6584ZM58.7859 32.4553H59.6962C59.9159 32.4553 60.0833 32.4094 60.1984 32.3181C60.3135 32.2266 60.3711 32.0911 60.3711 31.912C60.3711 31.7327 60.3135 31.5972 60.1984 31.5059C60.0833 31.4106 59.9159 31.3632 59.6962 31.3632H58.7859V32.4553ZM59.8322 34.1071C60.3135 34.1071 60.5542 33.9168 60.5542 33.5364C60.5542 33.1632 60.3135 32.9766 59.8322 32.9766H58.7859V34.1071H59.8322Z" fill="#3E456F" ></path>
              <path d="M64.7603 34.0577V34.6559H62.0137V30.8145H64.6871V31.4126H62.6938V32.4114H64.4621V32.9986H62.6938V34.0577H64.7603Z" fill="#3E456F"></path>
              <path d="M67.0253 30.8145C67.3427 30.8145 67.6181 30.8693 67.8519 30.9791C68.089 31.0888 68.2704 31.246 68.396 31.451C68.5215 31.6558 68.5843 31.8991 68.5843 32.1809C68.5843 32.4588 68.5215 32.7023 68.396 32.9108C68.2704 33.1156 68.089 33.273 67.8519 33.3827C67.6181 33.4925 67.3427 33.5474 67.0253 33.5474H66.1987V34.6559H65.5186V30.8145H67.0253ZM66.9939 32.9437C67.2904 32.9437 67.5154 32.8779 67.6688 32.7462C67.8222 32.6145 67.899 32.4259 67.899 32.1809C67.899 31.9357 67.8222 31.7474 67.6688 31.6157C67.5154 31.484 67.2904 31.4181 66.9939 31.4181H66.1987V32.9437H66.9939Z" fill="#3E456F"></path>
              <path d="M70.9635 34.711C70.5937 34.711 70.2589 34.6267 69.959 34.4585C69.6625 34.2864 69.4287 34.0505 69.258 33.7506C69.0905 33.4505 69.0068 33.1121 69.0068 32.7354C69.0068 32.3585 69.0922 32.02 69.2632 31.7201C69.434 31.4201 69.6677 31.1858 69.9642 31.0177C70.2641 30.8456 70.5989 30.7598 70.9687 30.7598C71.2686 30.7598 71.5423 30.8146 71.7901 30.9244C72.0377 31.0342 72.2469 31.1933 72.4179 31.4018L71.9784 31.8354C71.7133 31.5353 71.3873 31.3854 71.0001 31.3854C70.749 31.3854 70.524 31.4438 70.3252 31.561C70.1264 31.6743 69.9711 31.8334 69.8596 32.0384C69.7478 32.2432 69.6922 32.4755 69.6922 32.7354C69.6922 32.9951 69.7478 33.2273 69.8596 33.4323C69.9711 33.6371 70.1264 33.798 70.3252 33.9153C70.524 34.0285 70.749 34.0854 71.0001 34.0854C71.3873 34.0854 71.7133 33.9335 71.9784 33.6299L72.4179 34.0689C72.2469 34.2774 72.036 34.4366 71.7849 34.5464C71.5371 34.6561 71.2634 34.711 70.9635 34.711Z" fill="#3E456F"></path>
              <path d="M73.0547 30.8145H73.7243V33.5419L75.6915 30.8145H76.3245V34.6559H75.6548V31.934L73.6877 34.6559H73.0547V30.8145Z" fill="#3E456F"></path>
              <path d="M80.0093 31.4181H78.7955V34.6559H78.1206V31.4181H76.9121V30.8145H80.0093V31.4181Z" fill="#3E456F"></path>
              <path d="M83.3423 34.0577V34.6559H80.5957V30.8145H83.2691V31.4126H81.2758V32.4114H83.0441V32.9986H81.2758V34.0577H83.3423Z" fill="#3E456F"></path>
              <path d="M86.7583 31.4181H85.5445V34.6559H84.8697V31.4181H83.6611V30.8145H86.7583V31.4181Z" fill="#3E456F"></path>
              <path d="M89.5884 33.7669H87.7573L87.3964 34.6559H86.6953L88.3433 30.8145H89.013L90.6662 34.6559H89.9547L89.5884 33.7669ZM89.3635 33.2071L88.6729 31.5279L87.9875 33.2071H89.3635Z" fill="#3E456F"></path>
              <path d="M92.6787 30.8145H93.3484V33.5419L95.3155 30.8145H95.9485V34.6559H95.2789V31.934L93.3117 34.6559H92.6787V30.8145Z" fill="#3E456F"></path>
              <path d="M100.23 30.8145V34.6559H99.5496V33.0096H97.6557V34.6559H96.9756V30.8145H97.6557V32.4004H99.5496V30.8145H100.23Z" fill="#3E456F"></path>
              <path d="M104.511 30.8145V34.6559H103.831V33.0096H101.937V34.6559H101.257V30.8145H101.937V32.4004H103.831V30.8145H104.511Z" fill="#3E456F"></path>
              <path d="M107.233 34.711C106.86 34.711 106.523 34.6267 106.223 34.4585C105.923 34.2864 105.688 34.0505 105.517 33.7506C105.346 33.4468 105.261 33.1085 105.261 32.7354C105.261 32.3622 105.346 32.0255 105.517 31.7256C105.688 31.4218 105.923 31.1858 106.223 31.0177C106.523 30.8456 106.86 30.7598 107.233 30.7598C107.606 30.7598 107.943 30.8456 108.243 31.0177C108.543 31.1858 108.778 31.4201 108.949 31.7201C109.12 32.02 109.205 32.3585 109.205 32.7354C109.205 33.1121 109.12 33.4505 108.949 33.7506C108.778 34.0505 108.543 34.2864 108.243 34.4585C107.943 34.6267 107.606 34.711 107.233 34.711ZM107.233 34.0854C107.477 34.0854 107.697 34.0285 107.892 33.9153C108.088 33.798 108.241 33.6371 108.353 33.4323C108.464 33.2238 108.52 32.9913 108.52 32.7354C108.52 32.4792 108.464 32.2487 108.353 32.0439C108.241 31.8354 108.088 31.6743 107.892 31.561C107.697 31.4438 107.477 31.3854 107.233 31.3854C106.989 31.3854 106.769 31.4438 106.574 31.561C106.379 31.6743 106.225 31.8354 106.114 32.0439C106.002 32.2487 105.946 32.4792 105.946 32.7354C105.946 32.9913 106.002 33.2238 106.114 33.4323C106.225 33.6371 106.379 33.798 106.574 33.9153C106.769 34.0285 106.989 34.0854 107.233 34.0854Z" fill="#3E456F"></path>
              <path d="M113.201 30.8145V34.6559H112.532V31.4181H110.633V34.6559H109.963V30.8145H113.201Z" fill="#3E456F"></path>
              <path d="M115.928 34.711C115.555 34.711 115.219 34.6267 114.919 34.4585C114.619 34.2864 114.383 34.0505 114.212 33.7506C114.041 33.4468 113.956 33.1085 113.956 32.7354C113.956 32.3622 114.041 32.0255 114.212 31.7256C114.383 31.4218 114.619 31.1858 114.919 31.0177C115.219 30.8456 115.555 30.7598 115.928 30.7598C116.302 30.7598 116.638 30.8456 116.938 31.0177C117.238 31.1858 117.473 31.4201 117.644 31.7201C117.815 32.02 117.901 32.3585 117.901 32.7354C117.901 33.1121 117.815 33.4505 117.644 33.7506C117.473 34.0505 117.238 34.2864 116.938 34.4585C116.638 34.6267 116.302 34.711 115.928 34.711ZM115.928 34.0854C116.173 34.0854 116.392 34.0285 116.588 33.9153C116.783 33.798 116.936 33.6371 117.048 33.4323C117.16 33.2238 117.215 32.9913 117.215 32.7354C117.215 32.4792 117.16 32.2487 117.048 32.0439C116.936 31.8354 116.783 31.6743 116.588 31.561C116.392 31.4438 116.173 31.3854 115.928 31.3854C115.684 31.3854 115.464 31.4438 115.269 31.561C115.074 31.6743 114.92 31.8354 114.809 32.0439C114.697 32.2487 114.641 32.4792 114.641 32.7354C114.641 32.9913 114.697 33.2238 114.809 33.4323C114.92 33.6371 115.074 33.798 115.269 33.9153C115.464 34.0285 115.684 34.0854 115.928 34.0854Z" fill="#3E456F"></path>
              <path d="M121.679 30.8145V34.6559H121.01V31.4181H119.566L119.534 32.3785C119.517 32.9163 119.475 33.3533 119.409 33.6901C119.342 34.0228 119.236 34.2773 119.09 34.4529C118.943 34.6247 118.741 34.7108 118.483 34.7108C118.392 34.7108 118.268 34.6924 118.111 34.6559L118.158 34.0358C118.204 34.0503 118.256 34.0577 118.315 34.0577C118.528 34.0577 118.678 33.926 118.765 33.6626C118.856 33.3955 118.912 32.9766 118.933 32.4059L118.985 30.8145H121.679Z" fill="#3E456F"></path>
              <path d="M122.715 30.8145H123.385V33.5419L125.352 30.8145H125.985V34.6559H125.315V31.934L123.348 34.6559H122.715V30.8145Z" fill="#3E456F"></path>
              <path d="M128.696 34.711C128.326 34.711 127.991 34.6267 127.691 34.4585C127.395 34.2864 127.161 34.0505 126.99 33.7506C126.823 33.4505 126.739 33.1121 126.739 32.7354C126.739 32.3585 126.825 32.02 126.996 31.7201C127.166 31.4201 127.4 31.1858 127.697 31.0177C127.997 30.8456 128.331 30.7598 128.701 30.7598C129.001 30.7598 129.275 30.8146 129.523 30.9244C129.77 31.0342 129.979 31.1933 130.15 31.4018L129.711 31.8354C129.446 31.5353 129.12 31.3854 128.733 31.3854C128.481 31.3854 128.256 31.4438 128.058 31.561C127.859 31.6743 127.704 31.8334 127.592 32.0384C127.48 32.2432 127.425 32.4755 127.425 32.7354C127.425 32.9951 127.48 33.2273 127.592 33.4323C127.704 33.6371 127.859 33.798 128.058 33.9153C128.256 34.0285 128.481 34.0854 128.733 34.0854C129.12 34.0854 129.446 33.9335 129.711 33.6299L130.15 34.0689C129.979 34.2774 129.768 34.4366 129.517 34.5464C129.27 34.6561 128.996 34.711 128.696 34.711Z" fill="#3E456F"></path>
              <path d="M9.53285 13H0V35.9998H9.53285V13Z" fill="#3E456F"></path>
              <path d="M24.7851 0V25.9984H21.9244V0H12.3916V35.9978H14.4201H21.9244H24.7851H31.2368H34.3181V0H24.7851Z" fill="#3E456F"></path><path d="M9.53285 0H0V9.99953H9.53285V0Z" fill="#3E456F"></path>
              <path d="M49.6197 6.97616V7.8136H45.7744V2.43555H49.5172V3.27299H46.7266V4.67128H49.2022V5.49335H46.7266V6.97616H49.6197Z" fill="black"></path>
              <path d="M55.7648 6.96847V8.95835H54.8858V7.8136H50.9527V8.95835H50.0664L50.0737 6.96847H50.2935C50.6157 6.95311 50.8405 6.70469 50.9673 6.22323C51.0991 5.73664 51.1797 5.04263 51.209 4.14116L51.2676 2.43555H55.025V6.96847H55.7648ZM52.044 4.23335C52.0197 4.92993 51.9659 5.51129 51.8828 5.97738C51.8 6.43835 51.6681 6.76872 51.4873 6.96847H54.0875V3.28067H52.0806L52.044 4.23335Z" fill="black"></path>
              <path d="M56.668 2.43555H57.6055V6.25396L60.3594 2.43555H61.2457V7.8136H60.3082V4.00286L57.5542 7.8136H56.668V2.43555Z" fill="black"></path>
              <path d="M67.2394 2.43555V7.8136H66.2872V5.50872H63.6358V7.8136H62.6836V2.43555H63.6358V4.65591H66.2872V2.43555H67.2394Z" fill="black"></path>
              <path d="M72.0758 6.56896H69.5122L69.0069 7.8136H68.0254L70.3324 2.43555H71.2701L73.5846 7.8136H72.5883L72.0758 6.56896ZM71.7608 5.7853L70.794 3.43433L69.8345 5.7853H71.7608Z" fill="black"></path>
              <path d="M78.0323 2.43555V7.8136H77.0948V6.31542H75.8277H75.7251L74.773 7.8136H73.7695L74.8682 6.15408C74.5118 6.01579 74.2358 5.7981 74.0405 5.50103C73.8501 5.19883 73.7549 4.83519 73.7549 4.41006C73.7549 4.0003 73.8428 3.64688 74.0186 3.34982C74.1943 3.05275 74.4434 2.82738 74.7656 2.67372C75.0879 2.51494 75.4663 2.43555 75.9009 2.43555H78.0323ZM75.9302 3.28067C75.5395 3.28067 75.2392 3.37543 75.0293 3.56494C74.8242 3.75444 74.7217 4.03103 74.7217 4.39469C74.7217 4.74811 74.8217 5.02212 75.022 5.21677C75.2223 5.40627 75.5127 5.50103 75.8936 5.50103H77.0948V3.28067H75.9302Z" fill="black"></path>
              <path d="M48.148 17.1098C47.6255 17.1098 47.1544 16.992 46.7344 16.7564C46.3144 16.5157 45.9848 16.1853 45.7456 15.7653C45.5064 15.3402 45.3867 14.8664 45.3867 14.344C45.3867 13.8215 45.5064 13.3503 45.7456 12.9303C45.9848 12.5052 46.3144 12.1748 46.7344 11.9392C47.1544 11.6985 47.6255 11.5781 48.148 11.5781C48.6705 11.5781 49.1416 11.6985 49.5616 11.9392C49.9816 12.1748 50.3112 12.5026 50.5504 12.9226C50.7896 13.3427 50.9093 13.8164 50.9093 14.344C50.9093 14.8715 50.7896 15.3453 50.5504 15.7653C50.3112 16.1853 49.9816 16.5157 49.5616 16.7564C49.1416 16.992 48.6705 17.1098 48.148 17.1098ZM48.148 16.234C48.4897 16.234 48.7974 16.1546 49.0709 15.9958C49.3444 15.8319 49.5591 15.6065 49.7154 15.3197C49.8717 15.0278 49.9498 14.7025 49.9498 14.344C49.9498 13.9854 49.8717 13.6628 49.7154 13.3759C49.5591 13.084 49.3444 12.8586 49.0709 12.6998C48.7974 12.5359 48.4897 12.454 48.148 12.454C47.8063 12.454 47.4986 12.5359 47.2251 12.6998C46.9516 12.8586 46.7369 13.084 46.5806 13.3759C46.4243 13.6628 46.3462 13.9854 46.3462 14.344C46.3462 14.7025 46.4243 15.0278 46.5806 15.3197C46.7369 15.6065 46.9516 15.8319 47.2251 15.9958C47.4986 16.1546 47.8063 16.234 48.148 16.234Z" fill="black"></path><path d="M51.9688 11.6543H55.9605V12.4764H52.9063V13.7978H54.4224C55.0377 13.7978 55.5039 13.9336 55.8214 14.205C56.1436 14.4714 56.3048 14.8581 56.3048 15.3651C56.3048 15.8978 56.129 16.3102 55.7774 16.6021C55.4258 16.8889 54.9253 17.0323 54.2759 17.0323H51.9688V11.6543ZM54.2247 16.2641C54.5909 16.2641 54.8692 16.1898 55.0596 16.0412C55.2501 15.8927 55.3453 15.6776 55.3453 15.3959C55.3453 14.8427 54.9717 14.5661 54.2247 14.5661H52.9063V16.2641H54.2247Z" fill="black"></path>
              <path d="M59.4571 11.6543C59.9013 11.6543 60.2872 11.7311 60.6143 11.8848C60.9464 12.0384 61.2003 12.2587 61.3761 12.5455C61.5518 12.8324 61.6397 13.173 61.6397 13.5673C61.6397 13.9566 61.5518 14.2972 61.3761 14.5892C61.2003 14.876 60.9464 15.0962 60.6143 15.2499C60.2872 15.4036 59.9013 15.4804 59.4571 15.4804H58.2998V17.0323H57.3477V11.6543H59.4571ZM59.4131 14.6353C59.8281 14.6353 60.143 14.5431 60.358 14.3587C60.5729 14.1743 60.6802 13.9105 60.6802 13.5673C60.6802 13.2242 60.5729 12.9604 60.358 12.776C60.143 12.5916 59.8281 12.4994 59.4131 12.4994H58.2998V14.6353H59.4131Z" fill="black"></path>
              <path d="M65.6812 15.7877H63.1177L62.6123 17.0323H61.6309L63.938 11.6543H64.8756L67.1901 17.0323H66.1939L65.6812 15.7877ZM65.3663 15.0041L64.3995 12.6531L63.44 15.0041H65.3663Z" fill="black"></path>
              <path d="M70.6724 14.2283C70.9801 14.3308 71.2192 14.4972 71.3902 14.7277C71.566 14.9531 71.6539 15.2194 71.6539 15.5268C71.6539 15.8494 71.5539 16.1311 71.3536 16.3719C71.1533 16.6075 70.8848 16.7893 70.5479 16.9174C70.2158 17.0454 69.8521 17.1094 69.4566 17.1094C69.1149 17.1094 68.7706 17.0608 68.4239 16.9635C68.0821 16.861 67.7647 16.7099 67.4717 16.5102L67.7793 15.7803C68.0038 15.9391 68.2529 16.062 68.5264 16.1491C68.7999 16.231 69.0709 16.272 69.3394 16.272C69.7251 16.272 70.045 16.1926 70.2989 16.0338C70.5578 15.8751 70.6871 15.6574 70.6871 15.3808C70.6871 15.1452 70.5944 14.9659 70.4088 14.843C70.2231 14.7201 69.9668 14.6586 69.6397 14.6586H68.4458V13.8749H69.5664C69.8496 13.8749 70.0718 13.8135 70.233 13.6905C70.3941 13.5676 70.4747 13.4012 70.4747 13.1912C70.4747 12.9402 70.3648 12.7455 70.1451 12.6072C69.9302 12.469 69.6543 12.3998 69.3174 12.3998C69.0879 12.3998 68.8512 12.4357 68.607 12.5074C68.3627 12.574 68.1334 12.6738 67.9185 12.807L67.6182 12.0003C67.8818 11.8518 68.1602 11.7416 68.4531 11.6699C68.7509 11.5931 69.0464 11.5547 69.3394 11.5547C69.7203 11.5547 70.0693 11.6162 70.3868 11.7391C70.7091 11.862 70.9654 12.0387 71.1558 12.2692C71.3463 12.4946 71.4415 12.7609 71.4415 13.0682C71.4415 13.3346 71.3731 13.5676 71.2364 13.7674C71.0998 13.9671 70.9116 14.1208 70.6724 14.2283Z" fill="black"></path>
              <path d="M75.106 17.1098C74.5837 17.1098 74.1124 16.992 73.6924 16.7564C73.2726 16.5157 72.943 16.1853 72.7036 15.7653C72.4644 15.3402 72.3447 14.8664 72.3447 14.344C72.3447 13.8215 72.4644 13.3503 72.7036 12.9303C72.943 12.5052 73.2726 12.1748 73.6924 11.9392C74.1124 11.6985 74.5837 11.5781 75.106 11.5781C75.6286 11.5781 76.0998 11.6985 76.5196 11.9392C76.9396 12.1748 77.2692 12.5026 77.5084 12.9226C77.7478 13.3427 77.8673 13.8164 77.8673 14.344C77.8673 14.8715 77.7478 15.3453 77.5084 15.7653C77.2692 16.1853 76.9396 16.5157 76.5196 16.7564C76.0998 16.992 75.6286 17.1098 75.106 17.1098ZM75.106 16.234C75.448 16.234 75.7556 16.1546 76.0289 15.9958C76.3024 15.8319 76.5173 15.6065 76.6734 15.3197C76.8298 15.0278 76.9078 14.7025 76.9078 14.344C76.9078 13.9854 76.8298 13.6628 76.6734 13.3759C76.5173 13.084 76.3024 12.8586 76.0289 12.6998C75.7556 12.5359 75.448 12.454 75.106 12.454C74.7643 12.454 74.4567 12.5359 74.1831 12.6998C73.9098 12.8586 73.6949 13.084 73.5386 13.3759C73.3825 13.6628 73.3042 13.9854 73.3042 14.344C73.3042 14.7025 73.3825 15.0278 73.5386 15.3197C73.6949 15.6065 73.9098 15.8319 74.1831 15.9958C74.4567 16.1546 74.7643 16.234 75.106 16.234Z" fill="black"></path>
              <path d="M82.2969 14.2358C82.624 14.328 82.8731 14.4867 83.044 14.7121C83.2148 14.9323 83.3004 15.2089 83.3004 15.5419C83.3004 16.0131 83.1342 16.3793 82.8023 16.6405C82.4702 16.9017 81.9893 17.0323 81.3594 17.0323H78.9277V11.6543H81.2203C81.7964 11.6543 82.2457 11.7747 82.5679 12.0154C82.8902 12.2561 83.0513 12.5968 83.0513 13.0372C83.0513 13.3189 82.9854 13.5622 82.8536 13.7671C82.7266 13.972 82.5409 14.1282 82.2969 14.2358ZM79.8652 13.9515H81.1397C81.4473 13.9515 81.6817 13.8875 81.8428 13.7594C82.004 13.6314 82.0845 13.4419 82.0845 13.1909C82.0845 12.9399 82.004 12.7504 81.8428 12.6223C81.6817 12.4892 81.4473 12.4226 81.1397 12.4226H79.8652V13.9515ZM81.3301 16.2641C82.004 16.2641 82.3409 15.9977 82.3409 15.465C82.3409 14.9426 82.004 14.6814 81.3301 14.6814H79.8652V16.2641H81.3301Z" fill="black"></path>
              <path d="M87.7838 15.7877H85.2202L84.7149 17.0323H83.7334L86.0406 11.6543H86.9781L89.2926 17.0323H88.2965L87.7838 15.7877ZM87.4688 15.0041L86.502 12.6531L85.5425 15.0041H87.4688Z" fill="black"></path>
              <path d="M93.5421 12.4994H91.8428V17.0323H90.898V12.4994H89.2061V11.6543H93.5421V12.4994Z" fill="black"></path><path d="M98.2086 16.1949V17.0323H94.3633V11.6543H98.106V12.4917H95.3154V13.89H97.7911V14.7121H95.3154V16.1949H98.2086Z" fill="black"></path><path d="M103.65 11.6543V17.0323H102.712V12.4994H100.69L100.647 13.8439C100.622 14.5969 100.563 15.2089 100.471 15.6802C100.378 16.1462 100.229 16.5022 100.024 16.7481C99.8189 16.9888 99.5357 17.1092 99.1743 17.1092C99.0473 17.1092 98.874 17.0836 98.6543 17.0323L98.7202 16.1642C98.7836 16.1847 98.8569 16.1949 98.9399 16.1949C99.2377 16.1949 99.4478 16.0105 99.5698 15.6417C99.6969 15.2678 99.7749 14.6814 99.8042 13.8823L99.8775 11.6543H103.65Z" fill="black"></path>
              <path d="M107.458 13.4752C108.073 13.4752 108.545 13.6211 108.872 13.9131C109.204 14.1999 109.37 14.6276 109.37 15.1961C109.37 15.7903 109.189 16.2461 108.828 16.5637C108.467 16.8761 107.959 17.0323 107.304 17.0323H105.1V11.6543H106.037V13.4752H107.458ZM107.26 16.2641C107.632 16.2641 107.917 16.1744 108.117 15.9952C108.318 15.8159 108.418 15.5547 108.418 15.2115C108.418 14.561 108.032 14.2358 107.26 14.2358H106.037V16.2641H107.26Z" fill="black"></path>
              <path d="M114.898 11.6543V17.0323H113.945V14.7275H111.294V17.0323H110.342V11.6543H111.294V13.8747H113.945V11.6543H114.898Z" fill="black"></path>
              <path d="M119.735 15.7877H117.171L116.666 17.0323H115.685L117.992 11.6543H118.929L121.244 17.0323H120.248L119.735 15.7877ZM119.42 15.0041L118.453 12.6531L117.494 15.0041H119.42Z" fill="black"></path>
              <path d="M125.691 11.6543V17.0323H124.753V15.5342H123.486H123.383L122.431 17.0323H121.428L122.526 15.3728C122.17 15.2345 121.894 15.0169 121.699 14.7198C121.508 14.4176 121.413 14.0539 121.413 13.6288C121.413 13.2191 121.501 12.8656 121.677 12.5686C121.853 12.2715 122.102 12.0461 122.424 11.8925C122.746 11.7337 123.125 11.6543 123.559 11.6543H125.691ZM123.588 12.4994C123.198 12.4994 122.898 12.5942 122.688 12.7837C122.482 12.9732 122.38 13.2498 122.38 13.6134C122.38 13.9669 122.48 14.2409 122.68 14.4355C122.88 14.625 123.171 14.7198 123.552 14.7198H124.753V12.4994H123.588Z" fill="black"></path>
              <path d="M50.316 20.875V26.253H49.3785V21.7201H46.7197V26.253H45.7822V20.875H50.316Z" fill="black"></path><path d="M56.0909 20.875V26.253H55.1534V21.7201H53.1319L53.0879 23.0646C53.0637 23.8175 53.0051 24.4297 52.9121 24.9008C52.8194 25.3671 52.6704 25.7229 52.4654 25.9687C52.2603 26.2095 51.9771 26.3298 51.6157 26.3298C51.4889 26.3298 51.3154 26.3044 51.0957 26.253L51.1616 25.3848C51.2252 25.4055 51.2985 25.4156 51.3814 25.4156C51.6794 25.4156 51.8892 25.2312 52.0112 24.8624C52.1383 24.4886 52.2163 23.902 52.2456 23.103L52.3189 20.875H56.0909Z" fill="black"></path>
              <path d="M60.9322 25.0084H58.3687L57.8633 26.253H56.8818L59.189 20.875H60.1265L62.441 26.253H61.4449L60.9322 25.0084ZM60.6173 24.2247L59.6504 21.8738L58.691 24.2247H60.6173Z" fill="black"></path>
              <path d="M66.6905 21.7201H64.9913V26.253H64.0464V21.7201H62.3545V20.875H66.6905V21.7201Z" fill="black"></path>
              <path d="M73.2994 23.5566C73.2994 24.2634 73.0651 24.8218 72.5963 25.2315C72.1275 25.6413 71.461 25.8641 70.5967 25.8999V26.4684H69.7178V25.8999C68.8536 25.8538 68.1847 25.6286 67.711 25.2238C67.2422 24.8192 67.0078 24.2634 67.0078 23.5566C67.0078 22.8497 67.2422 22.2942 67.711 21.8894C68.1847 21.4797 68.8536 21.2517 69.7178 21.2056V20.6602H70.5967V21.2056C71.461 21.2517 72.1275 21.4797 72.5963 21.8894C73.0651 22.2942 73.2994 22.8497 73.2994 23.5566ZM70.5967 25.1162C71.1827 25.0701 71.6272 24.9165 71.9298 24.6552C72.2326 24.389 72.3839 24.0202 72.3839 23.5489C72.3839 23.0778 72.2301 22.7115 71.9225 22.4502C71.6199 22.189 71.1779 22.038 70.5967 21.9969V25.1162ZM67.938 23.5566C67.938 24.0228 68.0895 24.3863 68.3921 24.6476C68.6997 24.9088 69.1417 25.0651 69.7178 25.1162V21.9969C68.5313 22.0891 67.938 22.6092 67.938 23.5566Z" fill="black"></path>
              <path d="M76.6724 26.3285C76.1499 26.3285 75.6786 26.2109 75.2588 25.9751C74.8388 25.7345 74.5092 25.4042 74.27 24.984C74.0306 24.5591 73.9111 24.0851 73.9111 23.5627C73.9111 23.0402 74.0306 22.5692 74.27 22.149C74.5092 21.7239 74.8388 21.3936 75.2588 21.158C75.6786 20.9172 76.1499 20.7969 76.6724 20.7969C77.1947 20.7969 77.666 20.9172 78.086 21.158C78.5058 21.3936 78.8354 21.7214 79.0748 22.1413C79.314 22.5615 79.4337 23.0352 79.4337 23.5627C79.4337 24.0904 79.314 24.5641 79.0748 24.984C78.8354 25.4042 78.5058 25.7345 78.086 25.9751C77.666 26.2109 77.1947 26.3285 76.6724 26.3285ZM76.6724 25.4527C77.0141 25.4527 77.3218 25.3734 77.5953 25.2145C77.8686 25.0508 78.0835 24.8253 78.2398 24.5384C78.3959 24.2465 78.4742 23.9214 78.4742 23.5627C78.4742 23.2042 78.3959 22.8815 78.2398 22.5946C78.0835 22.3027 77.8686 22.0775 77.5953 21.9186C77.3218 21.7547 77.0141 21.6727 76.6724 21.6727C76.3305 21.6727 76.0229 21.7547 75.7495 21.9186C75.476 22.0775 75.2611 22.3027 75.105 22.5946C74.9487 22.8815 74.8706 23.2042 74.8706 23.5627C74.8706 23.9214 74.9487 24.2465 75.105 24.5384C75.2611 24.8253 75.476 25.0508 75.7495 25.2145C76.0229 25.3734 76.3305 25.4527 76.6724 25.4527Z" fill="black"></path>
              <path d="M82.5957 20.875C83.04 20.875 83.4259 20.9518 83.753 21.1055C84.0851 21.2591 84.3389 21.4794 84.5147 21.7662C84.6905 22.0531 84.7784 22.3938 84.7784 22.788C84.7784 23.1774 84.6905 23.5179 84.5147 23.8098C84.3389 24.0967 84.0851 24.3169 83.753 24.4706C83.4259 24.6242 83.04 24.7011 82.5957 24.7011H81.4385V26.253H80.4863V20.875H82.5957ZM82.5518 23.8559C82.967 23.8559 83.2819 23.7637 83.4966 23.5793C83.7116 23.395 83.8189 23.1313 83.8189 22.788C83.8189 22.4449 83.7116 22.1811 83.4966 21.9967C83.2819 21.8123 82.967 21.7201 82.5518 21.7201H81.4385V23.8559H82.5518Z" fill="black"></path>
              <path d="M90.3888 26.253L90.3814 22.6881L88.6968 25.6384H88.272L86.5874 22.7342V26.253H85.6865V20.875H86.4702L88.4991 24.4322L90.506 20.875H91.2823L91.297 26.253H90.3888Z" fill="black"></path>
              <path d="M96.1305 25.0084H93.5669L93.0615 26.253H92.0801L94.3873 20.875H95.3248L97.6393 26.253H96.6432L96.1305 25.0084ZM95.8155 24.2247L94.8487 21.8738L93.8892 24.2247H95.8155Z" fill="black"></path>
              </svg>
          </div>
        </a>
        <div className="NavMenu_commonsNavMenu__qSq5M">
          <a href="https://unionepro.ru" className="NavMenu_commonsNavMenuItem__N9+6J NavMenu_commonsNavMenuItemActive__-A5SY">
            <span className="NavMenu_itemIcon__Kpda0">
              <svg width="20px" height="20px" viewBox="0px 0px 20px 20px" fill="none">
                <path opacity="0.3" d="M10.0013 4.42065V17.779C9.85964 17.779 9.70963 17.754 9.59297 17.6873L9.55963 17.6706C7.95964 16.7956 5.16797 15.879 3.35964 15.6373L3.11797 15.604C2.31797 15.504 1.66797 14.754 1.66797 13.954V3.88732C1.66797 2.89565 2.4763 2.14565 3.46797 2.22898C5.21797 2.37065 7.86797 3.25398 9.3513 4.17898L9.55963 4.30398C9.68464 4.37898 9.84297 4.42065 10.0013 4.42065Z" fill="#0071CE"></path>
                <path d="M18.3333 3.89128V13.9496C18.3333 14.7496 17.6833 15.4996 16.8833 15.5996L16.6083 15.633C14.7917 15.8746 11.9917 16.7996 10.3917 17.683C10.2833 17.7496 10.15 17.7746 10 17.7746V4.41628C10.1583 4.41628 10.3167 4.37462 10.4417 4.29962L10.5833 4.20795C12.0667 3.27462 14.725 2.38295 16.475 2.23295H16.525C17.5167 2.14962 18.3333 2.89128 18.3333 3.89128Z" fill="#0071CE"></path>
                <path d="M6.45703 7.69922H4.58203C4.24036 7.69922 3.95703 7.41589 3.95703 7.07422C3.95703 6.73255 4.24036 6.44922 4.58203 6.44922H6.45703C6.7987 6.44922 7.08203 6.73255 7.08203 7.07422C7.08203 7.41589 6.7987 7.69922 6.45703 7.69922Z" fill="#0071CE"></path>
                <path d="M7.08203 10.1992H4.58203C4.24036 10.1992 3.95703 9.91589 3.95703 9.57422C3.95703 9.23255 4.24036 8.94922 4.58203 8.94922H7.08203C7.4237 8.94922 7.70703 9.23255 7.70703 9.57422C7.70703 9.91589 7.4237 10.1992 7.08203 10.1992Z" fill="#0071CE"></path>
              </svg>
            </span>
            <span className="NavMenu_itemLabel__kbH6O">Портал</span>
          </a>
          <a href="https://assessment.unionepro.ru" className="NavMenu_commonsNavMenuItem__N9+6J NavMenu_commonsNavMenuItemNotActive__0ESa-">
          <span className="NavMenu_itemIcon__Kpda0">
            <svg width="20px" height="20px" viewBox="0px 0px 20px 20px" fill="none"><path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M13.9032 3.14146C11.3303 2.85389 8.67078 2.85389 6.09782 3.14146C5.28726 3.23205 4.55978 3.61442 4.02974 4.18333C3.54592 4.69651 3.22363 5.36344 3.14146 6.09872C2.85389 8.67168 2.85389 11.3312 3.14146 13.9041C3.22927 14.6898 3.59122 15.3974 4.13145 15.9228C4.65108 16.4339 5.33794 16.7753 6.09782 16.8602C8.67078 17.1478 11.3303 17.1478 13.9032 16.8602C14.6376 16.7781 15.3039 16.4565 15.8168 15.9736C16.3865 15.4435 16.7695 14.7154 16.8602 13.9041C17.1478 11.3312 17.1478 8.67168 16.8602 6.09872C16.7752 5.33778 16.433 4.65006 15.9207 4.13018C15.3954 3.59065 14.6883 3.2292 13.9032 3.14146Z" fill="#0071CE"></path>
            <path d="M6.71387 9.14286L9.57101 12L17.1422 4.28516" stroke="#0071CE" strokeWidth="1.5" strokeLinecap="round"></path>
          </svg>
          </span>
          <span className="NavMenu_itemLabel__kbH6O">Ассесмент</span>
          </a>
          <a href="https://courses.unionepro.ru" className="NavMenu_commonsNavMenuItem__N9+6J NavMenu_commonsNavMenuItemNotActive__0ESa-">
            <span className="NavMenu_itemIcon__Kpda0">
              <svg width="18px" height="18px" viewBox="0px 0px 18px 18px" fill="none">
                <path opacity="0.4" d="M0.667055 8.23242C0.708722 10.1808 0.650482 13.5133 0.667149 13.8808C0.726316 14.6666 1.20205 15.4608 1.67039 16.0208C2.32205 16.8066 3.12455 17.1574 4.24372 17.1574C5.79039 17.1658 7.49539 17.1658 9.15122 17.1658C10.8137 17.1658 12.4271 17.1658 13.7896 17.1574C14.8929 17.1574 15.7204 16.7974 16.3637 16.0208C16.8321 15.4608 17.2826 14.6583 17.3251 13.8808C17.3418 13.5716 17.2754 9.95409 17.3254 8.23242H0.667055Z" fill="#0071CE"></path>
                <path d="M8.37109 11.8203V12.8986C8.37109 13.2436 8.65109 13.5236 8.99609 13.5236C9.34109 13.5236 9.62109 13.2436 9.62109 12.8986V11.8203C9.62109 11.4753 9.34109 11.1953 8.99609 11.1953C8.65109 11.1953 8.37109 11.4753 8.37109 11.8203Z" fill="#0071CE"></path><path fillRule="evenodd" clipRule="evenodd" d="M7.50949 11.1313C7.42616 11.4338 7.13532 11.6271 6.82032 11.5855C4.69449 11.2888 2.66283 10.5346 0.947825 9.40213C0.771992 9.28713 0.666992 9.09047 0.666992 8.88047V5.99213C0.666992 4.24213 2.09366 2.8188 3.84783 2.8188H5.48699C5.64366 1.6088 6.66866 0.667969 7.92033 0.667969H10.072C11.3228 0.667969 12.3487 1.6088 12.5053 2.8188H14.1528C15.902 2.8188 17.3253 4.24213 17.3253 5.99213V8.88047C17.3253 9.09047 17.2195 9.2863 17.0453 9.40213C15.327 10.5396 13.287 11.2971 11.147 11.593C11.1178 11.5971 11.0895 11.5988 11.0612 11.5988C10.7787 11.5988 10.5262 11.408 10.4553 11.128C10.287 10.4646 9.68449 10.0005 8.99199 10.0005C8.29032 10.0005 7.69449 10.4546 7.50949 11.1313ZM10.072 1.91797H7.92033C7.35949 1.91797 6.89116 2.3013 6.75116 2.8188H11.2403C11.1003 2.3013 10.632 1.91797 10.072 1.91797Z" fill="#0071CE"></path>
              </svg>
            </span>
          <span className="NavMenu_itemLabel__kbH6O">Витрина курсов</span>
          </a>
          <a href="https://ep.unionepro.ru" className="NavMenu_commonsNavMenuItem__N9+6J NavMenu_commonsNavMenuItemNotActive__0ESa-">
            <span className="NavMenu_itemIcon__Kpda0">
              <svg width="20px" height="20px" viewBox="0px 0px 20px 20px" fill="none"><path opacity="0.3" d="M18.0505 8.69944L17.2338 12.1828C16.5338 15.1911 15.1505 16.4078 12.5505 16.1578C12.1338 16.1244 11.6838 16.0494 11.2005 15.9328L9.80048 15.5994C6.32548 14.7744 5.25048 13.0578 6.06714 9.57444L6.88381 6.08277C7.05048 5.37444 7.25048 4.75777 7.50048 4.24944C8.47548 2.23277 10.1338 1.6911 12.9171 2.34944L14.3088 2.67444C17.8005 3.4911 18.8671 5.2161 18.0505 8.69944Z" fill="#0071CE"></path>
                <path d="M12.5503 16.1583C12.0336 16.5083 11.3836 16.8 10.592 17.0583L9.27528 17.4917C5.96695 18.5583 4.22528 17.6667 3.15028 14.3583L2.08362 11.0667C1.01695 7.75833 1.90028 6.00833 5.20862 4.94167L6.52528 4.50833C6.86695 4.4 7.19195 4.30833 7.50028 4.25C7.25028 4.75833 7.05028 5.375 6.88362 6.08333L6.06695 9.575C5.25028 13.0583 6.32528 14.775 9.80028 15.6L11.2003 15.9333C11.6836 16.05 12.1336 16.125 12.5503 16.1583Z" fill="#0071CE"></path>
                <path d="M14.5751 8.75912C14.5251 8.75912 14.4751 8.75079 14.4168 8.74246L10.3751 7.71746C10.0418 7.63412 9.84181 7.29246 9.92514 6.95912C10.0085 6.62579 10.3501 6.42579 10.6835 6.50912L14.7251 7.53412C15.0585 7.61746 15.2585 7.95912 15.1751 8.29246C15.1085 8.56746 14.8501 8.75912 14.5751 8.75912Z" fill="#0071CE"></path>
                <path d="M12.1333 11.5754C12.0833 11.5754 12.0333 11.5671 11.9749 11.5587L9.54994 10.9421C9.21661 10.8587 9.01661 10.5171 9.09994 10.1837C9.18328 9.8504 9.52494 9.6504 9.85828 9.73373L12.2833 10.3504C12.6166 10.4337 12.8166 10.7754 12.7333 11.1087C12.6666 11.3921 12.4166 11.5754 12.1333 11.5754Z" fill="#0071CE"></path>
              </svg>
            </span>
            <span className="NavMenu_itemLabel__kbH6O">ОПОП</span>
          </a>
          <a href="https://apps.unionepro.ru" className="NavMenu_commonsNavMenuItem__N9+6J NavMenu_commonsNavMenuItemNotActive__0ESa-">
            <span className="NavMenu_itemIcon__Kpda0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path opacity="0.3" d="M17.5335 5.99102L10.0001 10.3493L2.4668 5.99102C2.80013 5.37435 3.28346 4.83268 3.82513 4.53268L8.27513 2.06602C9.22513 1.53268 10.7751 1.53268 11.7251 2.06602L16.1751 4.53268C16.7168 4.83268 17.2001 5.37435 17.5335 5.99102Z" fill="#0071CE"></path>
                <path opacity="0.6" d="M10.0005 10.3505V18.3339C9.37552 18.3339 8.75052 18.2005 8.27552 17.9339L3.82552 15.4672C2.81719 14.9089 1.99219 13.5089 1.99219 12.3589V7.64219C1.99219 7.10885 2.17552 6.52552 2.46719 5.99219L10.0005 10.3505Z" fill="#0071CE"></path><path d="M18.0093 7.64219V12.3589C18.0093 13.5089 17.1843 14.9089 16.176 15.4672L11.726 17.9339C11.251 18.2005 10.626 18.3339 10.001 18.3339V10.3505L17.5343 5.99219C17.826 6.52552 18.0093 7.10885 18.0093 7.64219Z" fill="#0071CE"></path>
              </svg>
            </span>
            <span className="NavMenu_itemLabel__kbH6O">Каталог ПО</span>
          </a>
          <a href="https://metrics.unionepro.ru" className="NavMenu_commonsNavMenuItem__N9+6J NavMenu_commonsNavMenuItemNotActive__0ESa-">
            <span className="NavMenu_itemIcon__Kpda0">
              <svg width="20px" height="20px" viewBox="0px 0px 20px 20px" fill="none">
                <path d="M18.3337 18.334H1.66699C1.32533 18.334 1.04199 18.0507 1.04199 17.709C1.04199 17.3673 1.32533 17.084 1.66699 17.084H18.3337C18.6753 17.084 18.9587 17.3673 18.9587 17.709C18.9587 18.0507 18.6753 18.334 18.3337 18.334Z" fill="#0071CE"></path>
                <path d="M8.125 3.33268V18.3327H11.875V3.33268C11.875 2.41602 11.5 1.66602 10.375 1.66602H9.625C8.5 1.66602 8.125 2.41602 8.125 3.33268Z" fill="#0071CE"></path>
                <path opacity="0.3" d="M2.5 8.33268V18.3327H5.83333V8.33268C5.83333 7.41602 5.5 6.66602 4.5 6.66602H3.83333C2.83333 6.66602 2.5 7.41602 2.5 8.33268Z" fill="#0071CE"></path>
                <path opacity="0.6" d="M14.167 5.71549V18.3341H17.5003V5.71549C17.5003 4.79883 17.167 4.04883 16.167 4.04883H15.5003C14.5003 4.04883 14.167 4.79883 14.167 5.71549Z" fill="#0071CE"></path>
              </svg>
            </span>
            <span className="NavMenu_itemLabel__kbH6O">Аналитика</span>
          </a>
          <a href="https://learn.unionepro.ru/" className="NavMenu_commonsNavMenuItem__N9+6J NavMenu_commonsNavMenuItemNotActive__0ESa-">
            <span className="NavMenu_itemIcon__Kpda0">
              <svg width="20px" height="20px" viewBox="0px 0px 20px 20px" fill="none">
                <path d="M11.6667 15V16.6667L13.3333 17.5V18.3333H6.66666L6.66333 17.5033L8.33333 16.6667V15H2.49333C2.3839 14.9993 2.27567 14.9771 2.17486 14.9345C2.07404 14.892 1.98262 14.83 1.90582 14.752C1.82902 14.674 1.76837 14.5817 1.72733 14.4802C1.68629 14.3788 1.66567 14.2703 1.66666 14.1608V3.33917C1.66666 2.87583 2.04583 2.5 2.49333 2.5H17.5067C17.9633 2.5 18.3333 2.87417 18.3333 3.33917V14.1608C18.3333 14.6242 17.9542 15 17.5067 15H11.6667ZM3.33333 4.16667V13.3333H16.6666L16.6667 4.16667H3.33333Z" fill="#0071CE">
                  </path>
              </svg>
            </span>
            <span className="NavMenu_itemLabel__kbH6O">LMS</span>
          </a>
          <a href="" className="NavMenu_commonsNavMenuItem__N9+6J NavMenu_commonsNavMenuItemNotActive__0ESa-">
            <span className="NavMenu_itemIcon__Kpda0">
              <Icon image={idhLogo}/>
            </span>
            <span className="NavMenu_itemLabel__kbH6O">InnoDataHub</span>
          </a>
        </div>
        <div className="NavProfile_commonsNavProfile__zg+C8">
          <div className="NavProfile_wrapper__8vQYw">
            <button className="Button_enterBtn__4ReAZ" type="button">Вход</button>
          </div>
        </div>
        </header>
        </div>
        
    )
  }

}

export default Header