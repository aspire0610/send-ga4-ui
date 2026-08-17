const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());

const targetUrls = [
  { name: '花櫃', url: 'https://www.costco.com.tw/Sports-Lifestyle/Garden-Lifestyle/Flowers-Plant/c/121307?utm_source=warehouse&utm_medium=W5009&utm_campaign=posm-flowers' },
  { name: '珠寶櫃', url: 'https://www.costco.com.tw/Jewelry-Gold/Jewelry-Buying-guide/Jewelry-Gold/c/CL10?utm_source=warehouse&utm_medium=W5009&utm_campaign=posm-jewelry' },
  { name: 'Rollout 家具海報', url: 'https://www.costco.com.tw/content/showroom?utm_source=warehouse&utm_medium=W5009&utm_campaign=Poster-FurnitureRollOut' },
  { name: 'Rollout Lsign', url: 'https://www.costco.com.tw/content/showroom?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-FurnitureRollOut' },
  { name: '吊掛', url: 'https://www.costco.com.tw/c/hero-showroom?utm_source=warehouse&utm_medium=W5009&utm_campaign=showroom-hangingbanner' },
  { name: '易拉展', url: 'https://www.costco.com.tw/c/hero-showroom?utm_source=warehouse&utm_medium=W5009&utm_campaign=showroom-rollupbanner' },
  { name: 'Lsign 通用', url: 'https://www.costco.com.tw/c/OnlineExclusive?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-OnlineExclusive' },
  { name: 'Lsign 家電', url: 'https://www.costco.com.tw/Televisions-Appliances/Large-Appliances/c/301?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-Appliances' },
  { name: 'Lsign 電視', url: 'https://www.costco.com.tw/Televisions-Appliances/TV-Home-Entertainment/c/101?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-tvs' },
  { name: 'Lsign 輪胎', url: 'https://www.costco.com.tw/Sports-Lifestyle/Automotive/c/1421?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-Tire' },
  { name: 'Lsign 玩具', url: 'https://www.costco.com.tw/Household-Baby-Toys/Toys/c/1308?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D28' },
  { name: 'Lsign HABA', url: 'https://www.costco.com.tw/Health-Beauty/Personal-Care/c/801?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D20' },
  { name: 'Lsign 運動', url: 'https://www.costco.com.tw/Sports-Lifestyle/Sports-Fitness/c/1209?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D26' },
  { name: 'Lsign 服飾', url: 'https://www.costco.com.tw/Clothing-Accessories/c/9?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D31D39' },
  { name: 'Lsign 食品', url: 'https://www.costco.com.tw/Food-Dining/c/CL8?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D12D13' },
  { name: 'Lsign 五金', url: 'https://www.costco.com.tw/Furniture-Kitchen/Hardware-DIY/c/605?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D23' },
  { name: 'Lsign 床墊', url: 'https://www.costco.com.tw/Furniture-Kitchen/Bedding/Mattress-Toppers/c/60205?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-Mattress' },
  { name: 'Lsign 儲藏屋', url: 'https://www.costco.com.tw/Sports-Lifestyle/Garden-Lifestyle/Outdoor-Storage/c/40201?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D27' },
  { name: 'Lsign 沙發', url: 'https://www.costco.com.tw/Furniture-Kitchen/Furniture/Sofas-Sectionals/c/50202?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D38' },
  { name: 'ENDCAP', url: 'https://www.costco.com.tw/c/OnlineExclusive?utm_source=warehouse&utm_medium=W5009&utm_campaign=Endcap-OnlineEX' },
  { name: '靜電貼紙 同價', url: 'https://www.costco.com.tw/Same-Price/c/hero-sameprice?utm_source=warehouse&utm_medium=W5009&utm_campaign=Sticker-SamePrice' },
  { name: 'M / L Sign 同價', url: 'https://www.costco.com.tw/Same-Price/c/hero-sameprice?utm_source=warehouse&utm_medium=W5009&utm_campaign=Sign-SamePrice' },
  { name: 'fy26p8 Minispotlight 週期購', url: 'https://www.costco.com.tw/content/subscription?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26p8_Minispotlight_Subscription' },
  { name: 'fy26p8 Minispotlight Costco APP', url: 'https://www.costco.com.tw/costco-app?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26p8_Minispotlight_CostcoApp' },
  { name: 'fy26 p10 app poster iOS', url: 'https://www.costco.com.tw/content/costco-app-ios?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p10_app_poster_iOS' },
  { name: 'fy26 p10 app poster Android', url: 'https://www.costco.com.tw/content/costco-app-ios?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p10_app_poster_Android' },
  { name: 'fy26 p10 minispotlight iOS', url: 'https://www.costco.com.tw/content/costco-app-ios?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p10_mini_spotlight_iOS' },
  { name: 'fy26 p10 minispotlight Android', url: 'https://www.costco.com.tw/content/costco-app-ios?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p10_mini_spotlight_Android' },
  { name: 'fy26p10w4 EM', url: 'https://www.costco.com.tw/executive-rewards?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26p_10w4_EM' },
  { name: 'fy26p10w4 D27', url: 'https://www.costco.com.tw/Lawn-Garden/Patio-Furniture/Outdoor-Patio-Furniture/c/40102?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p10_banner_d27' },
  { name: 'fy26p12w3 Showroom 1', url: 'https://www.costco.com.tw/Furniture-Kitchen/Furniture/Sofas-Sectionals/c/50202?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p12_Showroom_Sofas' },
  { name: 'fy26p12w3 Showroom 2', url: 'https://www.costco.com.tw/Furniture-Kitchen/Furniture/Cabinets-Tables/c/50407?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p12_Showroom_Cabinets' },
  { name: 'fy26p12w3 Showroom 3', url: 'https://www.costco.com.tw/Furniture-Kitchen/Furniture/Dining-Sets/c/50301?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p12_Showroom_DiningSets' },
  { name: 'fy26p12w3 Showroom 4', url: 'https://www.costco.com.tw/Furniture-Kitchen/Furniture/Computer-Desk-Chair-Sets/c/50602?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p12_Showroom_ComputerDeskChair' }
];

const MEASUREMENT_ID = 'G-F5DSB6YJ3';

app.get('/', (req, res) => {
  let checkboxesHtml = targetUrls.map((item, index) => `
    <div style="margin-bottom: 8px;">
      <label style="cursor: pointer; display: flex; align-items: center; gap: 8px; color: #cbd5e1;">
        <input type="checkbox" name="urlIndex" value="${index}" checked style="width: 16px; height: 16px;">
        <span><b>${index + 1}.</b>${item.name}</span>
      </label>
    </div>
  `).join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="zh-TW">
    <head>
        <meta charset="UTF-8">
        <title>Costco GA4 選擇性發送控制台</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 20px; margin: 0; }
            .container { max-width: 900px; margin: 0 auto; background: #1e293b; padding: 25px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
            h1 { font-size: 22px; margin-bottom: 5px; color: #38bdf8; }
            p { color: #94a3b8; margin-bottom: 15px; font-size: 14px; }
            .actions { margin-bottom: 15px; display: flex; gap: 10px; align-items: center; }
            button { background: #0284c7; color: white; border: none; padding: 10px 20px; font-size: 15px; font-weight: bold; border-radius: 6px; cursor: pointer; transition: background 0.2s; }
            button:hover { background: #0369a1; }
            button:disabled { background: #475569; cursor: not-allowed; }
            .btn-secondary { background: #334155; font-size: 13px; padding: 8px 14px; }
            .btn-secondary:hover { background: #475569; }
            .grid-box { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; max-height: 250px; overflow-y: auto; background: #0f172a; padding: 15px; border-radius: 8px; border: 1px solid #334155; margin-bottom: 15px; }
            #log-box { background: #090d16; border: 1px solid #334155; border-radius: 8px; padding: 15px; height: 220px; overflow-y: auto; font-family: monospace; font-size: 13px; color: #34d399; }
            .log-err { color: #f87171; }
            .log-info { color: #60a5fa; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>📊 Costco 連結 GA4 選擇性發送控制台</h1>
            <p>請勾選想要發送到 GA4 後台的目標連結：</p>
            
            <div class="actions">
                <button type="button" class="btn-secondary" onclick="toggleAll(true)">全選</button>
                <button type="button" class="btn-secondary" onclick="toggleAll(false)">全不選</button>
            </div>

            <div class="grid-box">
                ${checkboxesHtml}
            </div>

            <button type="button" id="start-btn" onclick="startSending()">開始發送勾選的數據</button>
            
            <h3 style="font-size: 15px; margin: 15px 0 8px 0; color: #cbd5e1;">即時執行日誌：</h3>
            <div id="log-box">等待開始執行...</div>
        </div>

        <script>
            function toggleAll(status) {
                var checkboxes = document.querySelectorAll('input[name="urlIndex"]');
                checkboxes.forEach(function(cb) {
                    cb.checked = status;
                });
            }

            async function startSending() {
                var btn = document.getElementById('start-btn');
                var logBox = document.getElementById('log-box');
                
                var checkboxes = document.querySelectorAll('input[name="urlIndex"]:checked');
                var selectedIndexes = [];
                checkboxes.forEach(function(cb) {
                    selectedIndexes.push(parseInt(cb.value));
                });

                if (selectedIndexes.length === 0) {
                    alert('請至少勾選一個連結！');
                    return;
                }

                btn.disabled = true;
                btn.innerText = '發送中...';
                logBox.innerHTML = '<span class="log-info">正在發送選中的 ' + selectedIndexes.length + ' 筆資料...</span>\\n';

                try {
                    var response = await fetch('/run-task', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ indexes: selectedIndexes })
                    });

                    var reader = response.body.getReader();
                    var decoder = new TextDecoder();

                    while (true) {
                        var result = await reader.read();
                        if (result.done) break;
                        var chunk = decoder.decode(result.value, { stream: true });
                        logBox.innerHTML += chunk;
                        logBox.scrollTop = logBox.scrollHeight;
                    }
                } catch (err) {
                    logBox.innerHTML += '<span class="log-err">執行發生錯誤: ' + err.message + '</span>\\n';
                } finally {
                    btn.disabled = false;
                    btn.innerText = '開始發送勾選的數據';
                    logBox.innerHTML += '\\n<span class="log-info">=== 任務執行完畢 ===</span>\\n';
                }
            }
        </script>
    </body>
    </html>
  `);
});

app.post('/run-task', async (req, res) => {
  var selectedIndexes = req.body.indexes || [];

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');

  res.write('開始向 GA4 發送選中的 ' + selectedIndexes.length + ' 個網頁數據...<br><br>');

  for (var i = 0; i < selectedIndexes.length; i++) {
    var targetIndex = selectedIndexes[i];
    var target = targetUrls[targetIndex];
    
    var clientId = Math.floor(Math.random() * 899999999 + 100000000) + '.' + Math.floor(Math.random() * 899999999 + 100000000);
    var gaEndpoint = 'https://www.google-analytics.com/g/collect';

    var params = {
      v: '2',
      tid: MEASUREMENT_ID,
      cid: clientId,
      _p: Math.floor(Math.random() * 100000),
      dl: target.url,
      dt: target.name,
      en: 'page_view'
    };

    try {
      var response = await axios.get(gaEndpoint, { 
        params,
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        timeout: 5000 
      });

      if (response.status === 200 || response.status === 204) {
        res.write('<span style="color: #34d399;">[成功] (' + (i + 1) + '/' + selectedIndexes.length + ') ' + target.name + ' 已送達</span><br>');
      }
    } catch (error) {
      res.write('<span style="color: #f87171;">[失敗] (' + (i + 1) + '/' + selectedIndexes.length + ') ' + target.name + ' 失敗: ' + error.message + '</span><br>');
    }

    await new Promise(resolve => setTimeout(resolve, 300));
  }

  res.write('<br><b>選中的網頁數據全部發送完畢！</b>');
  res.end();
});

app.listen(PORT, () => {
  console.log('UI 介面已啟動！請在瀏覽器打開：http://localhost:' + PORT);
});