export class BackgroundScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BackgSc' });
    }

    init(data) {
        this.registry.set('score', 0);
        this.registry.set('time', 0);
        this.shTime = data.shTime ?? true;
        this.shScore = data.shScore ?? true;
        this.nextY = data.nextY ?? 0;
    }

    create() {
        //TIME TEXT
        let timeTextObj, scoreTextObj;
        if (this.shTime && settings.showTimeAndScore) {
            timeTextObj = this.add.text(0, this.nextY, "Time: " + this.registry.get('time') + "sec", {
                fontFamily: 'Pixelify Sans',
                fontSize: '42px',
                color: '#b4e051',
                stroke: '#000',
                strokeThickness: 4
            }).setOrigin(0);
            this.nextY += 35;
        }
        //SCORE TEXT
        if (this.shScore && settings.showTimeAndScore) {
            scoreTextObj = this.add.text(0, this.nextY, "Score: " + this.registry.get('score'), {
                fontFamily: 'Pixelify Sans',
                fontSize: '42px',
                color: '#ffe561',
                stroke: '#000',
                strokeThickness: 4
            }).setOrigin(0);
        }
        //TIME
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.registry.set('time', this.registry.get('time') + 1);
                if (this.shTime && settings.showTimeAndScore) {
                    timeTextObj.setText("Time: " + this.registry.get('time') + "sec");
                }
            },
            loop: true
        });
        //SCORE
        if (this.shScore && settings.showTimeAndScore) {
            this.registry.events.on('changedata-score', (parent, value) => {
                scoreTextObj.setText("Score: " + value);
            });
            this.events.on('shutdown', () => {
                this.registry.events.off('changedata-score');
            });    
        }
    }
    update(time, delta) {
        
    }
}
