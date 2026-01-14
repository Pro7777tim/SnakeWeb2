export class BackgroundScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BackgSc' });
    }

    init(data) {
        this.registry.set('score', 0);
        this.registry.set('time', 0);
        this.shTime = data.shTime ?? true;
        this.shScore = data.shScore ?? true;
    }

    create() {
        //UI
        const stroke1 = this.add.rectangle(0, 540, 30, 1020, 0x808080, 0.8).setOrigin(0, 0.5);
        const stroke2 = this.add.rectangle(1980, 540, 30, 1020, 0x808080, 0.8).setOrigin(1, 0.5);
        const stroke3 = this.add.rectangle(0, 0, 1980, 30, 0x808080, 0.8).setOrigin(0, 0);
        const stroke4 = this.add.rectangle(0, 1080, 1980, 30, 0x808080, 0.8).setOrigin(0, 1);
        let timeTextObj, scoreTextObj;
        let nextY = 0;
        //TIME TEXT
        if (this.shTime) {
            timeTextObj = this.add.text(0, nextY, "Time: " + this.registry.get('time') + "sec", {
                fontFamily: 'Pixelify Sans',
                fontSize: '42px',
                color: '#fff',
                stroke: '#000',
                strokeThickness: 4
            }).setOrigin(0);
            nextY += 35;
        }
        //SCORE TEXT
        if (this.shScore) {
            scoreTextObj = this.add.text(0, nextY, "Score: " + this.registry.get('score'), {
                fontFamily: 'Pixelify Sans',
                fontSize: '42px',
                color: '#fff',
                stroke: '#000',
                strokeThickness: 4
            }).setOrigin(0);
        }
        //TIME
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.registry.set('time', this.registry.get('time') + 1);
                if (this.shTime) {
                    timeTextObj.setText("Time: " + this.registry.get('time') + "sec");
                }
            },
            loop: true
        });
        //SCORE
        if (this.shScore) {
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
