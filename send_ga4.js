for (var i = 0; i < data.items.length; i++) {
    if (isStopped) break;

    var item = data.items[i];
    
    // 修正：發送當下才即時抓取最新時間戳記作為 sid
    item.params.sid = Math.floor(Date.now() / 1000).toString();

    var queryParams = new URLSearchParams(item.params).toString();
    var targetUrl = 'https://www.google-analytics.com/g/collect?' + queryParams;
    ...
