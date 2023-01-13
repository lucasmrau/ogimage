import { ImageResponse } from '@vercel/og';
import { NextRequest, NextResponse } from 'next/server';

import getTextColor from '../../utils/GetColor';

export const config = {
  runtime: 'edge',
};



// Make sure the font exists in the specified path:
const font = fetch(new URL('../../assets/Roboto-Bold.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

export default async function handler(req: NextRequest, res: NextResponse) {
  const fontData = await font;

  const { searchParams } = req.nextUrl;
  const logoURL = searchParams.get('logoURL');
  const title = searchParams.get('title');
  // const brandcolor = searchParams.get('brandcolor');
  // const windowurl = searchParams.get('windowurl');
  const brandname = searchParams.get('brandname');
  const bg = searchParams.get('bg');

  // if (!title) {
  //   return new ImageResponse(<>Visit with &quot;?title=vercel&quot;</>, {
  //     width: 1200,
  //     height: 630,
  //   });
  // }

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
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: '"Roboto"',
          textAlign: 'center'
        }}
      >
        <img
          width="150"
          height="150"
          src={logoURL}
        />
        <h1 style={{
          fontFamily: '"Roboto"',
          color: `${getTextColor(bg)}`,
          fontSize: 40,
          paddingLeft: 50,
          paddingRight: 50,
          marginBottom: 0
        }}>
          {title}
        </h1>
        <p style={{
          fontFamily: '"Roboto"',
          color: `${getTextColor(bg)}`,
          fontSize: 20
        }}>
          {brandname}
        </p>
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