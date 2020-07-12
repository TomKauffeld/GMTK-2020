class Settings
{
    constructor()
    {
        this.keys = {
            up: 87,
            left: 65,
            right: 68,
            down: 83,
            attack: 32
        };
        this.player = {
            sexe: 'male',
            class: 'thief'
        };
        this.change = 0;
    }
    changeSettings()
    {
        if(this.change === 0){
            this.keys = {
                up: 83,
                left: 68,
                right: 65,
                down: 87,
                attack: 32
            };
            this.change +=1;
        }
        else{
            this.keys = {
                up: 87,
                left: 65,
                right: 68,
                down: 83,
                attack: 32
            };
            this.change = 0;
        }
    }
}

export default Settings;