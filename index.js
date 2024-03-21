// Initialize battery monitoring function
initBattery();

function initBattery(){
    // Select relevant DOM elements for battery status display
    const battLiquid = document.querySelector(".Bliquid");
    const battStatus = document.querySelector(".Bstatus");
    const battPercentage = document.querySelector(".Bpercentage");
    
    // Use the Navigator API to get battery information asynchronously
    navigator.getBattery().then((batt) => {
        // Define function to update battery status display
        updateBattery = () => {
            // Calculate battery level as a percentage
            let level = Math.floor(batt.level * 100);
            // Update battery percentage display
            battPercentage.innerHTML = level + "%";
            // Adjust battery liquid level visual representation
            battLiquid.style.height = `${batt.level * 100}%`;
            
            // Determine battery status and update display accordingly
            if(level == 100){
                battStatus.innerHTML = `Battery Full <i class="ri-battery-2-fill green-color"></i>`;
                // Adjust liquid height for full battery
                battLiquid.style.height = "103%";
            }else if(level <= 20 && !batt.charging){
                battStatus.innerHTML = `Low Charge <i class="ri-plug-line animated-red animated-red"></i>`;
            }else if(batt.charging){
                battStatus.innerHTML = `Charging ... <i class="ri-flashlight-line animated-green"></i>`;
            }else{
                // Clear status display if none of the above conditions apply
                battStatus.innerHTML = "";
            }

            // Adjust liquid color gradient based on battery level
            if(level <= 20){
                battLiquid.classList.add("gradient-color-red");
                battLiquid.classList.remove("gradient-color-green", "gradient-color-orange", "gradient-color-yellow");
            }else if(level <= 48){
                battLiquid.classList.add("gradient-color-orange");
                battLiquid.classList.remove("gradient-color-green", "gradient-color-red", "gradient-color-yellow");
            }else if(level <= 80) {
                battLiquid.classList.add("gradient-color-yellow");
                battLiquid.classList.remove("gradient-color-green", "gradient-color-orange", "gradient-color-red");
            } else {
                battLiquid.classList.add("gradient-color-green");
                battLiquid.classList.remove("gradient-color-red", "gradient-color-orange", "gradient-color-yellow");
            }
        }
        // Initial call to updateBattery function to display current battery status
        updateBattery();
        // Add event listeners to update battery status when charging state or level changes
        batt.addEventListener("chargingchange", () => {updateBattery()});
        batt.addEventListener("levelchange", () => {updateBattery()});
    });
}