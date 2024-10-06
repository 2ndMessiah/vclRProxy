export default async function (req, res) {
    const { pathname } = new URL(req.url);
    const path = pathname.slice(1); // 去掉 "/"
  
    // 如果路径为空，返回默认响应
    if (!path) {
      res.status(200).send('Mem: 291612K used, 199888K free, 26284K shrd, 5220K buff, 57220K cached');
      return;
    }
  
    const targetUrl = `https://${path}`;
  
    try {
      // 代理请求到目标 URL
      const proxyRes = await fetch(targetUrl);
      const body = await proxyRes.text();  // 获取响应内容
  
      // 返回代理的响应
      res.status(proxyRes.status).send(body);
    } catch (error) {
      res.status(500).send(`Error: ${error.message}`);
    }
  }
  