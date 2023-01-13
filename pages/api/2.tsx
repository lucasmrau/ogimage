import { ImageResponse } from '@vercel/og';
import { NextRequest, NextResponse } from 'next/server';

import getTextColor from '../../utils/GetColor';

export const config = {
  runtime: 'edge',
};

/*
GET https://api.screenshotone.com/take?url=https://www.saasbase.dev/collect-pre-sales-revenue-from-earlyadopters-
using-the-stripe-api/&access_key=a8xutsSytmBvZQ
*/

// Make sure the font exists in the specified path:
const font = fetch(new URL('../../assets/Roboto-Bold.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

export default async function handler(req: NextRequest, res: NextResponse) {
  const fontData = await font;

  const { searchParams } = req.nextUrl;
  //const brandcolor = searchParams.get('brandcolor');
  const windowurl = searchParams.get('windowurl');
  const brandname = searchParams.get('brandname');
  let bg = searchParams.get('bg');

  if(!bg) {
    bg = '#202024'
  }

  const printimage = `https://api.screenshotone.com/take?url=${windowurl}/&access_key=${process.env.SCREENSHOTONE_KEY}`

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: bg,
          width: '100%',
          height: '100%',
          padding: 10,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          fontFamily: '"Roboto"',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <h1 style={{
          fontFamily: '"Roboto"',
          color: `${getTextColor(bg)}`,
          fontSize: 40,
          paddingLeft: 50,
          paddingRight: 50,
          marginTop: 30
        }}>
          {brandname}
        </h1>
        <img
          width="800"
          height="500"
          src={printimage}
          style={{
            position: 'absolute',
            bottom: 0
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 627,
      fonts: [
        {
          name: 'Roboto',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  );
}