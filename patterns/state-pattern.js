class Play {
  play() {
    throw new Error("Should be called from sub classes");
  }
  pause() {
    throw new Error("Should be called from sub classes");
  }
  stop() {
    throw new Error("Should be called from sub classes");
  }
}

class PlayingState extends Play {
  constructor(player) {
    super();
    this.player = player;
  }

  play() {
    console.log("Already Playing");
  }

  pause() {
    console.log("Pausing the player.");
    this.player.setState(this.player.pausedState);
  }

  stop() {
    console.log("Stopping the player.");
    this.player.setState(this.player.stoppedState);
  }
}

class PuasedState extends Play {
  constructor(player) {
    super();
    this.player = player;
  }

  play() {
    console.log("Resuming play.");
    this.player.setState(this.player.playingState);
  }

  pause() {
    console.log("Already paused.");
  }

  stop() {
    console.log("Stopping the player.");
    this.player.setState(this.player.stoppedState);
  }
}

class StoppedState extends Play {
  constructor(player) {
    super();
    this.player = player;
  }

  play() {
    console.log("Start is playing");
    this.player.setState(this.player.playingState);
  }

  pause() {
    console.log("Cannot pause. The player is stopped.");
  }

  stop() {
    console.log("Already stopped.");
  }
}

class Player {
  constructor() {
    this.playingState = new PlayingState(this);
    this.pausedState = new PuasedState(this);
    const stopped = new StoppedState(this);
    console.log("stopped: ", stopped);
    this.stoppedState = stopped;
    this.state = this.stoppedState;
  }

  setState(state) {
    this.state = state;
  }

  play() {
    this.state.play();
  }

  pause() {
    this.state.pause();
  }
  stop() {
    this.state.stop()
  }
}

const player = new Player();
player.stop()
player.play(); // Starting play.
player.pause(); // Pausing the player.
player.play(); // Resuming play.
player.stop(); // Stopping the player.
player.stop(); // Already stopped.
