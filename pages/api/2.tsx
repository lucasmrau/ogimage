import { ImageResponse } from '@vercel/og';
import { NextRequest, NextResponse } from 'next/server';

import getTextColor from '../../utils/GetColor';

export const config = {
  runtime: 'edge',
};

// Example of imported font
const font = fetch(new URL('../../assets/Roboto-Bold.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

//HTTP REQUEST
export default async function handler(req: NextRequest, res: NextResponse) {
   //Next.Js way of specifying HTTP request, if you really want to use a GET method: if (req.method === 'GET' ) {}

  //import font
  const fontData = await font;

  //variables from query params
  const { searchParams } = req.nextUrl;
  //const brandcolor = searchParams.get('brandcolor'); if you want to add brand color
  const windowurl = searchParams.get('windowurl');
  const brandname = searchParams.get('brandname');
  let bg = searchParams.get('bg');

  //default background
  if(!bg) {
    bg = '#202024'
  }

  //Consuming API from screenshotone, please generate your access key and add to .env(SCREENSHOTONE_KEY)
  const printimage = `https://api.screenshotone.com/take?url=${windowurl}/&access_key=${process.env.SCREENSHOTONE_KEY}`

  //OG image
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
          color: `${getTextColor(bg)}`,//the function to pick color dinamically is on utils folder
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