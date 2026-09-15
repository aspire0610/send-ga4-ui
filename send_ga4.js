Const express = require('express');
Const app = express();

Const PORT = process.env.PORT || 3000;

// 解析 JSON Body
App.use(express.json());

Const targetUrls = [
  { name: '花櫃', url: 'https://www.costco.com.tw/Sports-Lifestyle/Garden-Lifestyle/Flowers-Plant/c/121307?Utm_source=warehouse&utm_medium=W5009&utm_campaign=posm-flowers' },
  { name: '珠寶櫃', url: 'https://www.costco.com.tw/Jewelry-Gold/Jewelry-Buying-guide/Jewelry-Gold/c/CL10?Utm_source=warehouse&utm_medium=W5009&utm_campaign=posm-jewelry' },
  { name: 'Rollout 家具海報', url: 'https://www.costco.com.tw/content/showroom?Utm_source=warehouse&utm_medium=W5009&utm_campaign=Poster-FurnitureRollOut' },
  { name: 'Rollout Lsign', url: 'https://www.costco.com.tw/content/showroom?Utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-FurnitureRollOut' },
  { name: '吊掛', url: 'https://www.costco.com.tw/c/hero-showroom?Utm_source=warehouse&utm_medium=W5009&utm_campaign=showroom-hangingbanner' },
  { name: '易拉展', url: 'https://www.costco.com.tw/c/hero-showroom?Utm_source=warehouse&utm_medium=W5009&utm_campaign=showroom-rollupbanner' },
  { name: 'Lsign 通用', url: 'https://www.costco.com.tw/c/OnlineExclusive?Utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-OnlineExclusive' },
  { name: 'Lsign 家電', url: 'https://www.costco.com.tw/Televisions-Appliances/Large-Appliances/c/301?Utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-Appliances' },
  { name: 'Lsign 電視', url: 'https://www.costco.com.tw/Televisions-Appliances/TV-Home-Entertainment/c/101?Utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-tvs' },
  { name: 'Lsign 輪胎', url: 'https://www.costco.com.tw/Sports-Lifestyle/Automotive/c/1421?Utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-Tire' },
  { name: 'Lsign 玩具', url: 'https://www.costco.com.tw/Household-Baby-Toys/Toys/c/1308?Utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D28' },
  { name: 'Lsign HABA', url: 'https://www.costco.com.tw/Health-Beauty/Personal-Care/c/801?Utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D20' },
  { name: 'Lsign 運動', url: 'https://www.costco.com.tw/Sports-Lifestyle/Sports-Fitness/c/1209?Utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D26' },
  { name: 'Lsign 服飾', url: 'https://www.costco.com.tw/Clothing-Accessories/c/9?Utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D31D39' },
  { name: 'Lsign 食品', url: 'https://www.costco.com.tw/Food-Dining/c/CL8?Utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D12D13' },
  { name: 'Lsign 五金', url: 'https://www.costco.com.tw/Furniture-Kitchen/Hardware-DIY/c/605?Utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D23' },
  { name: 'Lsign 床墊', url: 'https://www.costco.com.tw/Furniture-Kitchen/Bedding/Mattress-Toppers/c/60205?Utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-Mattress' },
  { name: 'Lsign 儲藏屋', url: 'https://www.costco.com.tw/Sports-Lifestyle/Garden-Lifestyle/Outdoor-Storage/c/40201?Utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D27' },
  { name: 'Lsign 沙發', url: 'https://www.costco.com.tw/Furniture-Kitchen/Furniture/Sofas-Sectionals/c/50202?Utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D38' },
  { name: 'ENDCAP', url: 'https://www.costco.com.tw/c/OnlineExclusive?Utm_source=warehouse&utm_medium=W5009&utm_campaign=Endcap-OnlineEX' },
  { name: '靜電貼紙 同價', url: 'https://www.costco.com.tw/Same-Price/c/hero-sameprice?Utm_source=warehouse&utm_medium=W5009&utm_campaign=Sticker-SamePrice' },
  { name: 'M / L Sign 同價', url: 'https://www.costco.com.tw/Same-Price/c/hero-sameprice?Utm_source=warehouse&utm_medium=W5009&utm_campaign=Sign-SamePrice' },
  { name: 'fy26p8 Minispotlight 週期購', url: 'https://www.costco.com.tw/content/subscription?Utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26p8_Minispotlight_Subscription' },
  { name: 'fy26p8 Minispotlight Costco APP', url: 'https://www.costco.com.tw/costco-app?Utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26p8_Minispotlight_CostcoApp' },
  { name: 'fy26 p10 app poster iOS', url: 'https://www.costco.com.tw/content/costco-app-ios?Utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p10_app_poster_iOS' },
  { name: 'fy26 p10 app poster Android', url: 'https://www.costco.com.tw/content/costco-app-ios?Utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p10_app_poster_Android' },
  { name: 'fy26 p10 minispotlight iOS', url: 'https://www.costco.com.tw/content/costco-app-ios?Utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p10_mini_spotlight_iOS' },
  { name: 'fy26 p10 minispotlight Android', url: 'https://www.costco.com.tw/content/costco-app-ios?Utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p10_mini_spotlight_Android' },
  { name: 'fy26p10w4 EM', url: 'https://www.costco.com.tw/executive-rewards?Utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26p_10w4_EM' },
  { name: 'fy26p10w4 D27', url: 'https://www.costco.com.tw/Lawn-Garden/Patio-Furniture/Outdoor-Patio-Furniture/c/40102?Utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p10_banner_d27' },
  { name: 'fy26p12w3 Showroom 1', url: 'https://www.costco.com.tw/Furniture-Kitchen/Furniture/Sofas-Sectionals/c/50202?Utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p12_Showroom_Sofas' },
  { name: 'fy26p12w3 Showroom 2', url: 'https://www.costco.com.tw/Furniture-Kitchen/Furniture/Cabinets-Tables/c/50407?Utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p12_Showroom_Cabinets' },
  { name: 'fy26p12w3 Showroom 3', url: 'https://www.costco.com.tw/Furniture-Kitchen/Furniture/Dining-Sets/c/50301?Utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p12_Showroom_DiningSets' },
  { name: 'fy26p12w3 Showroom 4', url: 'https://www.costco.com.tw/Furniture-Kitchen/Furniture/Computer-Desk-Chair-Sets/c/50602?Utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p12_Showroom_ComputerDeskChair' }
];

Const MEASUREMENT_ID = 'G-F5DSSB6YJ3';

App.get('/', (req, res) => {
  Const checkboxesHtml = targetUrls.map((item, index) => `
    <div style="margin-bottom: 10px;">
      <label style="cursor: pointer; display: flex; align-items: center; justify-content: space-between; color: #cbd5e1; font-size: 15px; padding: 4px 0;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <input type="checkbox" name="urlIndex" value="${index}" checked style="width: 20px; height: 20px; accent-color: #38bdf8;">
          <span><b>${index + 1}.</b> ${item.name}</span>
        </div>
        <span class="item-count-badge" id="item-count-${index}">0 次</span>
      </label>
    </div>
  `).join('');

  Res.send(`
    <!DOCTYPE html>
    <html lang="zh-TW">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Costco GA4 發送控制台</title>
        <style>
            * { box-sizing: border-box; }
            Body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 10px; margin: 0; }
            .container { max-width: 900px; margin: 0 auto; background: #1e293b; padding: 15px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
            @media (min-width: 768px) { body { padding: 20px; } .container { padding: 25px; } }
            H1 { font-size: 20px; margin-bottom: 5px; color: #38bdf8; }
            P { color: #94a3b8; margin-bottom: 15px; font-size: 13px; }
            .actions { margin-bottom: 15px; display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
            Button { background: #0284c7; color: white; border: none; padding: 12px 20px; font-size: 16px; font-weight: bold; border-radius: 8px; cursor: pointer; transition: background 0.2s; }
            Button:hover { background: #0369a1; }
            Button:disabled { background: #475569; cursor: not-allowed; }
            .btn-secondary { background: #334155; font-size: 14px; padding: 10px 16px; width: auto; }
            .btn-stop { background: #dc2626; }
            .grid-box { display: grid; grid-template-columns: 1fr; gap: 5px; max-height: 320px; overflow-y: auto; background: #0f172a; padding: 12px; border-radius: 8px; border: 1px solid #334155; margin-bottom: 15px; }
            @media (min-width: 768px) { .grid-box { grid-template-columns: 1fr 1fr; gap: 10px; max-height: 280px; padding: 15px; } }
            .auto-panel { background: #0f172a; border: 1px solid #334155; padding: 12px; border-radius: 8px; margin-bottom: 15px; display: flex; align-items: center; gap: 15px; flex-wrap: wrap; }
            .auto-panel label { color: #cbd5e1; font-size: 14px; display: flex; align-items: center; gap: 6px; }
            .auto-panel input[type="number"] { background: #1e293b; border: 1px solid #475569; color: white; padding: 6px 10px; border-radius: 6px; width: 80px; font-size: 14px; }
            .ip-box { background: #1e293b; border: 1px solid #38bdf8; color: #38bdf8; padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 14px; display: flex; align-items: center; gap: 8px; }
            
            /* 新增全域計數與項目標籤樣式 */
            .total-count-box { background: #0284c7; color: white; padding: 6px 14px; border-radius: 6px; font-weight: bold; font-size: 14px; display: flex; align-items: center; gap: 6px; }
            .item-count-badge { background: #334155; color: #38bdf8; font-size: 12px; font-weight: bold; padding: 2px 8px; border-radius: 12px; border: 1px solid #475569; margin-left: 8px; flex-shrink: 0; }

            #log-box { background: #090d16; border: 1px solid #334155; border-radius: 8px; padding: 15px; height: 280px; overflow-y: auto; font-family: monospace; font-size: 12px; color: #34d399; line-height: 1.5; }
            .log-err { color: #f87171; }
            .log-info { color: #60a5fa; }
            .log-warn { color: #fbbf24; }
            #status-text { font-weight: bold; color: #38bdf8; width: 100%; margin-top: 5px; font-size: 15px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>📊 GA4 選擇性發送控制台 (W5009)</h1>
            <p>請勾選要發送的目標連結：</p>
            
            <div class="actions">
                <button type="button" class="btn-secondary" onclick="toggleAll(true)">全選</button>
                <button type="button" class="btn-secondary" onclick="toggleAll(false)">全不選</button>
            </div>

            <div class="grid-box">
                ${checkboxesHtml}
            </div>

            <div class="auto-panel">
                <div class="ip-box">
                    <span>🌐 當前裝置 IP:</span>
                    <span id="current-ip">抓取中...</span>
                    <button type="button" class="btn-secondary" style="padding: 2px 8px; font-size: 11px;" onclick="fetchCurrentIp()">重新整理</button>
                </div>
                <div class="total-count-box">
                    <span>🚀 累積成功送出:</span>
                    <span id="total-sent-count">0</span> 次
                </div>
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
            Var autoTimer = null;
            Var countdownTimer = null;
            Var isStopped = false;
            Var currentRunCount = 0;
            Var maxRuns = 1;
            Var currentIpAddress = '未知 IP';

            // 計數器狀態記錄
            Var totalSentCount = 0;
            Var itemSentCounts = {}; // { 0: count, 1: count, ... }

            // 抓取當前裝置公網 IP
            Async function fetchCurrentIp() {
                Var ipEl = document.getElementById('current-ip');
                Try {
                    IpEl.innerText = '更新中...';
                    Var res = await fetch('https://api.ipify.org?format=json');
                    Var data = await res.json();
                    CurrentIpAddress = data.ip;
                    IpEl.innerText = currentIpAddress;
                } catch (e) {
                    CurrentIpAddress = '無法取得 IP';
                    IpEl.innerText = currentIpAddress;
                }
            }

            // 初始化頁面時立刻抓取 IP
            Window.addEventListener('DOMContentLoaded', fetchCurrentIp);

            Function toggleAll(status) {
                Var checkboxes = document.querySelectorAll('input[name="urlIndex"]');
                Checkboxes.forEach(function(cb) { cb.checked = status; });
            }

            Function updateStatus(msg, color) {
                Var el = document.getElementById('status-text');
                El.innerText = msg;
                If (color) el.style.color = color;
            }

            // 更新計數器畫面的函式
            Function incrementCount(targetIndex) {
                TotalSentCount++;
                Document.getElementById('total-sent-count').innerText = totalSentCount;

                ItemSentCounts[targetIndex] = (itemSentCounts[targetIndex] || 0) + 1;
                Var itemBadge = document.getElementById('item-count-' + targetIndex);
                If (itemBadge) {
                    ItemBadge.innerText = itemSentCounts[targetIndex] + ' 次';
                }
            }

            Function handleStart() {
                IsStopped = false;
                Var isAuto = document.getElementById('auto-repeat-chk').checked;
                
                If (isAuto) {
                    MaxRuns = parseInt(document.getElementById('repeat-count').value, 10) || 1;
                    CurrentRunCount = 0;
                    Document.getElementById('start-btn').style.display = 'none';
                    Document.getElementById('stop-btn').style.display = 'inline-block';
                    StartNextLoop();
                } else {
                    CurrentRunCount = 1;
                    MaxRuns = 1;
                    ExecuteTask();
                }
            }

            Function stopAutoLoop() {
                IsStopped = true;
                ClearTimeout(autoTimer);
                ClearInterval(countdownTimer);

                UpdateStatus('🛑 已停止自動發送', '#f87171');
                Document.getElementById('start-btn').style.display = 'inline-block';
                Document.getElementById('stop-btn').style.display = 'none';
                Document.getElementById('start-btn').disabled = false;
                Document.getElementById('start-btn').innerText = '單次發送 / 啟動自動重複';
            }

            Async function startNextLoop() {
                If (isStopped) return;
                CurrentRunCount++;
                
                Await executeTask();
                
                If (isStopped) return;

                Var isAuto = document.getElementById('auto-repeat-chk').checked;
                If (!isAuto || currentRunCount >= maxRuns) {
                    If (currentRunCount >= maxRuns && isAuto) {
                        Var logBox = document.getElementById('log-box');
                        LogBox.innerHTML += '<span class="log-warn">已達到設定的總重複次數 (' + maxRuns + ' 次)，自動停止任務。</span><br>';
                        LogBox.scrollTop = logBox.scrollHeight;
                    }
                    StopAutoLoop();
                    Return;
                }

                Var sec = parseInt(document.getElementById('interval-sec').value, 10) || 60;
                Var remaining = sec;
                
                UpdateStatus('⏱️ 第 (' + currentRunCount + '/' + maxRuns + ') 次完成，下一次發送倒數: ' + remaining + ' 秒', '#38bdf8');

                CountdownTimer = setInterval(function() {
                    If (isStopped) { clearInterval(countdownTimer); return; }
                    Remaining--;
                    If (remaining > 0) {
                        UpdateStatus('⏱️ 第 (' + currentRunCount + '/' + maxRuns + ') 次完成，下一次發送倒數: ' + remaining + ' 秒', '#38bdf8');
                    } else {
                        ClearInterval(countdownTimer);
                    }
                }, 1000);

                AutoTimer = setTimeout(function() {
                    If (!isStopped) startNextLoop();
                }, sec * 1000);
            }

            Async function executeTask() {
                If (isStopped) return;
                
                Var btn = document.getElementById('start-btn');
                Var logBox = document.getElementById('log-box');
                
                Var checkboxes = document.querySelectorAll('input[name="urlIndex"]:checked');
                Var selectedIndexes = [];
                Checkboxes.forEach(function(cb) { selectedIndexes.push(parseInt(cb.value, 10)); });

                If (selectedIndexes.length === 0) {
                    Alert('請至少勾選一個連結！');
                    StopAutoLoop();
                    Return;
                }

                Btn.disabled = true;
                Var isAuto = document.getElementById('auto-repeat-chk').checked;
                Var runTag = isAuto ? ' [第 ' + currentRunCount + '/' + maxRuns + ' 輪]' : '';
                
                // 發送前更新並記錄 IP
                Await fetchCurrentIp();

                UpdateStatus('⏳ ' + runTag + ' 數據發送中...', '#f59e0b');
                LogBox.innerHTML += '<br><span class="log-info">[' + new Date().toLocaleTimeString() + ']' + runTag + ' 開始發送選中的 ' + selectedIndexes.length + ' 筆資料... (當前來源 IP: ' + currentIpAddress + ')</span><br>';

                Try {
                    // 1. 向後端索取組好的參數清單
                    Var res = await fetch('/run-task', {
                        Method: 'POST',
                        Headers: { 'Content-Type': 'application/json' },
                        Body: JSON.stringify({ indexes: selectedIndexes })
                    });
                    
                    Var data = await res.json();

                    If (data.success && data.items) {
                        For (var i = 0; i < data.items.length; i++) {
                            If (isStopped) break;

                            Var item = data.items[i];

                            // 在發送當下即時更新 sid (作為 Session 秒數時間戳記) 與真實螢幕解析度 sr
                            Item.params.sid = Math.floor(Date.now() / 1000).toString();
                            Item.params.sr = (window.screen && window.screen.width && window.screen.height) 
                              ? (window.screen.width + 'x' + window.screen.height) 
                              : '1920x1080';

                            Var queryParams = new URLSearchParams(item.params).toString();
                            Var targetUrl = 'https://www.google-analytics.com/g/collect?' + queryParams;

                            // 2. 由使用者瀏覽器發送給 GA4
                            Try {
                                Await fetch(targetUrl, { mode: 'no-cors' });

                                // 發送成功時累加該項與總計數器
                                IncrementCount(selectedIndexes[i]);

                                Var paramLogHtml = '<div style="color: #64748b; font-size: 11px; padding-left: 20px; margin-bottom: 6px;">' +
                                  '↳ <b>[發送來源 IP]</b> ' + currentIpAddress + '<br>' +
                                  '↳ <b>[核心識別參數]</b> <b>tid:</b> ' + item.params.tid + ' | <b>cid:</b> ' + item.params.cid + ' | <b>sid:</b> ' + item.params.sid + ' | <b>_fv:</b> ' + item.params._fv + '<br>' +
                                  '<span style="padding-left: 80px;"><b>UTM 歸因:</b> source=' + (item.params.cs||'none') + ' | medium=' + (item.params.cm||'none') + ' | campaign=' + (item.params.cn||'none') + '</span><br>' +
                                  '<span style="padding-left: 80px;"><b>Consent Mode:</b> gcs=' + item.params.gcs + ' | gcd=' + item.params.gcd + '</span><br>' +
                                  '<span style="padding-left: 80px;"><b>dt:</b> ' + item.params.dt + '</span><br>' +
                                  '<span style="padding-left: 80px;"><b>dl:</b> ' + item.params.dl + '</span>' +
                                '</div>';

                                LogBox.innerHTML += '<span style="color: #34d399;">[成功] (' + (i + 1) + '/' + data.items.length + ') ' + item.name + ' 已送達</span><br>' + paramLogHtml;
                            } catch (sendErr) {
                                LogBox.innerHTML += '<span style="color: #f87171;">[失敗] (' + (i + 1) + '/' + data.items.length + ') ' + item.name + ' 失敗: ' + sendErr.message + '</span><br>';
                            }

                            LogBox.scrollTop = logBox.scrollHeight;

                            // 每次發送隨機間隔 5～10 秒（拉長發送間隔，避開 GA4 頻率過高的垃圾過濾）
                            If (i < data.items.length - 1) {
                                Var delayMs = Math.floor(Math.random() * 5000) + 5000;
                                Await new Promise(function(resolve) { setTimeout(resolve, delayMs); });
                            }
                        }
                    }
                } catch (err) {
                    LogBox.innerHTML += '<span class="log-err">執行發生錯誤: ' + err.message + '</span><br>';
                } finally {
                    If (!isAuto && !isStopped) {
                        Btn.disabled = false;
                        Btn.innerText = '單次發送 / 啟動自動重複';
                        UpdateStatus('✅ 發送完畢', '#34d399');
                    }
                    LogBox.innerHTML += '<span class="log-info">=== 本次任務執行完畢 ===</span><br>';
                    LogBox.scrollTop = logBox.scrollHeight;
                }
            }
        </script>
    </body>
    </html>
  `);
});

App.post('/run-task', (req, res) => {
  Try {
    Const selectedIndexes = (req.body && Array.isArray(req.body.indexes)) ? Req.body.indexes : [];

    If (selectedIndexes.length === 0) {
      Return res.status(400).json({ success: false, message: '未收到有效的選取索引。' });
    }

    Const items = selectedIndexes.map(targetIndex => {
      Const target = targetUrls[targetIndex];
      If (!target) return null;

      // 1. 動態生成 CID
      Const uniqueClientId = Math.floor(Math.random() * 899999999 + 100000000) + '.' + Math.floor(Math.random() * 899999999 + 100000000);
      Const engagementTimeMs = Math.floor(Math.random() * 5000) + 10000;

      // 2. 從 target.url 自動解析 UTM 參數
      Let utmSource = '';
      Let utmMedium = '';
      Let utmCampaign = '';

      Try {
        Const parsedUrl = new URL(target.url);
        UtmSource = parsedUrl.searchParams.get('utm_source') || '';
        UtmMedium = parsedUrl.searchParams.get('utm_medium') || '';
        UtmCampaign = parsedUrl.searchParams.get('utm_campaign') || '';
      } catch (e) {
        // 若網址解析異常時的靜態備用處理
      }

      Return {
        Name: target.name,
        Params: {
          V: '2',
          Tid: MEASUREMENT_ID,
          Gtm: '45je68e1v89223874',           // 預設 GTM 標記
          Gcs: 'G111',                       // Consent Mode 同意狀態
          Gcd: '13r3r3I3I5l1',               // Consent Mode v2 規範字串
          Cid: uniqueClientId,
          Sid: '',                           // 前端在發送前動態帶入秒數 timestamp
          Sct: '1',                          // Session Count (第一造訪為 1)
          Seg: '1',                          // Session Engagement 狀態標記
          _fv: '1',                          // 【關鍵修正】標記為 First Visit (新使用者)
          _ss: '1',                          // 標記 Session Start
          _s: '1',                           // 標記 Hit Sequence 1
          Ul: 'zh-tw',                       // 使用者語系
          _p: Math.floor(Math.random() * 1000000000).toString(), // Page ID Hash
          _et: engagementTimeMs.toString(),  // Engagement Time (10~15秒)
          Dl: target.url,
          Dt: target.name,
          En: 'page_view',

          // 【關鍵修正】顯式帶入 UTM 參數，確保 GA4 正式報表正確歸因
          Cs: utmSource,                     // Campaign Source
          Cm: utmMedium,                     // Campaign Medium
          Cn: utmCampaign                    // Campaign Name
        }
      };
    }).filter(Boolean);

    Res.json({ success: true, items });
  } catch (globalErr) {
    Res.status(500).json({ success: false, message: globalErr.message });
  }
});

App.listen(PORT, '0.0.0.0', () => {
  Console.log(`UI 介面已啟動！請在瀏覽器開啟: http://localhost:${PORT}`);
});
