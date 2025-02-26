Module.register("MMM-PiTemp", {
    defaults: {
        tempUnit: "C",
        freq: 1000,
        high: 80,
        low: 70,
        highColor: "red",
        lowColor: "green",
        otherColor: "yellow",
        advance: 0,
        t0: 50,
        t1: 60,
        t2: 67.5,
        t3: 75,
        t0Color: "rgb(0,200,0)",
        t1Color: "rgb(0,125,0)",
        t2Color: "yellow",
        t3Color: "red",
        label: "<i class='fab fa-raspberry-pi'></i>"
    },

    start: function() {
        this.sendSocketNotification("get_temp");
    },

    getDom: function() {
        var e = document.createElement("div")
        e.id = "pi_temp"
        return e
    },

    notificationReceived: function(notification, payload, sender) {
        switch(notification) {
            case "DOM_OBJECTS_CREATED":
                var timer = setInterval(()=>{
                    this.sendSocketNotification("get_temp")
                }, this.config.freq)
                break
            }
    },

    socketNotificationReceived: function(notification, payload) {
        switch (notification) {
            case "temperature":
                var e = document.getElementById("pi_temp");

                if (this.config.advance === 1){
                    e.style.color = "rgb(60,90,120)"
                    if ( parseFloat(payload) <= this.config.t0) {
                        e.style.color = this.config.t0Color;
                    } else if ( parseFloat(payload) <= this.config.t1) {
                        e.style.color = this.config.t1Color;
                    } else if ( parseFloat(payload) <= this.config.t2) {
                        e.style.color = this.config.t2Color;
                    } else {
                        e.style.color = this.config.t3Color;
                    }
                }else{
                    if ( parseFloat(payload) <= this.config.low) {
                        e.style.color = this.config.lowColor;
                    } else if ( parseFloat(payload) >= this.config.high) {
                        e.style.color = this.config.highColor;
                    } else {
                        e.style.color = this.config.otherColor;
                    }
                }

                var temp;
                if (this.config.tempUnit === "C") {
                    temp = payload.toString() + "°C";
                } else {
                    temp = (payload * (9 / 5) + 32).toFixed(1).toString() + "°F";
                }
                e.innerHTML = this.config.label + " " + temp;
                break;
        }
      },
})
