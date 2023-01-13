export default function handler(req, res) {
  if(req.method === 'GET') {
    const { test } = req.query
      // res.end(`Get: ${test.join(', ')}`)

    console.log(test)

    res.status(200).json(test)
  }
  else {
    {res.status(201).json('OG Image')}
  }
}
