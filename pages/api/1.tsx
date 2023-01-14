import { ImageResponse } from "@vercel/og";
import { NextRequest, NextResponse } from "next/server";

import getTextColor from "../../utils/GetColor";

//Vercel og config
export const config = {
  runtime: "edge",
};

// Example of imported font
const font = fetch(
  new URL("../../assets/Roboto-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

//HTTP REQUEST
export default async function handler(req: NextRequest, res: NextResponse) {
  //Next.Js way of specifying HTTP request, if you really want to use a GET method: if (req.method === 'GET' ) {}

  //import font
  const fontData = await font;

  //variables from query params
  const { searchParams } = req.nextUrl;
  let logoURL = searchParams.get("logoURL");
  const title = searchParams.get("title");
  //const brandcolor = searchParams.get('brandcolor'); if you want to add brand color
  const brandname = searchParams.get("brandname");
  let bg = searchParams.get("bg");

  //default background
  if (!bg) {
    bg = "#202024";
  }

  //checking if there is a logo img
  function loadImg() {
    if (logoURL) {
      return <img width="150" height="150" src={logoURL} />;
    }
  }

  //OG image
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          background: bg,
          width: "100%",
          height: "100%",
          padding: 10,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: '"Roboto"',
          textAlign: "center",
        }}
      >
        {/* Loading img if available */}
        {loadImg()}

        <h1
          style={{
            fontFamily: '"Roboto"',
            color: `${getTextColor(bg)}`,//the function to pick color dinamically is on utils folder
            fontSize: 40,
            paddingLeft: 50,
            paddingRight: 50,
            marginBottom: 0,
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontFamily: '"Roboto"',
            color: `${getTextColor(bg)}`,
            fontSize: 20,
          }}
        >
          {brandname}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 627,
      fonts: [
        {
          name: "Roboto",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
