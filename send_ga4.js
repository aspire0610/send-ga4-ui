const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const MEASUREMENT_ID = 'G-F5DSSB6YJ3';

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

// 計數器邏輯
function getTaiwanDate() {
  return new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Taipei' });
}

let dailyCounts = {}; 
let lastRecordDate = getTaiwanDate();

function checkAndResetDaily() {
  const today = getTaiwanDate();
  if (lastRecordDate !== today) {
    dailyCounts = {};
    lastRecordDate = today;
  }
}

app.get('/api/daily-counts', (req, res) => {
  checkAndResetDaily();
  res.json({ success: true, date: lastRecordDate, counts: dailyCounts });
});

app.post('/api/increment-count', (req, res) => {
  checkAndResetDaily();
  const { index } = req.body;
  if (typeof index === 'number' && index >= 0) {
    dailyCounts[index] = (dailyCounts[index] || 0) + 1;
  }
  res.json({ success: true, counts: dailyCounts });
});

app.post('/api/reset-counts', (req, res) => {
  checkAndResetDaily();
  dailyCounts = {};
  res.json({ success: true, counts: dailyCounts });
});

app.post('/run-task', (req, res) => {
  const { indexes, cm } = req.body;
  
  if (!Array.isArray(indexes) || indexes.length === 0) {
    return res.status(400).json({ success: false, message: '無效的 index 陣列' });
  }

  const items = indexes.map((idx) => {
    const target = targetUrls[idx];
    if (!target) return null;

    const urlObj = new URL(target.url);

    if (cm) {
      urlObj.searchParams.set('utm_medium', cm);
    }

    const cs = urlObj.searchParams.get('utm_source') || 'warehouse';
    const cn = urlObj.searchParams.get('utm_campaign') || 'none';
    const mediumParam = urlObj.searchParams.get('utm_medium') || 'W5009';
    const cid = Math.floor(Math.random() * 1000000000) + '.' + Math.floor(Math.random() * 1000000000);

    return {
      index: idx,
      name: target.name,
      params: {
        v: '2',
        tid: MEASUREMENT_ID,
        cid: cid,
        _fv: '1',
        gcs: 'G111',
        gcd: '13p3p3p2p5',
        cs: cs,
        cm: mediumParam,
        cn: cn,
        dt: target.name,
        dl: urlObj.toString(),
        en: 'page_view'
      }
    };
  }).filter(Boolean);

  res.json({ success: true, items });
});

// 前端 UI
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>GA4 Event Sender</title>
  <style>
    body { font-family: sans-serif; padding: 20px; max-width: 800px; margin: auto; }
    .control-panel { background: #f4f4f4; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
    .item-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ddd; }
    button { cursor: pointer; padding: 6px 12px; margin-right: 5px; }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    .badge { background: #007bff; color: white; padding: 2px 6px; border-radius: 10px; font-size: 12px; }
    #statusMsg { font-weight: bold; color: #d9534f; margin-top: 10px; }
  </style>
</head>
<body>
  <h2>GA4 事件發送系統</h2>
  
  <div class="control-panel">
    <label>選擇店別（utm_medium）：</label>
    <select id="cmSelect">
      <option value="W5001">W5001</option>
      <option value="W5002">W5002</option>
      <option value="W5003">W5003</option>
      <option value="W5009" selected>W5009</option>
    </select>
    <br><br>
    <button id="sendBtn" onclick="sendSelected()">發送選取項目</button>
    <button id="stopBtn" onclick="stopSending()" disabled>停止發送</button>
    <button onclick="resetCounts()">重置計數器</button>
    <div id="statusMsg"></div>
  </div>

  <div id="itemsContainer"></div>

  <script>
    const targetUrls = ${JSON.stringify(targetUrls)};
    let dailyCounts = {};
    let isProcessing = false;
    let shouldStop = false;

    async function loadCounts() {
      const res = await fetch('/api/daily-counts');
      const data = await res.json();
      dailyCounts = data.counts || {};
      render();
    }

    function render() {
      const container = document.getElementById('itemsContainer');
      container.innerHTML = targetUrls.map((item, index) => \`
        <div class="item-row">
          <label>
            <input type="checkbox" class="item-checkbox" value="\${index}" \${isProcessing ? 'disabled' : ''}>
            \${item.name}
          </label>
          <div>
            <span class="badge">今日發送: \${dailyCounts[index] || 0}</span>
            <button onclick="sendSingle(\${index})" \${isProcessing ? 'disabled' : ''}>單獨發送</button>
          </div>
        </div>
      \`).join('');
    }

    function setProcessingState(running) {
      isProcessing = running;
      document.getElementById('sendBtn').disabled = running;
      document.getElementById('stopBtn').disabled = !running;
      document.getElementById('cmSelect').disabled = running;
      render();
    }

    function stopSending() {
      if (isProcessing) {
        shouldStop = true;
        document.getElementById('statusMsg').innerText = '正在停止中...';
      }
    }

    async function sendSingle(index) {
      if (isProcessing) return;
      setProcessingState(true);
      shouldStop = false;
      document.getElementById('statusMsg').innerText = '發送中...';

      const cm = document.getElementById('cmSelect').value;
      try {
        const res = await fetch('/run-task', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ indexes: [index], cm })
        });
        const data = await res.json();
        
        if (data.success && data.items.length > 0) {
          await executeSend(data.items[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        document.getElementById('statusMsg').innerText = '';
        setProcessingState(false);
      }
    }

    async function sendSelected() {
      if (isProcessing) return;

      const checkboxes = document.querySelectorAll('.item-checkbox:checked');
      const indexes = Array.from(checkboxes).map(cb => parseInt(cb.value));
      
      if (indexes.length === 0) return alert('請先勾選項目');

      setProcessingState(true);
      shouldStop = false;
      const cm = document.getElementById('cmSelect').value;

      try {
        const res = await fetch('/run-task', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ indexes, cm })
        });
        const data = await res.json();
        
        if (data.success) {
          for (let i = 0; i < data.items.length; i++) {
            if (shouldStop) {
              document.getElementById('statusMsg').innerText = '已手動停止任務';
              break;
            }
            document.getElementById('statusMsg').innerText = \`正在發送第 \${i + 1} / \${data.items.length} 項...\`;
            await executeSend(data.items[i]);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!shouldStop) document.getElementById('statusMsg').innerText = '發送完成！';
        setProcessingState(false);
      }
    }

    async function executeSend(item) {
      const queryParams = new URLSearchParams(item.params).toString();
      const endpoint = 'https://www.google-analytics.com/g/collect?' + queryParams;
      
      try {
        await fetch(endpoint, { mode: 'no-cors' });
        const incRes = await fetch('/api/increment-count', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ index: item.index })
        });
        const incData = await incRes.json();
        dailyCounts = incData.counts;
        render();
      } catch (err) {
        console.error('發送失敗:', err);
      }
    }

    async function resetCounts() {
      if (isProcessing) return;
      const res = await fetch('/api/reset-counts', { method: 'POST' });
      const data = await res.json();
      dailyCounts = data.counts;
      render();
    }

    loadCounts();
  </script>
</body>
</html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
