import Head from 'next/head'
import { useEffect, useState } from 'react'
import TagManager from 'react-gtm-module'
import CookieHOC from 'components/CookieHOC'
import WebCheckoutProgress from 'components/WebCheckoutProgress'
import OneLinkUrlGenerator from 'helpers/onelink-smart-script'
import StarImage from 'assets/icons/grey_star.svg'

const FinalPage = ({ cookies }) => {
  const [deepLink, setDeepLink] = useState('https://bloom.onelink.me/GOFv')

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        page: 'final',
      },
    })

    const onelinkGenerator = new OneLinkUrlGenerator({
      oneLinkURL: 'https://bloom.onelink.me/GOFv',
      pidKeysList: ['pid'],
      campaignKeysList: ['af_c_id'],
      pidStaticValue: 'webcheckout',
    })
    onelinkGenerator.setDeepLinkValue('original_url_deeplinkvalue', 'webcheckoutfinal')
    const url = onelinkGenerator.generateUrl()

    setDeepLink(url)
  })

  return (
    <div className='container'>
      <Head>
        <title>Welcome to Bloom Premium</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(t,e,n,s,a,c,i,o,p){t.AppsFlyerSdkObject=a,t.AF=t.AF||function(){(t.AF.q=t.AF.q||[]).push([Date.now()].concat(Array.prototype.slice.call(arguments)))},t.AF.id=t.AF.id||i,t.AF.plugins={},o=e.createElement(n),p=e.getElementsByTagName(n)[0],o.async=1,o.src="https://websdk.appsflyer.com?"+(c.length>0?"st="+c.split(",").sort().join(",")+"&":"")+(i.length>0?"af_id="+i:""),p.parentNode.insertBefore(o,p)}(window,document,"script",0,"AF","banners",{banners: {key: "74220ab1-7ca1-4945-9a3e-7678c258ed77"}})
AF('banners', 'showBanner')`,
          }}
        />
      </Head>

      <WebCheckoutProgress percent={10 / 10} />
      <div className='text-center'>
        <img src='/images/app_icon1.png' alt='app icon' />
      </div>
      <div className='wc-step'>
        <h1>Welcome to Bloom Premium</h1>
        <h3>Install Bloom App to start your first session</h3>
      </div>
      <a
        href={deepLink}
        className='btn btn-primary'
      >
        <img src='/images/apple.png' alt='apple' />
        Install Now
      </a>
      <section className='advertise-section'>
        <div className='bloom-review'>
          <div>
            <img src='/images/app_icon2.png' alt='app icon' />
          </div>
          <div>
            <h4>Bloom: CBT Therapy &amp; Self-Care</h4>
            <h5>Daily mental health coach</h5>
            <div className='review'>
              <StarImage />
              <StarImage />
              <StarImage />
              <StarImage />
              <StarImage />
              4.4K
            </div>
          </div>
        </div>

        <div className='advertisement'>
          <div>
            <img src='/images/therapist.png' alt='therapist' />
          </div>
          <div>
            <img src='/images/feel_better.png' alt='feel_better' />
          </div>
          <div>
            <img src='/images/choose_theography.png' alt='choose_theography' />
          </div>
        </div>
      </section>

      <style jsx>
        {`
          h1 {
            font-size: 45px;
            font-weight: 500;
            margin-top: 48px;
            text-align: center;
          }
          h3 {
            font-size: 35px;
            font-weight: 900;
            text-align: center;
            margin-top: 27px;
            margin-bottom: 57px;
          }
          .btn-primary {
            height: 78px;
            line-height: 78px;
            font-size: 20px;
          }

          .advertise-section {
            max-width: 345px;
            margin: 0 auto;
          }
          .bloom-review {
            margin-top: 55px;
            display: flex;
            font-family: SFProDisplay;
            align-items: center;
          }
          .bloom-review img {
            margin-right: 10px;
          }
          .bloom-review h4 {
            font-size: 16px;
            color: #030203;
          }
          .bloom-review h5 {
            font-size: 13px;
            color: #8e8e8f;
          }
          .bloom-review .review {
            font-size: 12px;
            color: #8e8e8f;
            display: flex;
          }
          .advertisement {
            margin-top: 17px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 8px;
          }
          .advertisement img {
            width: 100%;
          }
          @media (max-width: 559px) {
            .container {
              padding-top: 80px;
            }
            h1 {
              font-size: 26px;
              margin-top: 25px;
            }
            h3 {
              margin-top: 7px;
              font-size: 20px;
              margin-bottom: 28px;
            }
            p {
              max-width: 400px;
            }
            .bloom-review {
              margin-top: 45px;
            }
            .advertisement {
              margin-top: 17px;
            }
          }
        `}
      </style>
    </div>
  )
}

// export default CookieHOC(FinalPage, ['registered'], '/secure-account')
export default CookieHOC(FinalPage, [], '/secure-account')
