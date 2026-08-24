const express = require('express');
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

app.get('/', (req, res) => {
  const checkboxesHtml = targetUrls.map((item, index) => `
    <div class="item-row">
      <label class="item-label">
        <div class="item-left">
          <input type="checkbox" name="urlIndex" value="${index}" checked class="custom-checkbox">
          <span class="item-title"><b>${index + 1}.</b> ${item.name}</span>
        </div>
        <span id="count-badge-${index}" class="badge">
          已發送: 0 次
        </span>
      </label>
    </div>
  `).join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="zh-TW">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GA4 發送控制台</title>
        <style>
            * { box-sizing: border-box; }
            body { 
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "SF Pro Display", sans-serif; 
                background: radial-gradient(circle at top left, #0f172a, #020617);
                color: #f8fafc; 
                padding: 12px; 
                margin: 0; 
                min-height: 100vh;
            }
            .container { 
                max-width: 900px; 
                margin: 0 auto; 
                background: rgba(30, 41, 59, 0.65); 
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 16px; 
                border-radius: 16px; 
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5); 
            }
            @media (min-width: 768px) { body { padding: 24px; } .container { padding: 28px; } }
            
            .header-bar {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 12px;
            }
            h1 { font-size: 20px; margin: 0; color: #38bdf8; font-weight: 700; letter-spacing: -0.5px; }
            .date-badge {
                background: rgba(56, 189, 248, 0.1);
                border: 1px solid rgba(56, 189, 248, 0.25);
                color: #38bdf8;
                font-size: 12px;
                padding: 4px 10px;
                border-radius: 20px;
                font-weight: 600;
                white-space: nowrap;
            }
            p { color: #94a3b8; margin-bottom: 15px; font-size: 13px; }
            
            .actions { margin-bottom: 15px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
            
            button { 
                background: linear-gradient(135deg, #0284c7, #0369a1); 
                color: white; 
                border: 1px solid rgba(255,255,255,0.15); 
                padding: 10px 18px; 
                font-size: 14px; 
                font-weight: 600; 
                border-radius: 10px; 
                cursor: pointer; 
                transition: all 0.2s ease;
                box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25);
            }
            button:active { transform: scale(0.98); }
            button:hover { background: linear-gradient(135deg, #0369a1, #075985); }
            button:disabled { background: #334155; border-color: transparent; opacity: 0.6; cursor: not-allowed; box-shadow: none; }
            
            .btn-secondary { background: rgba(51, 65, 85, 0.8); color: #e2e8f0; font-size: 13px; padding: 8px 14px; width: auto; box-shadow: none; }
            .btn-secondary:hover { background: rgba(71, 85, 105, 0.9); }
            .btn-danger { background: rgba(153, 27, 27, 0.8); color: #fca5a5; font-size: 12px; padding: 8px 12px; border-radius: 8px; box-shadow: none; }
            .btn-danger:hover { background: rgba(185, 28, 28, 0.9); }
            .btn-stop { background: linear-gradient(135deg, #dc2626, #991b1b); box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3); }
            
            .total-count-badge {
                background: rgba(16, 185, 129, 0.15);
                border: 1px solid rgba(16, 185, 129, 0.3);
                color: #34d399;
                font-size: 12px;
                padding: 6px 12px;
                border-radius: 8px;
                font-weight: 600;
                white-space: nowrap;
            }

            .grid-box { 
                display: grid; 
                grid-template-columns: 1fr; 
                gap: 6px; 
                max-height: 340px; 
                overflow-y: auto; 
                background: rgba(15, 23, 42, 0.6); 
                padding: 10px; 
                border-radius: 12px; 
                border: 1px solid rgba(255, 255, 255, 0.08); 
                margin-bottom: 15px; 
            }
            @media (min-width: 768px) { .grid-box { grid-template-columns: 1fr 1fr; gap: 8px; max-height: 300px; padding: 14px; } }
            
            .item-row { margin-bottom: 0; }
            .item-label { 
                cursor: pointer; 
                display: flex; 
                align-items: center; 
                justify-content: space-between; 
                color: #cbd5e1; 
                font-size: 13px; 
                padding: 6px 8px; 
                border-radius: 8px;
                transition: background 0.15s ease;
            }
            .item-label:hover { background: rgba(255, 255, 255, 0.04); }
            .item-left { display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1; padding-right: 8px; }
            .custom-checkbox { width: 18px; height: 18px; accent-color: #38bdf8; flex-shrink: 0; cursor: pointer; }
            .item-title { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
            .badge { 
                background: rgba(51, 65, 85, 0.8); 
                color: #38bdf8; 
                font-size: 11px; 
                font-weight: 600; 
                padding: 3px 8px; 
                border-radius: 12px; 
                white-space: nowrap; 
                flex-shrink: 0; 
            }

            .auto-panel { 
                background: rgba(15, 23, 42, 0.6); 
                border: 1px solid rgba(255, 255, 255, 0.08); 
                padding: 12px; 
                border-radius: 12px; 
                margin-bottom: 15px; 
                display: flex; 
                align-items: center; 
                gap: 12px; 
                flex-wrap: wrap; 
            }
            .auto-panel label { color: #cbd5e1; font-size: 13px; display: flex; align-items: center; gap: 6px; white-space: nowrap; }
            .auto-panel input[type="number"] { 
                background: rgba(30, 41, 59, 0.8); 
                border: 1px solid rgba(255, 255, 255, 0.15); 
                color: white; 
                padding: 6px 10px; 
                border-radius: 6px; 
                width: 70px; 
                font-size: 13px; 
                outline: none;
            }
            .ip-box { 
                width: 100%; 
                background: rgba(30, 41, 59, 0.7); 
                border: 1px solid rgba(56, 189, 248, 0.3); 
                color: #38bdf8; 
                padding: 8px 12px; 
                border-radius: 8px; 
                font-size: 13px; 
                display: flex; 
                align-items: center; 
                justify-content: space-between;
                box-sizing: border-box;
            }
            
            #log-box { 
                background: rgba(9, 13, 22, 0.85); 
                border: 1px solid rgba(255, 255, 255, 0.08); 
                border-radius: 10px; 
                padding: 12px; 
                height: 260px; 
                overflow-y: auto; 
                font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; 
                font-size: 11px; 
                color: #34d399; 
                line-height: 1.6; 
            }
            .log-err { color: #f87171; }
            .log-info { color: #60a5fa; }
            .log-warn { color: #fbbf24; }
            #status-text { font-weight: 600; color: #38bdf8; width: 100%; margin-top: 4px; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header-bar">
                <h1>📡 GA4 選擇性發送控制台 (前端直連)</h1>
                <div class="date-badge" id="current-date">--</div>
            </div>
            <p>請勾選要發送的目標連結：</p>
            
            <div class="actions">
                <button type="button" class="btn-secondary" onclick="toggleAll(true)">全選</button>
                <button type="button" class="btn-secondary" onclick="toggleAll(false)">全不選</button>
                <button type="button" class="btn-danger" onclick="resetDailyCounts()">重置今日計數</button>
                <div class="total-count-badge" id="daily-total-badge">當日已發送總次數: 0 次</div>
            </div>

            <div class="grid-box">
                ${checkboxesHtml}
            </div>

            <div class="auto-panel">
                <div class="ip-box">
                    <div>
                        <span>🌐 當前裝置 IP: </span>
                        <span id="current-ip" style="font-weight: 700;">抓取中...</span>
                    </div>
                    <button type="button" class="btn-secondary" style="padding: 4px 10px; font-size: 11px;" onclick="fetchCurrentIp()">重新整理</button>
                </div>
                <label>
                    <input type="checkbox" id="auto-repeat-chk" class="custom-checkbox">
                    啟用自動重複發送
                </label>
                <label>
                    間隔 (秒): 
                    <input type="number" id="interval-sec" value="20" min="20">
                </label>
                <label>
                    重複次數: 
                    <input type="number" id="repeat-count" value="5" min="1">
                </label>
                <div id="status-text"></div>
            </div>

            <div style="display: flex; gap: 10px;">
                <button type="button" id="start-btn" style="width: 100%;" onclick="handleStart()">單次發送 / 啟動自動重複</button>
                <button type="button" id="stop-btn" class="btn-stop" style="display: none; width: 100%;" onclick="stopAutoLoop()">停止自動發送</button>
            </div>
            
            <h3 style="font-size: 13px; margin: 16px 0 8px 0; color: #94a3b8; font-weight: 600;">即時執行日誌 (包含傳送參數)：</h3>
            <div id="log-box">等待開始執行...</div>
        </div>

        <script>
            var autoTimer = null;
            var countdownTimer = null;
            var isStopped = false;
            var currentRunCount = 0;
            var maxRuns = 1;
            var currentIpAddress = '未知 IP';
            var totalUrlCount = ${targetUrls.length};

            function getTodayKey() {
                var d = new Date();
                var month = '' + (d.getMonth() + 1);
                var day = '' + d.getDate();
                var year = d.getFullYear();
                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
                return [year, month, day].join('-');
            }

            function updateDateDisplay() {
                var dateEl = document.getElementById('current-date');
                if (dateEl) {
                    dateEl.innerText = getTodayKey();
                }
            }

            function loadDailyCounts() {
                var today = getTodayKey();
                var savedDate = localStorage.getItem('ga4_send_date');
                var counts = {};

                if (savedDate !== today) {
                    localStorage.setItem('ga4_send_date', today);
                    localStorage.setItem('ga4_daily_counts', JSON.stringify({}));
                } else {
                    var savedCounts = localStorage.getItem('ga4_daily_counts');
                    if (savedCounts) {
                        try { counts = JSON.parse(savedCounts); } catch(e) {}
                    }
                }

                var grandTotal = 0;
                for (var i = 0; i < totalUrlCount; i++) {
                    var c = counts[i] || 0;
                    grandTotal += c;
                    var badge = document.getElementById('count-badge-' + i);
                    if (badge) badge.innerText = '已發送: ' + c + ' 次';
                }

                var totalBadge = document.getElementById('daily-total-badge');
                if (totalBadge) totalBadge.innerText = '當日已發送總次數: ' + grandTotal + ' 次';
            }

            function incrementDailyCount(index) {
                var today = getTodayKey();
                var savedDate = localStorage.getItem('ga4_send_date');
                var counts = {};

                if (savedDate === today) {
                    var savedCounts = localStorage.getItem('ga4_daily_counts');
                    if (savedCounts) {
                        try { counts = JSON.parse(savedCounts); } catch(e) {}
                    }
                } else {
                    localStorage.setItem('ga4_send_date', today);
                }

                counts[index] = (counts[index] || 0) + 1;
                localStorage.setItem('ga4_daily_counts', JSON.stringify(counts));

                var badge = document.getElementById('count-badge-' + index);
                if (badge) badge.innerText = '已發送: ' + counts[index] + ' 次';

                var grandTotal = 0;
                Object.keys(counts).forEach(function(k) { grandTotal += counts[k]; });
                var totalBadge = document.getElementById('daily-total-badge');
                if (totalBadge) totalBadge.innerText = '當日已發送總次數: ' + grandTotal + ' 次';
            }

            function resetDailyCounts() {
                if (confirm('確定要清空今天的發送次數紀錄嗎？')) {
                    localStorage.removeItem('ga4_daily_counts');
                    loadDailyCounts();
                }
            }

            async function fetchCurrentIp() {
                var ipEl = document.getElementById('current-ip');
                try {
                    ipEl.innerText = '更新中...';
                    var res = await fetch('https://api.ipify.org?format=json');
                    var data = await res.json();
                    currentIpAddress = data.ip;
                    ipEl.innerText = currentIpAddress;
                } catch (e) {
                    currentIpAddress = '無法取得 IP';
                    ipEl.innerText = currentIpAddress;
                }
            }

            window.addEventListener('DOMContentLoaded', function() {
                updateDateDisplay();
                fetchCurrentIp();
                loadDailyCounts();
            });

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
                
                // 發送前更新並記錄 IP
                await fetchCurrentIp();

                updateStatus('⏳ ' + runTag + ' 數據發送中...', '#f59e0b');
                logBox.innerHTML += '<br><span class="log-info">[' + new Date().toLocaleTimeString() + ']' + runTag + ' 開始發送選中的 ' + selectedIndexes.length + ' 筆資料... (當前來源 IP: ' + currentIpAddress + ')</span><br>';

                try {
                    // 1. 向後端索取組好的參數清單
                    var res = await fetch('/run-task', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ indexes: selectedIndexes })
                    });
                    
                    var data = await res.json();

                    if (data.success && data.items) {
                        for (var i = 0; i < data.items.length; i++) {
                            if (isStopped) break;

                            var item = data.items[i];

                            // 在發送當下即時更新 sid (作為 Session 秒數時間戳記) 與真實螢幕解析度 sr
                            item.params.sid = Math.floor(Date.now() / 1000).toString();
                            item.params.sr = (window.screen && window.screen.width && window.screen.height) 
                              ? (window.screen.width + 'x' + window.screen.height) 
                              : '1920x1080';

                            var queryParams = new URLSearchParams(item.params).toString();
                            var targetUrl = 'https://www.google-analytics.com/g/collect?' + queryParams;

                            // 2. 由使用者瀏覽器發送給 GA4
                            try {
                                await fetch(targetUrl, { mode: 'no-cors' });

                                // 發送成功後更新 UI 上的每日計數
                                incrementDailyCount(selectedIndexes[i]);

                                var paramLogHtml = '<div style="color: #64748b; font-size: 11px; padding-left: 20px; margin-bottom: 6px;">' +
                                  '↳ <b>[發送來源 IP]</b> ' + currentIpAddress + '<br>' +
                                  '↳ <b>[核心識別參數]</b> <b>tid:</b> ' + item.params.tid + ' | <b>cid:</b> ' + item.params.cid + ' | <b>sid:</b> ' + item.params.sid + ' | <b>_fv:</b> ' + item.params._fv + '<br>' +
                                  '<span style="padding-left: 20px;"><b>UTM 歸因:</b> source=' + (item.params.cs||'none') + ' | medium=' + (item.params.cm||'none') + ' | campaign=' + (item.params.cn||'none') + '</span><br>' +
                                  '<span style="padding-left: 20px;"><b>Consent Mode:</b> gcs=' + item.params.gcs + ' | gcd=' + item.params.gcd + '</span><br>' +
                                  '<span style="padding-left: 20px;"><b>dt:</b> ' + item.params.dt + '</span><br>' +
                                  '<span style="padding-left: 20px;"><b>dl:</b> ' + item.params.dl + '</span>' +
                                '</div>';

                                logBox.innerHTML += '<span style="color: #34d399;">[成功] (' + (i + 1) + '/' + data.items.length + ') ' + item.name + ' 已送達</span><br>' + paramLogHtml;
                            } catch (sendErr) {
                                logBox.innerHTML += '<span style="color: #f87171;">[失敗] (' + (i + 1) + '/' + data.items.length + ') ' + item.name + ' 失敗: ' + sendErr.message + '</span><br>';
                            }

                            logBox.scrollTop = logBox.scrollHeight;

                            // 每次發送隨機間隔 5～10 秒（拉長發送間隔，避開 GA4 頻率過高的垃圾過濾）
                            if (i < data.items.length - 1) {
                                var delayMs = Math.floor(Math.random() * 5000) + 5000;
                                await new Promise(function(resolve) { setTimeout(resolve, delayMs); });
                            }
                        }
                    }
                } catch (err) {
                    logBox.innerHTML += '<span class="log-err">執行發生錯誤: ' + err.message + '</span><br>';
                } finally {
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

app.post('/run-task', (req, res) => {
  try {
    const selectedIndexes = (req.body && Array.isArray(req.body.indexes)) ? req.body.indexes : [];

    if (selectedIndexes.length === 0) {
      return res.status(400).json({ success: false, message: '未收到有效的選取索引。' });
    }

    const items = selectedIndexes.map(targetIndex => {
      const target = targetUrls[targetIndex];
      if (!target) return null;

      // 1. 動態生成 CID
      const uniqueClientId = Math.floor(Math.random() * 899999999 + 100000000) + '.' + Math.floor(Math.random() * 899999999 + 100000000);
      const engagementTimeMs = Math.floor(Math.random() * 5000) + 10000;

      // 2. 從 target.url 自動解析 UTM 參數
      let utmSource = '';
      let utmMedium = '';
      let utmCampaign = '';

      try {
        const parsedUrl = new URL(target.url);
        utmSource = parsedUrl.searchParams.get('utm_source') || '';
        utmMedium = parsedUrl.searchParams.get('utm_medium') || '';
        utmCampaign = parsedUrl.searchParams.get('utm_campaign') || '';
      } catch (e) {
        // 若網址解析異常時的靜態備用處理
      }

      return {
        name: target.name,
        params: {
          v: '2',
          tid: MEASUREMENT_ID,
          gtm: '45je68e1v89223874',           // 預設 GTM 標記
          gcs: 'G111',                       // Consent Mode 同意狀態
          gcd: '13r3r3I3I5l1',               // Consent Mode v2 規範字串
          cid: uniqueClientId,
          sid: '',                           // 前端在發送前動態帶入秒數 timestamp
          sct: '1',                          // Session Count (第一造訪為 1)
          seg: '1',                          // Session Engagement 狀態標記
          _fv: '1',                          // 【關鍵修正】標記為 First Visit (新使用者)
          _ss: '1',                          // 標記 Session Start
          _s: '1',                           // 標記 Hit Sequence 1
          ul: 'zh-tw',                       // 使用者語系
          _p: Math.floor(Math.random() * 1000000000).toString(), // Page ID Hash
          _et: engagementTimeMs.toString(),  // Engagement Time (10~15秒)
          dl: target.url,
          dt: target.name,
          en: 'page_view',

          // 【關鍵修正】顯式帶入 UTM 參數，確保 GA4 正式報表正確歸因
          cs: utmSource,                     // Campaign Source
          cm: utmMedium,                     // Campaign Medium
          cn: utmCampaign                    // Campaign Name
        }
      };
    }).filter(Boolean);

    res.json({ success: true, items });
  } catch (globalErr) {
    res.status(500).json({ success: false, message: globalErr.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`UI 介面已啟動！請在瀏覽器開啟: http://localhost:${PORT}`);
});
