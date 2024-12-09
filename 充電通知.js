document.addEventListener("DOMContentLoaded", async () => {
    if (!navigator.getBattery) {
        alert("このブラウザはバッテリーAPIをサポートしていません。");
        return;
    }

    try {
        const battery = await navigator.getBattery();

        const updateBatteryStatus = () => {
            const level = Math.round(battery.level * 100);
            const charging = battery.charging ? "充電中" : "充電していません";
            document.getElementById("battery-level").textContent = `${level}%`;
            document.getElementById("charging-status").textContent = `充電状態: ${charging}`;
        };

        // 初期状態を設定
        updateBatteryStatus();

        // イベントリスナーを設定
        battery.addEventListener("levelchange", updateBatteryStatus);
        battery.addEventListener("chargingchange", updateBatteryStatus);
    } catch (error) {
        console.error("バッテリー情報の取得中にエラーが発生しました: ", error);
    }
});
