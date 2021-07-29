interface experienceTextInterface {
  title: string;
  desc: string;
  placeholderImgIcon: string;
  imgIcon: string;
  imgIconAlt: string;
  placeholderImg: string;
  img: string;
  imgAlt: string;
  githubLink?: string;
  url?: string;
}

export const experienceText: experienceTextInterface[] = [
  {
    title: "CTF/Portfolio",
    desc:
      "Web application that serves as gateway to various APIs that are vulnerable to common attacks, including the OWASP top 10. Designed to be an introductory challenge to web application testing.",
    placeholderImgIcon: "portfolio-placeholder.webp",
    imgIcon: "portfolio.webp",
    imgIconAlt: "Portfolio Icon",
    placeholderImg: "logo.svg",
    img: "logo.svg",
    imgAlt: "Portfolio",
    githubLink: "https://github.com/glorisonlai/the-playground",
  },
  // {
  //   title: "Password Wordlist/Generator",
  //   desc:
  //     "A Python script that generates pronounceable passwords using verbal rules. Intended for bruteforcing the weirder passwords. Includes ruleset for including numbers at the end of syllables.",
  //   placeholderImgIcon: "logo.svg",
  //   imgIcon: "logo.svg",
  //   imgIconAlt: "Password Icon",
  //   placeholderImg: "logo.svg",
  //   img: "logo.svg",
  //   imgAlt: "Password Wordlist",
  // },
  {
    title: "Weather Display",
    desc:
      "Web application fetching and displaying data from OpenWeather. Includes search and autocomplete for any region listed in OpenWeather.",
    placeholderImgIcon: "weather-placeholder.webp",
    imgIcon: "weather.webp",
    imgIconAlt: "Weather Icon",
    placeholderImg: "logo.svg",
    img: "logo.svg",
    imgAlt: "Weather",
    url: "https://weather-app-458.herokuapp.com/",
    githubLink: "https://github.com/glorisonlai/weatherapp",
  },
  // {
  //   title: "Secure Chat App",
  //   desc:
  //     "Web application utitlising Diffie Hellman key exchange and public key cryptography to securely store encrypted messages decodable only to group chat members.",
  //   placeholderImgIcon: "logo.svg",
  //   imgIcon: "logo.svg",
  //   imgIconAlt: "Chat Icon",
  //   placeholderImg: "logo.svg",
  //   img: "logo.svg",
  //   imgAlt: "Chat",
  // },
  {
    title: "Penetration testing methodology notes",
    desc:
      "A collection of notes taken during preparation for the OSCP exam, designed as a general methodology when approaching a target. Publicly available for anyone interested.",
    placeholderImgIcon: "pen-test-placeholder.webp",
    imgIcon: "pen-test.webp",
    imgIconAlt: "Notes Icon",
    placeholderImg: "logo.svg",
    img: "logo.svg",
    imgAlt: "Notes",
    githubLink: "https://github.com/glorisonlai/pentesting-methodology",
  },
];
