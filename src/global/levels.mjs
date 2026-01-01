//IMPORTS
import { classic } from "../levels/classic/main.mjs";

//FUNCTIONS
function randLevel() {
    const entries = Object.entries(window.gImage)
        .filter(([key, value]) => value.complete === false);
    if (entries.length === 0) return null;
    return entries[Math.floor(Math.random() * entries.length)][1];
}

function getComplate(img, level) {
    if (!img) return false;
    return img[level]?.complete === true;
}

function updateLevelComplete(levelKey) {
    if (!lImage) {
        lImage = {};
    }
    if (!lImage[levelKey]) {
        lImage[levelKey] = { complete: false };
    }
    lImage[levelKey].complete = true;
    localStorage.setItem("local_image", JSON.stringify(lImage));
    if (gImage[levelKey]) {
        gImage[levelKey].complete = true;
    }
    window.completeLevels = 0;
    for (let key in gImage) {
        if (gImage[key].complete === true) {
            window.completeLevels++;
        }
    }
    return true;
}


//LOCAL IMAGE
window.lImage = localStorage.getItem("local_image");
if (lImage) {
    lImage = JSON.parse(lImage);
}

//GENERAL IMAGE
window.gImage = {
    classic: {
        scene: classic,
        key: "classic",
        name: "Classic",
        complexity: "Easy",
        mod: "The classic,\nwell-known snake!",
        target: "Eat 20 apples",
        complete: getComplate(lImage, "classic")
    },
    classic2: {
        scene: classic,
        key: "classic2",
        name: "Classic2",
        complexity: "Easy",
        mod: "The classic,\nwell-known snake!",
        target: "Eat 20 apples",
        complete: getComplate(lImage, "classic2")
    },
    classic3: {
        scene: classic,
        key: "classic3",
        name: "Classic3",
        complexity: "Easy",
        mod: "The classic,\nwell-known snake!",
        target: "Eat 20 apples",
        complete: getComplate(lImage, "classic3")
    },
    classic4: {
        scene: classic,
        key: "classic4",
        name: "Classic4",
        complexity: "Easy",
        mod: "The classic,\nwell-known snake!",
        target: "Eat 20 apples",
        complete: getComplate(lImage, "classic4")
    },
    classic5: {
        scene: classic,
        key: "classic5",
        name: "Classic5",
        complexity: "Easy",
        mod: "The classic,\nwell-known snake!",
        target: "Eat 20 apples",
        complete: getComplate(lImage, "classic5")
    }
};

//AUXILIARY GLOBAL VARIABLES
window.allLevels = Object.keys(gImage).length;

window.completeLevels = 0;
for (let v in gImage) {
    if (gImage[v].complete === true) {
        window.completeLevels++;
    }
}

//EXPORT
export { randLevel, updateLevelComplete };
