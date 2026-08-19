const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

// 解析 JSON Body
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

const MEASUREMENT_ID = 'G-F5DSSB6YJ3';
const fixedUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36';

app.get('/', (req, res) => {
  const checkboxesHtml = targetUrls.map((item, index) => `
    <div style="margin-bottom: 10px;">
      <label style="cursor: pointer; display: flex; align-items: center; gap: 12px; color: #cbd5e1; font-size: 15px; padding: 4px 0;">
        <input type="checkbox" name="urlIndex" value="${index}" checked style="width: 20px; height: 20px; accent-color: #38bdf8;">
        <span><b>${index + 1}.</b> ${item.name}</span>
      </label>
    </div>
  `).join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="zh-TW">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Costco GA4 發送控制台</title>
        <style>
            * { box-sizing: border-box; }
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 10px; margin: 0; }
            .container { max-width: 900px; margin: 0 auto; background: #1e293b; padding: 15px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
            @media (min-width: 768px) { body { padding: 20px; } .container { padding: 25px; } }
            h1 { font-size: 20px; margin-bottom: 5px; color: #38bdf8; }
            p { color: #94a3b8; margin-bottom: 15px; font-size: 13px; }
            .actions { margin-bottom: 15px; display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
            button { background: #0284c7; color: white; border: none; padding: 12px 20px; font-size: 16px; font-weight: bold; border-radius: 8px; cursor: pointer; transition: background 0.2s; }
            button:hover { background: #0369a1; }
            button:disabled { background: #475569; cursor: not-allowed; }
            .btn-secondary { background: #334155; font-size: 14px; padding: 10px 16px; width: auto; }
            .btn-stop { background: #dc2626; }
            .grid-box { display: grid; grid-template-columns: 1fr; gap: 5px; max-height: 320px; overflow-y: auto; background: #0f172a; padding: 12px; border-radius: 8px; border: 1px solid #334155; margin-bottom: 15px; }
            @media (min-width: 768px) { .grid-box { grid-template-columns: 1fr 1fr; gap: 10px; max-height: 280px; padding: 15px; } }
            .auto-panel { background: #0f172a; border: 1px solid #334155; padding: 12px; border-radius: 8px; margin-bottom: 15px; display: flex; align-items: center; gap: 15px; flex-wrap: wrap; }
            .auto-panel label { color: #cbd5e1; font-size: 14px; display: flex; align-items: center; gap: 6px; }
            .auto-panel input[type="number"] { background: #1e293b; border: 1px solid #475569; color: white; padding: 6px 10px; border-radius: 6px; width: 80px; font-size: 14px; }
            #log-box { background: #090d16; border: 1px solid #334155; border-radius: 8px; padding: 15px; height: 280px; overflow-y: auto; font-family: monospace; font-size: 12px; color: #34d399; line-height: 1.5; }
            .log-err { color: #f87171; }
            .log-info { color: #60a5fa; }
            .log-warn { color: #fbbf24; }
            #status-text { font-weight: bold; color: #38bdf8; width: 100%; margin-top: 5px; font-size: 15px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>📊 GA4 選擇性發送控制台</h1>
            <p>請勾選要發送的目標連結：</p>
            
            <div class="actions">
                <button type="button" class="btn-secondary" onclick="toggleAll(true)">全選</button>
                <button type="button" class="btn-secondary" onclick="toggleAll(false)">全不選</button>
            </div>

            <div class="grid-box">
                ${checkboxesHtml}
            </div>

            <div class="auto-panel">
                <label>
                    <input type="checkbox" id="auto-repeat-chk" style="width: 16px; height: 16px;">
                    啟用自動重複發送
                </label>
                <label>
                    間隔 (秒): 
                    <input type="number" id="interval-sec" value="60" min="10">
                </label>
                <label>
                    重複次數: 
                    <input type="number" id="repeat-count" value="5" min="1">
                </label>
                <div id="status-text"></div>
            </div>

            <div style="display: flex; gap: 10px;">
                <button type="button" id="start-btn" onclick="handleStart()">單次發送 / 啟動自動重複</button>
                <button type="button" id="stop-btn" class="btn-stop" style="display: none;" onclick="stopAutoLoop()">停止自動發送</button>
            </div>
            
            <h3 style="font-size: 14px; margin: 15px 0 8px 0; color: #cbd5e1;">即時執行日誌 (包含傳送參數)：</h3>
            <div id="log-box">等待開始執行...</div>
        </div>

        <script>
            var autoTimer = null;
            var countdownTimer = null;
            var isStopped = false;
            var currentRunCount = 0;
            var maxRuns = 1;
            var currentController = null;

            function toggleAll(status) {
                var checkboxes = document.querySelectorAll('input[name="urlIndex"]');
                checkboxes.forEach(function(cb) { cb.checked = status; });
            }

            function updateStatus(msg, color) {
                var el = document.getElementById('status-text');
                el.innerText = msg;
                if (color) el.style.color = color;
            }

            function handleStart() {
                isStopped = false;
                var isAuto = document.getElementById('auto-repeat-chk').checked;
                
                if (isAuto) {
                    maxRuns = parseInt(document.getElementById('repeat-count').value, 10) || 1;
                    currentRunCount = 0;
                    document.getElementById('start-btn').style.display = 'none';
                    document.getElementById('stop-btn').style.display = 'inline-block';
                    startNextLoop();
                } else {
                    currentRunCount = 1;
                    maxRuns = 1;
                    executeTask();
                }
            }

            function stopAutoLoop() {
                isStopped = true;
                clearTimeout(autoTimer);
                clearInterval(countdownTimer);
                if (currentController) currentController.abort();

                updateStatus('🛑 已停止自動發送', '#f87171');
                document.getElementById('start-btn').style.display = 'inline-block';
                document.getElementById('stop-btn').style.display = 'none';
                document.getElementById('start-btn').disabled = false;
                document.getElementById('start-btn').innerText = '單次發送 / 啟動自動重複';
            }

            async function startNextLoop() {
                if (isStopped) return;
                currentRunCount++;
                
                await executeTask();
                
                if (isStopped) return;

                var isAuto = document.getElementById('auto-repeat-chk').checked;
                if (!isAuto || currentRunCount >= maxRuns) {
                    if (currentRunCount >= maxRuns && isAuto) {
                        var logBox = document.getElementById('log-box');
                        logBox.innerHTML += '<span class="log-warn">已達到設定的總重複次數 (' + maxRuns + ' 次)，自動停止任務。</span><br>';
                        logBox.scrollTop = logBox.scrollHeight;
                    }
                    stopAutoLoop();
                    return;
                }

                var sec = parseInt(document.getElementById('interval-sec').value, 10) || 60;
                var remaining = sec;
                
                updateStatus('⏱️ 第 (' + currentRunCount + '/' + maxRuns + ') 次完成，下一次發送倒數: ' + remaining + ' 秒', '#38bdf8');

                countdownTimer = setInterval(function() {
                    if (isStopped) { clearInterval(countdownTimer); return; }
                    remaining--;
                    if (remaining > 0) {
                        updateStatus('⏱️ 第 (' + currentRunCount + '/' + maxRuns + ') 次完成，下一次發送倒數: ' + remaining + ' 秒', '#38bdf8');
                    } else {
                        clearInterval(countdownTimer);
                    }
                }, 1000);

                autoTimer = setTimeout(function() {
                    if (!isStopped) startNextLoop();
                }, sec * 1000);
            }

            async function executeTask() {
                if (isStopped) return;
                
                var btn = document.getElementById('start-btn');
                var logBox = document.getElementById('log-box');
                
                var checkboxes = document.querySelectorAll('input[name="urlIndex"]:checked');
                var selectedIndexes = [];
                checkboxes.forEach(function(cb) { selectedIndexes.push(parseInt(cb.value, 10)); });

                if (selectedIndexes.length === 0) {
                    alert('請至少勾選一個連結！');
                    stopAutoLoop();
                    return;
                }

                btn.disabled = true;
                var isAuto = document.getElementById('auto-repeat-chk').checked;
                var runTag = isAuto ? ' [第 ' + currentRunCount + '/' + maxRuns + ' 輪]' : '';
                
                updateStatus('⏳ ' + runTag + ' 數據發送中...', '#f59e0b');
                logBox.innerHTML += '<br><span class="log-info">[' + new Date().toLocaleTimeString() + ']' + runTag + ' 開始發送選中的 ' + selectedIndexes.length + ' 筆資料...</span><br>';

                currentController = new AbortController();

                try {
                    var response = await fetch('/run-task', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ indexes: selectedIndexes }),
                        signal: currentController.signal
                    });

                    if (!response.ok) {
                        throw new Error('HTTP 錯誤碼: ' + response.status);
                    }

                    var reader = response.body.getReader();
                    var decoder = new TextDecoder();

                    while (true) {
                        var result = await reader.read();
                        if (result.done || isStopped) break;
                        var chunk = decoder.decode(result.value, { stream: true });
                        logBox.innerHTML += chunk;
                        logBox.scrollTop = logBox.scrollHeight;
                    }
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        logBox.innerHTML += '<span class="log-err">執行發生錯誤: ' + err.message + '</span><br>';
                    }
                } finally {
                    currentController = null;
                    if (!isAuto && !isStopped) {
                        btn.disabled = false;
                        btn.innerText = '單次發送 / 啟動自動重複';
                        updateStatus('✅ 發送完畢', '#34d399');
                    }
                    logBox.innerHTML += '<span class="log-info">=== 本次任務執行完畢 ===</span><br>';
                    logBox.scrollTop = logBox.scrollHeight;
                }
            }
        </script>
    </body>
    </html>
  `);
});

app.post('/run-task', async (req, res) => {
  try {
    const selectedIndexes = (req.body && Array.isArray(req.body.indexes)) ? req.body.indexes : [];

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    if (selectedIndexes.length === 0) {
      res.write('<span style="color: #f87171;">[錯誤] 未收到有效的選取索引。</span><br>');
      return res.end();
    }

    res.write('開始處理發送任務...<br>');

    // 每輪固定一個 cid (代表同一個使用者造訪)
    const currentRunClientId = Math.floor(Math.random() * 899999999 + 100000000) + '.' + Math.floor(Math.random() * 899999999 + 100000000);

    for (let i = 0; i < selectedIndexes.length; i++) {
      const targetIndex = selectedIndexes[i];
      const target = targetUrls[targetIndex];

      if (!target) continue;

      const currentSessionId = (Math.floor(Date.now() / 1000) + i).toString();
      const engagementTimeMs = Math.floor(Math.random() * 3000) + 2000;
      const gaEndpoint = 'https://www.google-analytics.com/g/collect';

      const params = {
        v: '2',
        tid: MEASUREMENT_ID,
        cid: currentRunClientId,
        sid: currentSessionId,
        sct: (i + 1).toString(),
        seg: '1',
        _p: Math.floor(Math.random() * 100000).toString(),
        _et: engagementTimeMs.toString(),
        dl: target.url,
        dt: target.name,
        en: 'page_view'
      };

      const paramLogHtml = `<div style="color: #64748b; font-size: 11px; padding-left: 20px; margin-bottom: 6px;">
        ↳ <b>[發送參數]</b> <b>tid:</b> ${params.tid} | <b>cid:</b> ${params.cid} | <b>sid:</b> ${params.sid} | <b>sct:</b> ${params.sct} | <b>_et:</b> ${params._et}ms
        <br><span style="padding-left: 80px;"><b>dt:</b> ${params.dt}</span>
        <br><span style="padding-left: 80px;"><b>dl:</b> ${params.dl}</span>
      </div>`;

      try {
        const response = await axios.get(gaEndpoint, {
          params,
          headers: { 'User-Agent': fixedUA },
          timeout: 5000
        });

        if (response.status === 200 || response.status === 204) {
          res.write(`<span style="color: #34d399;">[成功] (${i + 1}/${selectedIndexes.length}) ${target.name} 已送達</span><br>${paramLogHtml}`);
        }
      } catch (error) {
        res.write(`<span style="color: #f87171;">[失敗] (${i + 1}/${selectedIndexes.length}) ${target.name} 失敗: ${error.message}</span><br>${paramLogHtml}`);
      }

      // 每次發送之間隨機間隔 10～15 秒
      if (i < selectedIndexes.length - 1) {
        const delayMs = Math.floor(Math.random() * 5000) + 10000;
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }

    res.write('<b>選中的網頁數據發送完畢！</b><br>');
    res.end();
  } catch (globalErr) {
    res.write(`<span style="color: #f87171;">[伺服器內部錯誤]: ${globalErr.message}</span><br>`);
    res.end();
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`UI 介面已啟動！請在瀏覽器開啟: http://localhost:${PORT}`);
});
