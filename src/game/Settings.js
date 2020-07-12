
function inverseControls()
{
    const tmpUp = Settings.keys.up;
    const tmpLeft = Settings.keys.left;
    Settings.keys.up = Settings.keys.down;
    Settings.keys.left = Settings.keys.right;
    Settings.keys.down = tmpUp;
    Settings.keys.right = tmpLeft;
    Settings.keys.inverse = !Settings.keys.inverse;
    return Settings;
}

function setQuerty()
{
    Settings.keys.up = 87;
    Settings.keys.left = 65;
    Settings.keys.down = 83;
    Settings.keys.right = 68;
    Settings.keys.attack = 32;
    Settings.keys.back = 8;
    Settings.keys.change = 70;
    Settings.keys.inversed = false;
    Settings.keys.mode = 'qwerty';
    return Settings;
}

function setAzerty()
{
    Settings.keys.up = 90;
    Settings.keys.left = 81;
    Settings.keys.down = 83;
    Settings.keys.right = 68;
    Settings.keys.attack = 32;
    Settings.keys.back = 8;
    Settings.keys.change = 70;
    Settings.keys.inversed = false;
    Settings.keys.mode = 'azerty';
    return Settings;
}

const Settings = {
    inverseControls,
    setQuerty,
    setAzerty,
    keys: {
        up: 87,
        left: 65,
        right: 68,
        down: 83,
        attack: 32,
        back: 8,
        change: 70,
        editor: {
            type_up: 33,
            type_down: 34,
            block_left: 37,
            block_right: 39,
            block_up: 38,
            block_down: 40
        },
        inversed: false,
        mode: 'qwerty'
    },
    player: {
        sexe: 'male',
        class: 'thief'
    }
};

export default Settings;