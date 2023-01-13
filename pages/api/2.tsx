import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler(req, res) {
    // const { test } = req.query
        
    return new ImageResponse(
        (
          <div
            style={{
              fontSize: 128,
              background: 'black',
              color: '#fff',
              width: '100%',
              height: '100%',
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >      
           Hello
          </div>
        ),
        {
          width: 1200,
          height: 627,
        },
      );
    }